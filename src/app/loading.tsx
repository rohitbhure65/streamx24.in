import { Spinner } from "@/components/ui"

export default function Loading() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <Spinner className="size-8" />
    </div>
  )
}
