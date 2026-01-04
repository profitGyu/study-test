import { Navigation } from "@/components/navigation"
import { SongsClient } from "./container/songs-client"

export default function SongsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navigation />
      <SongsClient />
    </div>
  )
}