import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <Loader2 className={cn("h-8 w-8 animate-spin text-primary", className)} />
    </div>
  )
}
