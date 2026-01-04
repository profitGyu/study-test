import { Navigation } from "@/components/navigation"
import { SongDetailClient } from "./container/song-detail-client"
import { SONGS_DATA } from "@/lib/songs-data"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function SongDetailPage({ params }: PageProps) {
  const { id } = await params
  const song = SONGS_DATA.find((s) => s.id === id)

  if (!song) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navigation />
      <SongDetailClient song={song} />
    </div>
  )
}

