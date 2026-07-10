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
    <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-700 bg-gray-800 p-8">
      <svg
        className="h-10 w-10 animate-spin text-blue-500"
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
      <p className="text-lg text-gray-300">{message}</p>
      <p className="text-sm text-gray-500">This may take a minute or two...</p>
    </div>
  );
}
