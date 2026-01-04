export type { Song, SongLyric } from "./types"

import { officialHigedanDismSongs } from "./official-higedan-dism"
import { vaundySongs } from "./vaundy"
import { yonezuKenshiSongs } from "./yonezu-kenshi"
import type { Song } from "./types"

export const SONGS_DATA: Song[] = [...officialHigedanDismSongs, ...vaundySongs, ...yonezuKenshiSongs]
