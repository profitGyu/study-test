"use client"

import { useState } from "react"
import { CharacterCard } from "@/components/character-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { hiraganaRows } from "@/lib/characters"
import { Volume2 } from "lucide-react"

export function HiraganaClient() {
  const [speaking, setSpeaking] = useState(false)

  const speakAll = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      setSpeaking(true)

      const allChars = hiraganaRows.flatMap((row) => row.characters.filter((c) => c !== null))
      let index = 0

      const speakNext = () => {
        if (index < allChars.length) {
          const utterance = new SpeechSynthesisUtterance(allChars[index].char)
          utterance.lang = "ja-JP"
          utterance.rate = 0.8

          utterance.onend = () => {
            index++
            setTimeout(speakNext, 500)
          }

          utterance.onerror = () => {
            setSpeaking(false)
          }

          window.speechSynthesis.speak(utterance)
        } else {
          setSpeaking(false)
        }
      }

      speakNext()
    }
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ひらがな 오십음도
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">히라가나를 배우고 발음을 들어보세요</p>
        </div>

        <div className="flex justify-end mb-6">
          <Button onClick={speakAll} variant="outline" className="gap-2 bg-transparent" disabled={speaking}>
            <Volume2 className="h-4 w-4" />
            전체 듣기
          </Button>
        </div>

        {/* 오십음도 표 */}
        <Card>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="w-20 p-2 text-sm font-medium text-muted-foreground border border-border"></th>
                    <th className="p-2 text-sm font-medium text-muted-foreground border border-border">あ단</th>
                    <th className="p-2 text-sm font-medium text-muted-foreground border border-border">い단</th>
                    <th className="p-2 text-sm font-medium text-muted-foreground border border-border">う단</th>
                    <th className="p-2 text-sm font-medium text-muted-foreground border border-border">え단</th>
                    <th className="p-2 text-sm font-medium text-muted-foreground border border-border">お단</th>
                  </tr>
                </thead>
                <tbody>
                  {hiraganaRows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="p-3 text-sm font-medium text-muted-foreground border border-border bg-muted/30">
                        {row.rowLabel}
                      </td>
                      {row.characters.map((char, colIndex) => (
                        <td key={colIndex} className="p-2 border border-border align-top">
                          {char ? (
                            <div className="w-full">
                              <CharacterCard char={char.char} romaji={char.romaji} delay={rowIndex * 0.05 + colIndex * 0.01} />
                            </div>
                          ) : (
                            <div className="h-[140px]"></div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

