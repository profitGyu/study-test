"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RefreshCcw, Check, X, Trophy, BookOpen } from "lucide-react"
import { useQuizStore } from "@/lib/store"
import { motion, AnimatePresence } from "framer-motion"
import { VOCABULARY_CATEGORIES } from "@/lib/vocabulary-data"

interface QuizQuestion {
  kanji: string
  hiragana: string
  korean: string
}

type QuizMode = "kanji-to-korean" | "hiragana-to-korean"

export default function QuizPage() {
  const { vocabulary, setVocabulary } = useQuizStore()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [quizMode, setQuizMode] = useState<QuizMode | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const [answers, setAnswers] = useState<string[]>([])

  const generateQuiz = (categoryId: string, mode: QuizMode) => {
    const category = VOCABULARY_CATEGORIES.find((c) => c.id === categoryId)
    if (!category || category.words.length < 4) return

    const vocabulary = category.words

    // Shuffle and take 10 questions
    const shuffled = [...vocabulary].sort(() => Math.random() - 0.5).slice(0, Math.min(10, vocabulary.length))
    setQuizQuestions(shuffled)

    // Generate answers for each question
    const newAnswers = shuffled.map((question) => {
      const correctAnswer = question.korean
      const wrongAnswers = vocabulary
        .filter((v) => v.korean !== correctAnswer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((v) => v.korean)

      return [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5)
    })

    setAnswers(newAnswers)
    setCurrentQuestionIndex(0)
    setScore(0)
    setQuizComplete(false)
    setShowResult(false)
    setSelectedAnswer(null)
    setSelectedCategory(categoryId)
    setQuizMode(mode)
  }

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return

    setSelectedAnswer(answer)
    setShowResult(true)

    const isCorrect = answer === quizQuestions[currentQuestionIndex].korean
    if (isCorrect) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setQuizComplete(true)
      }
    }, 1500)
  }

  const currentQuestion = quizQuestions[currentQuestionIndex]
  const progress = quizQuestions.length > 0 ? ((currentQuestionIndex + 1) / quizQuestions.length) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                단어 퀴즈
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">일본어 단어를 테스트하고 실력을 향상시키세요</p>
          </div>

          {!selectedCategory && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>학습할 카테고리를 선택하세요</CardTitle>
                  <CardDescription>각 카테고리는 관련된 단어들로 구성되어 있습니다</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {VOCABULARY_CATEGORIES.map((category) => (
                      <Button
                        key={category.id}
                        variant="outline"
                        className="h-auto py-6 px-4 flex flex-col items-start gap-2 bg-transparent hover:bg-primary/5 hover:border-primary"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="font-semibold text-left flex-1">{category.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground text-left w-full">{category.description}</p>
                        <p className="text-xs text-muted-foreground">{category.words.length}개 단어</p>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedCategory && !quizMode && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>퀴즈 모드를 선택하세요</CardTitle>
                  <CardDescription>학습 방식을 선택하여 퀴즈를 시작하세요</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    <Button
                      variant="outline"
                      className="h-auto py-8 px-6 flex flex-col items-start gap-3 bg-transparent hover:bg-primary/5 hover:border-primary"
                      onClick={() => generateQuiz(selectedCategory, "kanji-to-korean")}
                    >
                      <div className="text-left space-y-2 w-full">
                        <div className="font-semibold text-lg">한자 → 한국어</div>
                        <p className="text-sm text-muted-foreground">한자를 보고 한국어 뜻을 맞추는 퀴즈</p>
                        <div className="text-2xl pt-2">例: 頭 → ?</div>
                      </div>
                    </Button>

                    <Button
                      variant="outline"
                      className="h-auto py-8 px-6 flex flex-col items-start gap-3 bg-transparent hover:bg-secondary/5 hover:border-secondary"
                      onClick={() => generateQuiz(selectedCategory, "hiragana-to-korean")}
                    >
                      <div className="text-left space-y-2 w-full">
                        <div className="font-semibold text-lg">히라가나 → 한국어</div>
                        <p className="text-sm text-muted-foreground">히라가나를 보고 한국어 뜻을 맞추는 퀴즈</p>
                        <div className="text-2xl pt-2">例: あたま → ?</div>
                      </div>
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full mt-4"
                    onClick={() => {
                      setSelectedCategory(null)
                    }}
                  >
                    뒤로 가기
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Quiz Questions */}
          {quizQuestions.length > 0 && quizMode && !quizComplete && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    문제 {currentQuestionIndex + 1} / {quizQuestions.length}
                  </span>
                  <span>점수: {score}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      {quizMode === "kanji-to-korean" ? (
                        <>
                          <CardTitle className="text-center text-5xl font-bold py-8">{currentQuestion.kanji}</CardTitle>
                          <CardDescription className="text-center text-lg pt-4">
                            이 단어의 뜻은 무엇인가요?
                          </CardDescription>
                        </>
                      ) : (
                        <>
                          <CardTitle className="text-center text-5xl font-bold py-8">
                            {currentQuestion.hiragana}
                          </CardTitle>
                          <CardDescription className="text-center text-lg pt-4">
                            이 단어의 뜻은 무엇인가요?
                          </CardDescription>
                        </>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {answers[currentQuestionIndex]?.map((answer, index) => {
                        const isSelected = selectedAnswer === answer
                        const isCorrect = answer === currentQuestion.korean
                        const showCorrect = showResult && isCorrect
                        const showWrong = showResult && isSelected && !isCorrect

                        return (
                          <Button
                            key={index}
                            variant="outline"
                            className={`w-full h-auto py-4 text-lg justify-start bg-transparent ${
                              showCorrect ? "border-green-500 bg-green-500/10" : ""
                            } ${showWrong ? "border-red-500 bg-red-500/10" : ""}`}
                            onClick={() => handleAnswerSelect(answer)}
                            disabled={showResult}
                          >
                            <span className="flex-1 text-left">{answer}</span>
                            {showCorrect && <Check className="h-5 w-5 text-green-500" />}
                            {showWrong && <X className="h-5 w-5 text-red-500" />}
                          </Button>
                        )
                      })}
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Quiz Complete */}
          {quizComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex flex-col items-center gap-4">
                    <Trophy className="h-16 w-16 text-secondary" />
                    <CardTitle className="text-3xl">퀴즈 완료!</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary mb-2">
                      {score} / {quizQuestions.length}
                    </div>
                    <p className="text-muted-foreground">정답률: {Math.round((score / quizQuestions.length) * 100)}%</p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => selectedCategory && quizMode && generateQuiz(selectedCategory, quizMode)}
                      className="flex-1"
                      size="lg"
                    >
                      <RefreshCcw className="h-4 w-4 mr-2" />
                      다시 풀기
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setQuizMode(null)
                      }}
                      className="flex-1 bg-transparent"
                      size="lg"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      다른 모드
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedCategory(null)
                      setQuizMode(null)
                      setQuizQuestions([])
                    }}
                    className="w-full"
                  >
                    카테고리 선택으로 돌아가기
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
