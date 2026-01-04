"use client"

import { useState } from "react"
import { CharacterCard } from "@/components/character-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { hiraganaChars, katakanaChars } from "@/lib/characters"
import { Volume2 } from "lucide-react"

export function CharactersClient() {
  const [activeTab, setActiveTab] = useState("hiragana")

  const speakAll = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()

      const chars = activeTab === "hiragana" ? hiraganaChars : katakanaChars
      let index = 0

      const speakNext = () => {
        if (index < chars.length) {
          const utterance = new SpeechSynthesisUtterance(chars[index].char)
          utterance.lang = "ja-JP"
          utterance.rate = 0.8

          utterance.onend = () => {
            index++
            setTimeout(speakNext, 500)
          }

          window.speechSynthesis.speak(utterance)
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
              일본어 문자
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">히라가나와 가타카나를 배우고 발음을 들어보세요</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="hiragana" className="text-base">
                ひらがな
              </TabsTrigger>
              <TabsTrigger value="katakana" className="text-base">
                カタカナ
              </TabsTrigger>
            </TabsList>

            <Button onClick={speakAll} variant="outline" className="gap-2 bg-transparent">
              <Volume2 className="h-4 w-4" />
              전체 듣기
            </Button>
          </div>

          <TabsContent value="hiragana" className="mt-0">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {hiraganaChars.map((item, index) => (
                <CharacterCard key={item.char} char={item.char} romaji={item.romaji} delay={index * 0.02} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="katakana" className="mt-0">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {katakanaChars.map((item, index) => (
                <CharacterCard key={item.char} char={item.char} romaji={item.romaji} delay={index * 0.02} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
