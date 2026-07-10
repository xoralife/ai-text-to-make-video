"use client";

import { useState, FormEvent } from "react";

interface PromptFormProps {
  onSubmit: (prompt: string) => void;
  disabled: boolean;
}

export default function PromptForm({ onSubmit, disabled }: PromptFormProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit(prompt.trim());
    setPrompt("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-secondary">
          Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the video you want to create..."
          rows={5}
          maxLength={500}
          className="input-base"
        />
        <p className="text-xs text-text-muted text-right">
          {prompt.length}/500
        </p>
      </div>
      <button
        type="submit"
        disabled={disabled || !prompt.trim()}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {disabled ? (
          <>
            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            Generating...
          </>
        ) : (
          "Generate Video"
        )}
      </button>
    </form>
  );
}
