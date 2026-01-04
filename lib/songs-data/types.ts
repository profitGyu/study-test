export interface SongLyric {
  timestamp: string
  original: string
  hiragana: string
  katakana: string
  korean: string
}

export interface Song {
  id: string
  title: string
  artist: string
  youtubeId: string
  thumbnail?: string
  releaseDate?: string
  duration?: string
  lyrics: SongLyric[]
}

