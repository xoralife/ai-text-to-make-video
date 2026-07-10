"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import PromptForm from "./components/PromptForm";
import GenerationStatus from "./components/GenerationStatus";
import VideoResult from "./components/VideoResult";
import HistoryList from "./components/HistoryList";

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

export default function Home() {
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
              ...prev,
              { prompt: "", videoUrl: data.video_url, status: "completed" },
            ]);
            setJobId(null);
          } else if (data.status === "failed") {
            stopPolling();
            setBusy(false);
            setError(data.error || "Generation failed");
            setHistory((prev) => [
              ...prev,
              { prompt: "", videoUrl: null, status: "failed" },
            ]);
            setJobId(null);
          }
        } catch {
          stopPolling();
          setBusy(false);
          setError("Network error: Backend unreachable. Make sure the server is running.");
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
        ...prev,
        { prompt, videoUrl: null, status: "pending" },
      ]);

      statusTimerRef.current = setInterval(() => {
        setStatusIndex((i) => i + 1);
      }, 4000);

      pollStatus(job_id);
    } catch {
      setBusy(false);
      setError("Network error: Backend unreachable. Make sure the server is running.");
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center px-4 py-12">
      <div className="w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            AI Text-to-Video Generator
          </h1>
          <p className="mt-2 text-gray-400">
            Turn your ideas into videos with AI
          </p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
          <PromptForm onSubmit={handleSubmit} disabled={busy} />
        </div>

        {busy && jobStatus?.status === "processing" && (
          <GenerationStatus index={statusIndex} />
        )}

        {busy && jobStatus?.status === "pending" && (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 p-6">
            <svg
              className="h-8 w-8 animate-spin text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <p className="text-gray-300">Job queued... waiting for worker</p>
          </div>
        )}

        {jobStatus?.status === "completed" && jobStatus.video_url && (
          <VideoResult videoUrl={jobStatus.video_url} apiUrl={API_URL} />
        )}

        {error && (
          <div className="rounded-lg border border-red-800 bg-red-900/50 p-4">
            <p className="text-red-300">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 rounded bg-red-700 px-4 py-1 text-sm text-white transition hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        )}

        <HistoryList entries={history} apiUrl={API_URL} />
      </div>
    </main>
  );
}
