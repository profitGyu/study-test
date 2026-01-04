import { Navigation } from "@/components/navigation"
import { CharactersClient } from "./container/characters-client"

export default function CharactersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navigation />
      <CharactersClient />
    </div>
  )
}
