"use client";

import { Clock, Play, XCircle } from "lucide-react";

interface HistoryEntry {
  prompt: string;
  videoUrl: string | null;
  status: string;
}

interface HistoryListProps {
  entries: HistoryEntry[];
  apiUrl: string;
}

export default function HistoryList({ entries, apiUrl }: HistoryListProps) {
  if (entries.length === 0) return null;

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-text-primary">
        Generation History
      </h2>
      <div className="space-y-3">
        {entries.map((entry, i) => (
          <div key={i} className="card p-5 space-y-4">
            <div className="flex items-start gap-3">
              {entry.videoUrl ? (
                <Play className="w-4 h-4 text-text-muted mt-0.5 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              )}
              <div className="space-y-1 min-w-0">
                <p className="text-sm text-text-primary truncate">
                  {entry.prompt || "(no prompt)"}
                </p>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-text-muted" />
                  <span className="text-xs text-text-muted capitalize">
                    {entry.status}
                  </span>
                </div>
              </div>
            </div>
            {entry.videoUrl && (
              <video
                src={`${apiUrl}${entry.videoUrl}`}
                controls
                className="w-full rounded-[10px]"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
