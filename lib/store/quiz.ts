import { create } from "zustand"
import { persist } from "zustand/middleware"

interface VocabularyWord {
  original: string
  hiragana: string
  katakana: string
  korean: string
}

interface QuizState {
  vocabulary: VocabularyWord[]
  setVocabulary: (words: VocabularyWord[]) => void
  score: number
  setScore: (score: number) => void
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      vocabulary: [],
      setVocabulary: (words) => set({ vocabulary: words }),
      score: 0,
      setScore: (score) => set({ score }),
    }),
    {
      name: "quiz-storage",
    },
  ),
)

