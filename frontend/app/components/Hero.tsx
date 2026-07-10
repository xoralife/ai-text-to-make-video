"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Brain, BarChart3, Waves } from "lucide-react";

const floatingCards = [
  { label: "AI Analytics", value: "99.8% Accuracy", icon: BarChart3, x: "65%", y: "15%" },
  { label: "Neural Processing", value: "Real-time Inference", icon: Brain, x: "75%", y: "40%" },
  { label: "Voice AI", value: "Natural Synthesis", icon: Waves, x: "60%", y: "65%" },
  { label: "Workflow Automation", value: "Smart Pipelines", icon: Zap, x: "80%", y: "70%" },
];

function RadarPulse() {
  return (
    <div className="relative w-72 h-72">
      <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
      <div className="absolute inset-4 rounded-full border border-white/[0.04]" />
      <div className="absolute inset-8 rounded-full border border-white/[0.03]" />
      <div className="absolute inset-12 rounded-full border border-white/[0.02]" />
      <motion.div
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full"
        animate={{
          x: [0, 80, 0, -80, 0],
          y: [0, -80, 0, 80, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-white/60 rounded-full"
        animate={{
          x: [0, -60, 0, 60, 0],
          y: [0, 60, 0, -60, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Brain className="w-16 h-16 text-white/10" />
      </div>
    </div>
  );
}

function FloatingCard({
  card,
  index,
}: {
  card: (typeof floatingCards)[0];
  index: number;
}) {
  return (
    <motion.div
      className="absolute glass rounded-[18px] p-4 w-44 shadow-soft"
      style={{ left: card.x, top: card.y }}
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.4,
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-[10px] bg-white/10 flex items-center justify-center">
          <card.icon className="w-4 h-4 text-white/70" />
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-medium text-white/80">{card.label}</p>
          <p className="text-[10px] text-white/40">{card.value}</p>
        </div>
      </div>
    </motion.div>
  );
}

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden noise">
      <div className="absolute inset-0 grid-subtle" />
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-white/[0.03] blur-[120px]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-white/[0.02] blur-[100px]"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-white/[0.015] blur-[80px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
    </div>
  );
}

function HeroContent() {
  return (
    <div className="relative z-10 max-w-app mx-auto px-8 max-md:px-6 max-sm:px-4 h-full flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full items-center">
        {/* Left */}
        <motion.div
          className="space-y-8 max-lg:text-center max-lg:pt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="space-y-6">
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-tight max-w-[700px] max-lg:mx-auto">
              Build the Future with{" "}
              <span className="text-white/80">Artificial Intelligence</span>
            </h1>
            <p className="text-[18px] leading-[1.8] text-[#B5B5B5] max-w-[560px] max-lg:mx-auto">
              Create intelligent applications, automate workflows, and unlock
              the power of AI with a modern platform designed for developers and
              businesses.
            </p>
          </div>

          <div className="flex items-center gap-4 max-lg:justify-center flex-wrap">
            <Link href="/generate" className="btn-primary inline-flex items-center gap-2 text-[15px]">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="btn-secondary text-[15px]">Watch Demo</button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 max-lg:justify-center">
              <span className="text-yellow-400/80 text-lg">★★★★★</span>
              <span className="text-text-muted text-sm">Trusted by 10,000+ users</span>
            </div>
            <div className="flex items-center gap-6 max-lg:justify-center flex-wrap opacity-40">
              {["Vercel", "OpenAI", "Anthropic", "Hugging Face"].map((name) => (
                <span key={name} className="text-xs font-semibold tracking-widest text-text-muted uppercase">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          className="relative h-[500px] max-lg:hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* Main glass panel */}
          <div className="absolute top-[10%] left-[10%] w-[70%] h-[75%] glass rounded-[24px] shadow-soft overflow-hidden">
            <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <Sparkles className="w-4 h-4 text-white/30" />
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[10px] bg-white/10 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white/60" />
                </div>
                <div className="space-y-1">
                  <div className="h-2 w-32 bg-white/10 rounded" />
                  <div className="h-1.5 w-20 bg-white/5 rounded" />
                </div>
              </div>
              <div className="space-y-2">
                {[70, 45, 90, 60].map((w, i) => (
                  <div key={i} className="h-2 bg-white/5 rounded" style={{ width: `${w}%` }} />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {["Training", "Inference", "Accuracy", "Latency"].map((label) => (
                  <div key={label} className="bg-white/5 rounded-[10px] p-3 space-y-1">
                    <p className="text-[10px] text-white/30">{label}</p>
                    <p className="text-xs text-white/60 font-medium">
                      {Math.floor(Math.random() * 40 + 60)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Radar */}
          <div className="absolute bottom-[5%] right-[5%]">
            <RadarPulse />
          </div>

          {/* Floating cards */}
          {floatingCards.map((card, i) => (
            <FloatingCard key={card.label} card={card} index={i} />
          ))}
        </motion.div>

        {/* Mobile visual */}
        <motion.div
          className="hidden max-lg:flex justify-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="glass rounded-[24px] p-6 shadow-soft w-full max-w-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-white/60" />
                  <span className="text-sm font-medium text-white/60">AI Dashboard</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {floatingCards.map((card) => (
                  <div key={card.label} className="bg-white/5 rounded-[12px] p-3 space-y-1">
                    <card.icon className="w-4 h-4 text-white/40" />
                    <p className="text-xs text-white/60">{card.label}</p>
                    <p className="text-[10px] text-white/30">{card.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-surface">
      <HeroBackground />
      <HeroContent />
    </section>
  );
}
