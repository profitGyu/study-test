import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SongLyric {
  timestamp: string
  original: string
  hiragana: string
  katakana: string
  korean: string
}

interface SongState {
  currentSong: {
    title: string
    artist: string
    youtubeId: string
    lyrics: SongLyric[]
  } | null
  setCurrentSong: (song: SongState["currentSong"]) => void
  savedSongs: Array<{
    title: string
    artist: string
    youtubeId: string
    lyrics: SongLyric[]
  }>
  addSong: (song: SongState["currentSong"]) => void
}

export const useSongStore = create<SongState>()(
  persist(
    (set) => ({
      currentSong: null,
      setCurrentSong: (song) => set({ currentSong: song }),
      savedSongs: [],
      addSong: (song) => {
        if (!song) return
        set((state) => ({
          savedSongs: [...state.savedSongs.filter((s) => s.youtubeId !== song.youtubeId), song],
        }))
      },
    }),
    {
      name: "song-storage",
    },
  ),
)

