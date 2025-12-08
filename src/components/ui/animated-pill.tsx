import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedPillProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gradientColors?: string[];
}

export function AnimatedPill({ 
  children, 
  className, 
  gradientColors = ["#6DA46C", "#2E8BBB", "#5E9B99"],
  ...props 
}: AnimatedPillProps) {
  return (
    <div className={cn("relative inline-flex overflow-hidden rounded-full p-[2px]", className)} {...props}>
      <div 
        className="absolute inset-[-1000%] animate-border-rotate"
        style={{
          background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 70%, ${gradientColors.join(", ")})`
        }}
      />
      <div className="relative inline-flex items-center gap-3 rounded-full bg-white/90 dark:bg-neutral-900/90 p-1 pl-4 pr-2 backdrop-blur-md w-full h-full">
        {children}
      </div>
    </div>
  );
}
