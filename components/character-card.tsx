"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"
import { motion } from "framer-motion"

interface CharacterCardProps {
  char: string
  romaji: string
  delay?: number
}

export function CharacterCard({ char, romaji, delay = 0 }: CharacterCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const speakCharacter = () => {
    if ("speechSynthesis" in window) {
      setIsPlaying(true)

      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(char)
      utterance.lang = "ja-JP"
      utterance.rate = 0.8

      utterance.onend = () => {
        setIsPlaying(false)
      }

      utterance.onerror = () => {
        setIsPlaying(false)
      }

      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay }}>
      <Card className="group hover:shadow-lg transition-all hover:scale-105 cursor-pointer" onClick={speakCharacter}>
        <CardContent className="p-6 flex flex-col items-center gap-3">
          <div className="text-5xl font-bold text-foreground group-hover:text-primary transition-colors">{char}</div>
          <div className="text-sm font-medium text-muted-foreground">{romaji}</div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 opacity-70 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation()
              speakCharacter()
            }}
          >
            {isPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
