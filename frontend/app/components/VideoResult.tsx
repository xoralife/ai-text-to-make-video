"use client";

interface VideoResultProps {
  videoUrl: string;
  apiUrl: string;
}

export default function VideoResult({ videoUrl, apiUrl }: VideoResultProps) {
  const fullUrl = `${apiUrl}${videoUrl}`;

  return (
    <div className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-6">
      <video
        src={fullUrl}
        controls
        autoPlay={false}
        muted={false}
        loop={false}
        className="w-full rounded-lg"
      />
      <a
        href={fullUrl}
        download
        className="inline-flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-2 text-sm text-gray-200 transition hover:bg-gray-600"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
          />
        </svg>
        Download Video
      </a>
    </div>
  );
}
