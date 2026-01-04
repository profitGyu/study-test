import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Music, GraduationCap, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              일본어를 배우자
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            히라가나, 가타카나, 단어 퀴즈, 그리고 노래로 일본어를 재미있게 학습하세요
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button size="lg" asChild className="gap-2">
              <Link href="/characters">
                <Sparkles className="h-5 w-5" />
                학습 시작하기
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="group hover:shadow-lg transition-all hover:scale-105">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">히라가나 & 가타카나</CardTitle>
              <CardDescription>일본어의 기본 문자를 배우고 음성으로 들어보세요</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/characters">문자 학습</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all hover:scale-105">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                <GraduationCap className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle className="text-xl">단어 퀴즈</CardTitle>
              <CardDescription>매일 업데이트되는 단어로 실력을 테스트하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/quiz">퀴즈 풀기</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all hover:scale-105">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Music className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-xl">노래로 학습</CardTitle>
              <CardDescription>좋아하는 일본 노래로 즐겁게 공부하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/songs">노래 보기</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { label: "히라가나", value: "46" },
            { label: "가타카나", value: "46" },
            { label: "단어", value: "1000+" },
            { label: "노래", value: "무한" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-lg bg-card border border-border">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
