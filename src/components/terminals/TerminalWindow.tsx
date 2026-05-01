import React from "react";
import { cn } from "@/lib/utils";

type TerminalTheme = "green" | "amber" | "blue" | "modern";

interface TerminalWindowProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  theme?: TerminalTheme;
  scanlines?: boolean;
  glow?: boolean;
  flicker?: boolean;
  showCursor?: boolean;
}

const themeStyles: Record<TerminalTheme, string> = {
  green: "text-green-400",
  amber: "text-amber-400",
  blue: "text-blue-400",
  modern: "text-white",
};

export function TerminalWindow({
  children,
  title = "SupportFlow AI Triage Terminal",
  className,
  theme = "green",
  scanlines = true,
  glow = true,
  flicker = false,
  showCursor = false,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "flex flex-col border bg-black overflow-hidden relative group transition-all duration-500",
        themeStyles[theme],
        glow && "drop-shadow-[0_0_6px_rgba(0,255,0,0.4)]",
        flicker && "animate-pulse",
        className
      )}
    >
      {/* Top bar */}
      <div className="absolute top-3 left-4 flex gap-1.5 opacity-40">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <div className="w-2 h-2 rounded-full bg-green-500" />
      </div>

      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#121214]">
        <span className="text-[10px] font-code font-bold uppercase tracking-[0.3em] opacity-70">
          {title}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto relative p-4 font-code text-sm">
        {/* Scanlines */}
        {scanlines && (
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.02),rgba(0,0,255,0.04))] bg-[size:100%_2px,3px_100%]" />
        )}

        <div className="relative z-10">
          {children}
          {showCursor && <BlinkingCursor />}
        </div>
      </div>
    </div>
  );
}

/* Cursor Component */
function BlinkingCursor() {
  return (
    <span className="inline-block w-2 h-4 ml-1 bg-current animate-blink" />
  );
}
