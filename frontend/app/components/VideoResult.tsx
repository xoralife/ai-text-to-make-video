"use client";

import { Download } from "lucide-react";

interface VideoResultProps {
  videoUrl: string;
  apiUrl: string;
}

export default function VideoResult({ videoUrl, apiUrl }: VideoResultProps) {
  const fullUrl = `${apiUrl}${videoUrl}`;

  return (
    <div className="card overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">
          Generated Video
        </h3>
        <a
          href={fullUrl}
          download
          className="btn-ghost flex items-center gap-2 text-xs"
        >
          <Download className="w-4 h-4" />
          Download
        </a>
      </div>
      <div className="p-5">
        <video
          src={fullUrl}
          controls
          autoPlay={false}
          muted={false}
          loop={false}
          className="w-full rounded-[10px]"
        />
      </div>
    </div>
  );
}
