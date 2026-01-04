import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen } from "lucide-react"

export default function CharactersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                일본어 문자
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">히라가나와 가타카나를 배우고 발음을 들어보세요</p>
          </div>

          {/* 선택 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="group hover:shadow-lg transition-all hover:scale-105">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">ひらがな</CardTitle>
                <CardDescription>히라가나 오십음도를 배워보세요</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/characters/hiragana">히라가나 학습</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all hover:scale-105">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <BookOpen className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-2xl">カタカナ</CardTitle>
                <CardDescription>가타카나 오십음도를 배워보세요</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/characters/katakana">가타카나 학습</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
