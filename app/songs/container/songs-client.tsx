"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music, Search, User } from "lucide-react"
import { SONGS_DATA, type Song } from "@/lib/songs-data"

export function SongsClient() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null)

  const artists = Array.from(new Set(SONGS_DATA.map((song) => song.artist)))

  const filteredSongs = SONGS_DATA.filter((song) => {
    const matchesSearch =
      searchQuery === "" ||
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesArtist = selectedArtist === null || song.artist === selectedArtist
    return matchesSearch && matchesArtist
  })

  const handleSongClick = (songId: string) => {
    router.push(`/songs/${songId}`)
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              노래로 학습
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">좋아하는 일본 노래로 일본어를 배우세요</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>노래 검색</CardTitle>
            <CardDescription>노래 제목이나 가수명으로 검색하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="노래 제목 또는 가수명 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>가수별 필터</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedArtist === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedArtist(null)}
                  className={selectedArtist === null ? "" : "bg-transparent"}
                >
                  전체
                </Button>
                {artists.map((artist) => (
                  <Button
                    key={artist}
                    variant={selectedArtist === artist ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedArtist(artist)}
                    className={selectedArtist === artist ? "" : "bg-transparent"}
                  >
                    {artist}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{filteredSongs.length}개의 노래</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-1">
                {filteredSongs.map((song) => (
                  <Button
                    key={song.id}
                    variant="outline"
                    className="h-auto py-4 px-4 flex flex-col items-start gap-1 bg-transparent hover:bg-primary/5 hover:border-primary"
                    onClick={() => handleSongClick(song.id)}
                  >
                    <div className="font-semibold text-left line-clamp-1 w-full">{song.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1 w-full">{song.artist}</div>
                    {song.duration && (
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Music className="h-3 w-3" />
                        {song.duration}
                      </div>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
