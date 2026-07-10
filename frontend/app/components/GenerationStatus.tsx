"use client";

const messages = [
  "Warming up the model...",
  "Analyzing your prompt...",
  "Rendering frames...",
  "Applying final touches...",
];

interface GenerationStatusProps {
  index: number;
}

export default function GenerationStatus({ index }: GenerationStatusProps) {
  const message = messages[index % messages.length];

  return (
    <div className="card flex flex-col items-center gap-5 p-10 text-center">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-2 border-border rounded-full" />
        <div className="absolute inset-0 border-2 border-transparent border-t-white rounded-full animate-spin" />
      </div>
      <div className="space-y-1">
        <p className="text-text-primary text-sm font-medium">{message}</p>
        <p className="text-text-muted text-xs">
          This may take a minute or two...
        </p>
      </div>
    </div>
  );
}
