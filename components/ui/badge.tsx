import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center gap-2 rounded-sm border px-2 py-1 font-mono text-[10px] uppercase tracking-widest", className)} {...props} />;
}
