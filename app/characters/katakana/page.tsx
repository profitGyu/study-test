import { Navigation } from "@/components/navigation"
import { KatakanaClient } from "../container/katakana-client"

export default function KatakanaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navigation />
      <KatakanaClient />
    </div>
  )
}

