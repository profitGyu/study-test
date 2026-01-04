import { Navigation } from "@/components/navigation"
import { QuizClient } from "./container/quiz-client"

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navigation />
      <QuizClient />
    </div>
  )
}
