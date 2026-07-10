"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles } from "lucide-react";
import PromptForm from "../components/PromptForm";
import GenerationStatus from "../components/GenerationStatus";
import VideoResult from "../components/VideoResult";
import HistoryList from "../components/HistoryList";

interface JobStatus {
  status: string;
  video_url: string | null;
  error: string | null;
}

interface HistoryEntry {
  prompt: string;
  videoUrl: string | null;
  status: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function GeneratePage() {
  const [busy, setBusy] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusIndex, setStatusIndex] = useState(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const statusTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    if (statusTimerRef.current) {
      clearInterval(statusTimerRef.current);
      statusTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

  const pollStatus = useCallback(
    (id: string) => {
      pollingRef.current = setInterval(async () => {
        try {
          const res = await fetch(`${API_URL}/api/status/${id}`);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data: JobStatus = await res.json();
          setJobStatus(data);

          if (data.status === "completed") {
            stopPolling();
            setBusy(false);
            setHistory((prev) => [
              { prompt: "", videoUrl: data.video_url, status: "completed" },
              ...prev,
            ]);
            setJobId(null);
          } else if (data.status === "failed") {
            stopPolling();
            setBusy(false);
            setError(data.error || "Generation failed");
            setHistory((prev) => [
              { prompt: "", videoUrl: null, status: "failed" },
              ...prev,
            ]);
            setJobId(null);
          }
        } catch {
          stopPolling();
          setBusy(false);
          setError(
            "Unable to reach the generation server. Please check that the backend is running."
          );
          setJobId(null);
        }
      }, 3000);
    },
    [stopPolling]
  );

  const handleSubmit = async (prompt: string) => {
    setBusy(true);
    setError(null);
    setJobStatus(null);

    try {
      const res = await fetch(`${API_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const { job_id } = await res.json();
      setJobId(job_id);
      setHistory((prev) => [
        { prompt, videoUrl: null, status: "pending" },
        ...prev,
      ]);

      statusTimerRef.current = setInterval(() => {
        setStatusIndex((i) => i + 1);
      }, 4000);

      pollStatus(job_id);
    } catch {
      setBusy(false);
      setError(
        "Unable to reach the generation server. Please check that the backend is running."
      );
    }
  };

  return (
    <div className="max-w-app mx-auto px-8 py-12 max-md:px-6 max-sm:px-4">
      <div className="max-w-[640px] mx-auto space-y-10">
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            Generate Video
          </h1>
          <p className="text-text-secondary text-base">
            Turn your ideas into videos with AI
          </p>
        </div>

        <div className="card p-6">
          <PromptForm onSubmit={handleSubmit} disabled={busy} />
        </div>

        {busy && jobStatus?.status === "processing" && (
          <GenerationStatus index={statusIndex} />
        )}

        {busy && jobStatus?.status === "pending" && (
          <div className="card flex flex-col items-center gap-3 p-8">
            <div className="w-8 h-8 border-2 border-text-muted border-t-white rounded-full animate-spin" />
            <p className="text-text-secondary text-sm">
              Job queued... waiting for worker
            </p>
          </div>
        )}

        {jobStatus?.status === "completed" && jobStatus.video_url && (
          <VideoResult videoUrl={jobStatus.video_url} apiUrl={API_URL} />
        )}

        {error && (
          <div className="card border-red-900/50 bg-red-950/30 p-6">
            <p className="text-red-400 text-sm">{error}</p>
            <button
              onClick={() => setError(null)}
              className="btn-secondary mt-4 text-sm flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Try Again
            </button>
          </div>
        )}

        <HistoryList entries={history} apiUrl={API_URL} />
      </div>
    </div>
  );
}
