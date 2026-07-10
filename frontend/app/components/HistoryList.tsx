"use client";

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
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-200">
        Generation History
      </h2>
      <div className="space-y-4">
        {entries.map((entry, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-700 bg-gray-800 p-4"
          >
            <p className="mb-3 text-sm text-gray-400">"{entry.prompt}"</p>
            {entry.videoUrl ? (
              <video
                src={`${apiUrl}${entry.videoUrl}`}
                controls
                className="w-full rounded-lg"
              />
            ) : (
              <p className="text-sm text-red-400">Failed</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
