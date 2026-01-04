"use client"

import { useState, useEffect, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, Music, Search, User } from "lucide-react"
import { motion } from "framer-motion"
import { SONGS_DATA, type Song } from "@/lib/songs-data"

interface Lyric {
  timestamp: string
  original: string
  hiragana: string
  katakana: string
  korean: string
}

export default function SongsPage() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [displayMode, setDisplayMode] = useState<"original" | "hiragana" | "katakana">("original")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null)
  const [player, setPlayer] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [activeLyricIndex, setActiveLyricIndex] = useState(-1)
  const lyricsContainerRef = useRef<HTMLDivElement>(null)

  const artists = Array.from(new Set(SONGS_DATA.map((song) => song.artist)))

  const filteredSongs = SONGS_DATA.filter((song) => {
    const matchesSearch =
      searchQuery === "" ||
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesArtist = selectedArtist === null || song.artist === selectedArtist
    return matchesSearch && matchesArtist
  })

  const timeToSeconds = (timestamp: string) => {
    const parts = timestamp.split(":")
    const minutes = Number.parseInt(parts[0])
    const seconds = Number.parseFloat(parts[1])
    return minutes * 60 + seconds
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName("script")[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    ;(window as any).onYouTubeIframeAPIReady = () => {
      console.log("[v0] YouTube IFrame API loaded")
    }
  }, [])

  useEffect(() => {
    if (!currentSong || typeof window === "undefined" || !(window as any).YT) return

    const initPlayer = () => {
      const newPlayer = new (window as any).YT.Player("youtube-player", {
        height: "360",
        width: "640",
        videoId: currentSong.youtubeId,
        playerVars: {
          playsinline: 1,
        },
        events: {
          onStateChange: (event: any) => {
            setIsPlaying(event.data === (window as any).YT.PlayerState.PLAYING)
          },
        },
      })
      setPlayer(newPlayer)
    }

    if ((window as any).YT?.Player) {
      initPlayer()
    } else {
      ;(window as any).onYouTubeIframeAPIReady = initPlayer
    }

    return () => {
      if (player) {
        player.destroy()
      }
    }
  }, [currentSong])

  useEffect(() => {
    if (!player || !isPlaying) return

    const interval = setInterval(() => {
      if (player.getCurrentTime) {
        const time = player.getCurrentTime()
        setCurrentTime(time)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [player, isPlaying])

  useEffect(() => {
    if (!currentSong || currentSong.lyrics.length === 0) return

    let activeIndex = -1

    for (let i = currentSong.lyrics.length - 1; i >= 0; i--) {
      const lyricTime = timeToSeconds(currentSong.lyrics[i].timestamp)

      if (currentTime >= lyricTime) {
        activeIndex = i
        break
      }
    }

    console.log(
      "[v0] Time:",
      currentTime.toFixed(2),
      "Active index:",
      activeIndex,
      activeIndex >= 0 ? `Lyric time: ${currentSong.lyrics[activeIndex].timestamp}` : "",
    )

    if (activeIndex !== activeLyricIndex) {
      setActiveLyricIndex(activeIndex)

      if (activeIndex >= 0 && lyricsContainerRef.current) {
        const activeLyric = lyricsContainerRef.current.children[activeIndex] as HTMLElement
        if (activeLyric) {
          activeLyric.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
        }
      }
    }
  }, [currentTime, currentSong, activeLyricIndex])

  const togglePlayPause = () => {
    if (!player) return

    if (isPlaying) {
      player.pauseVideo()
    } else {
      player.playVideo()
    }
  }

  const seekToLyric = (timestamp: string) => {
    if (!player) return
    const seconds = timeToSeconds(timestamp)
    player.seekTo(seconds)
    player.playVideo()
  }

  const getLyricText = (lyric: Song["lyrics"][0]) => {
    switch (displayMode) {
      case "hiragana":
        return lyric.hiragana
      case "katakana":
        return lyric.katakana
      default:
        return lyric.original
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navigation />

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

          {!currentSong && (
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
                        onClick={() => setCurrentSong(song)}
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
          )}

          {currentSong && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCurrentSong(null)
                      setActiveLyricIndex(-1)
                      setCurrentTime(0)
                      if (player) {
                        player.stopVideo()
                      }
                    }}
                    className="mb-2 w-fit"
                  >
                    ← 노래 목록으로 돌아가기
                  </Button>
                  <CardTitle className="text-2xl">{currentSong.title}</CardTitle>
                  <CardDescription className="text-base">{currentSong.artist}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <div id="youtube-player" className="w-full h-full"></div>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <Button onClick={togglePlayPause} size="lg" className="gap-2">
                      {isPlaying ? (
                        <>
                          <Pause className="h-5 w-5" />
                          일시정지
                        </>
                      ) : (
                        <>
                          <Play className="h-5 w-5" />
                          재생
                        </>
                      )}
                    </Button>

                    <Tabs value={displayMode} onValueChange={(value: any) => setDisplayMode(value)}>
                      <TabsList>
                        <TabsTrigger value="original">원문</TabsTrigger>
                        <TabsTrigger value="hiragana">히라가나</TabsTrigger>
                        <TabsTrigger value="katakana">가타카나</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div
                    ref={lyricsContainerRef}
                    className="space-y-4 max-h-[600px] overflow-y-auto py-8 px-4 bg-muted/30 rounded-lg scroll-smooth"
                  >
                    {currentSong.lyrics.map((lyric, index) => {
                      const isActive = index === activeLyricIndex

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0.5 }}
                          animate={{
                            opacity: isActive ? 1 : 0.6,
                            scale: isActive ? 1.02 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                          className={`p-4 rounded-lg cursor-pointer transition-all ${
                            isActive
                              ? "bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 border-2 border-primary shadow-lg"
                              : "bg-card/50 border border-border/50 hover:bg-muted/50 hover:border-border"
                          }`}
                          onClick={() => seekToLyric(lyric.timestamp)}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`text-xs min-w-[50px] pt-1 font-mono shrink-0 ${
                                isActive ? "text-primary font-bold" : "text-muted-foreground"
                              }`}
                            >
                              {lyric.timestamp}
                            </div>
                            <div className="flex-1 space-y-1.5 min-w-0">
                              <div
                                className={`leading-relaxed transition-all break-words ${
                                  isActive ? "font-bold text-primary text-lg" : "text-base"
                                }`}
                              >
                                {getLyricText(lyric)}
                              </div>
                              <div
                                className={`text-sm transition-all break-words ${
                                  isActive ? "text-foreground font-medium" : "text-muted-foreground"
                                }`}
                              >
                                {lyric.korean}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
