"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  History,
  Settings,
  PanelLeftClose,
  PanelLeft,
  Home,
} from "lucide-react";

const navItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Generate", icon: Sparkles, href: "/generate" },
  { label: "History", icon: History, href: "#" },
  { label: "Settings", icon: Settings, href: "#" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-surface-sidebar border-r border-border flex flex-col transition-all duration-300 ease-in-out z-50 ${
        collapsed ? "w-[60px]" : "w-[240px]"
      }`}
    >
      <div className="flex items-center justify-between px-4 h-16 border-b border-border">
        {!collapsed && (
          <Link
            href="/"
            className="font-heading font-semibold text-sm text-text-primary tracking-tight"
          >
            VideoForge
          </Link>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="btn-ghost p-2 rounded-[10px]"
        >
          {collapsed ? (
            <PanelLeft className="w-5 h-5 text-text-muted" />
          ) : (
            <PanelLeftClose className="w-5 h-5 text-text-muted" />
          )}
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-1 p-3">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-text-secondary hover:text-text-primary hover:bg-accent-hover transition-all duration-200"
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && (
              <span className="text-sm font-medium">{item.label}</span>
            )}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-border">
        {!collapsed && (
          <div className="flex items-center gap-3 rounded-[10px] px-3 py-2.5">
            <div className="w-7 h-7 rounded-[8px] bg-white/10 flex items-center justify-center">
              <span className="text-xs font-semibold text-text-muted">U</span>
            </div>
            <span className="text-sm text-text-muted">User</span>
          </div>
        )}
      </div>
    </aside>
  );
}
