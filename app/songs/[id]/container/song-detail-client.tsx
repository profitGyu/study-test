"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import type { Song } from "@/lib/songs-data"

interface SongDetailClientProps {
  song: Song
}

export function SongDetailClient({ song }: SongDetailClientProps) {
  const router = useRouter()
  const [displayMode, setDisplayMode] = useState<"original" | "hiragana" | "katakana">("original")
  const [player, setPlayer] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [activeLyricIndex, setActiveLyricIndex] = useState(-1)
  const lyricsContainerRef = useRef<HTMLDivElement>(null)

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
    if (!song || typeof window === "undefined" || !(window as any).YT) return

    let playerInstance: any = null

    const initPlayer = () => {
      playerInstance = new (window as any).YT.Player("youtube-player", {
        height: "360",
        width: "640",
        videoId: song.youtubeId,
        playerVars: {
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            setPlayer(event.target)
          },
          onStateChange: (event: any) => {
            setIsPlaying(event.data === (window as any).YT.PlayerState.PLAYING)
          },
        },
      })
    }

    if ((window as any).YT?.Player) {
      initPlayer()
    } else {
      ;(window as any).onYouTubeIframeAPIReady = initPlayer
    }

    return () => {
      if (playerInstance) {
        try {
          playerInstance.destroy()
        } catch (error) {
          console.error("Error destroying player:", error)
        }
      }
      setPlayer(null)
    }
  }, [song])

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
    if (!song || song.lyrics.length === 0) return

    let activeIndex = -1

    for (let i = song.lyrics.length - 1; i >= 0; i--) {
      const lyricTime = timeToSeconds(song.lyrics[i].timestamp)

      if (currentTime >= lyricTime) {
        activeIndex = i
        break
      }
    }

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
  }, [currentTime, song, activeLyricIndex])

  const togglePlayPause = () => {
    if (!player || typeof player.pauseVideo !== "function" || typeof player.playVideo !== "function") return

    if (isPlaying) {
      player.pauseVideo()
    } else {
      player.playVideo()
    }
  }

  const seekToLyric = (timestamp: string) => {
    if (!player || typeof player.seekTo !== "function" || typeof player.playVideo !== "function") return
    const seconds = timeToSeconds(timestamp)
    try {
      player.seekTo(seconds, true)
      player.playVideo()
    } catch (error) {
      console.error("Error seeking to time:", error)
    }
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
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/songs")}
              className="mb-2 w-fit"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              노래 목록으로 돌아가기
            </Button>
            <CardTitle className="text-2xl">{song.title}</CardTitle>
            <CardDescription className="text-base">{song.artist}</CardDescription>
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
              {song.lyrics.map((lyric, index) => {
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
    </main>
  )
}

