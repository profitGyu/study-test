import { Navigation } from "@/components/navigation"
import { HiraganaClient } from "../container/hiragana-client"

export default function HiraganaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navigation />
      <HiraganaClient />
    </div>
  )
}

