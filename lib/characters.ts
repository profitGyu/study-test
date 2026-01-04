export interface Character {
  char: string
  romaji: string
}

export interface CharacterRow {
  rowLabel: string
  characters: (Character | null)[]
}

const vowels: Character[] = [
  { char: "あ", romaji: "a" },
  { char: "い", romaji: "i" },
  { char: "う", romaji: "u" },
  { char: "え", romaji: "e" },
  { char: "お", romaji: "o" },
]

const kRow: Character[] = [
  { char: "か", romaji: "ka" },
  { char: "き", romaji: "ki" },
  { char: "く", romaji: "ku" },
  { char: "け", romaji: "ke" },
  { char: "こ", romaji: "ko" },
]

const sRow: Character[] = [
  { char: "さ", romaji: "sa" },
  { char: "し", romaji: "shi" },
  { char: "す", romaji: "su" },
  { char: "せ", romaji: "se" },
  { char: "そ", romaji: "so" },
]

const tRow: Character[] = [
  { char: "た", romaji: "ta" },
  { char: "ち", romaji: "chi" },
  { char: "つ", romaji: "tsu" },
  { char: "て", romaji: "te" },
  { char: "と", romaji: "to" },
]

const nRow: Character[] = [
  { char: "な", romaji: "na" },
  { char: "に", romaji: "ni" },
  { char: "ぬ", romaji: "nu" },
  { char: "ね", romaji: "ne" },
  { char: "の", romaji: "no" },
]

const hRow: Character[] = [
  { char: "は", romaji: "ha" },
  { char: "ひ", romaji: "hi" },
  { char: "ふ", romaji: "fu" },
  { char: "へ", romaji: "he" },
  { char: "ほ", romaji: "ho" },
]

const mRow: Character[] = [
  { char: "ま", romaji: "ma" },
  { char: "み", romaji: "mi" },
  { char: "む", romaji: "mu" },
  { char: "め", romaji: "me" },
  { char: "も", romaji: "mo" },
]

const yRow: Character[] = [
  { char: "や", romaji: "ya" },
  null,
  { char: "ゆ", romaji: "yu" },
  null,
  { char: "よ", romaji: "yo" },
]

const rRow: Character[] = [
  { char: "ら", romaji: "ra" },
  { char: "り", romaji: "ri" },
  { char: "る", romaji: "ru" },
  { char: "れ", romaji: "re" },
  { char: "ろ", romaji: "ro" },
]

const wRow: Character[] = [
  { char: "わ", romaji: "wa" },
  null,
  null,
  null,
  { char: "を", romaji: "wo" },
]

const nChar: (Character | null)[] = [
  { char: "ん", romaji: "n" },
  null,
  null,
  null,
  null,
]

export const hiraganaRows: CharacterRow[] = [
  { rowLabel: "あ행", characters: vowels },
  { rowLabel: "か행", characters: kRow },
  { rowLabel: "さ행", characters: sRow },
  { rowLabel: "た행", characters: tRow },
  { rowLabel: "な행", characters: nRow },
  { rowLabel: "は행", characters: hRow },
  { rowLabel: "ま행", characters: mRow },
  { rowLabel: "や행", characters: yRow },
  { rowLabel: "ら행", characters: rRow },
  { rowLabel: "わ행", characters: wRow },
  { rowLabel: "ん", characters: nChar },
]

const katakanaVowels: Character[] = [
  { char: "ア", romaji: "a" },
  { char: "イ", romaji: "i" },
  { char: "ウ", romaji: "u" },
  { char: "エ", romaji: "e" },
  { char: "オ", romaji: "o" },
]

const katakanaKRow: Character[] = [
  { char: "カ", romaji: "ka" },
  { char: "キ", romaji: "ki" },
  { char: "ク", romaji: "ku" },
  { char: "ケ", romaji: "ke" },
  { char: "コ", romaji: "ko" },
]

const katakanaSRow: Character[] = [
  { char: "サ", romaji: "sa" },
  { char: "シ", romaji: "shi" },
  { char: "ス", romaji: "su" },
  { char: "セ", romaji: "se" },
  { char: "ソ", romaji: "so" },
]

const katakanaTRow: Character[] = [
  { char: "タ", romaji: "ta" },
  { char: "チ", romaji: "chi" },
  { char: "ツ", romaji: "tsu" },
  { char: "テ", romaji: "te" },
  { char: "ト", romaji: "to" },
]

const katakanaNRow: Character[] = [
  { char: "ナ", romaji: "na" },
  { char: "ニ", romaji: "ni" },
  { char: "ヌ", romaji: "nu" },
  { char: "ネ", romaji: "ne" },
  { char: "ノ", romaji: "no" },
]

const katakanaHRow: Character[] = [
  { char: "ハ", romaji: "ha" },
  { char: "ヒ", romaji: "hi" },
  { char: "フ", romaji: "fu" },
  { char: "ヘ", romaji: "he" },
  { char: "ホ", romaji: "ho" },
]

const katakanaMRow: Character[] = [
  { char: "マ", romaji: "ma" },
  { char: "ミ", romaji: "mi" },
  { char: "ム", romaji: "mu" },
  { char: "メ", romaji: "me" },
  { char: "モ", romaji: "mo" },
]

const katakanaYRow: Character[] = [
  { char: "ヤ", romaji: "ya" },
  null,
  { char: "ユ", romaji: "yu" },
  null,
  { char: "ヨ", romaji: "yo" },
]

const katakanaRRow: Character[] = [
  { char: "ラ", romaji: "ra" },
  { char: "リ", romaji: "ri" },
  { char: "ル", romaji: "ru" },
  { char: "レ", romaji: "re" },
  { char: "ロ", romaji: "ro" },
]

const katakanaWRow: Character[] = [
  { char: "ワ", romaji: "wa" },
  null,
  null,
  null,
  { char: "ヲ", romaji: "wo" },
]

const katakanaNChar: (Character | null)[] = [
  { char: "ン", romaji: "n" },
  null,
  null,
  null,
  null,
]

export const katakanaRows: CharacterRow[] = [
  { rowLabel: "ア행", characters: katakanaVowels },
  { rowLabel: "カ행", characters: katakanaKRow },
  { rowLabel: "サ행", characters: katakanaSRow },
  { rowLabel: "タ행", characters: katakanaTRow },
  { rowLabel: "ナ행", characters: katakanaNRow },
  { rowLabel: "ハ행", characters: katakanaHRow },
  { rowLabel: "マ행", characters: katakanaMRow },
  { rowLabel: "ヤ행", characters: katakanaYRow },
  { rowLabel: "ラ행", characters: katakanaRRow },
  { rowLabel: "ワ행", characters: katakanaWRow },
  { rowLabel: "ン", characters: katakanaNChar },
]

// 하위 호환성을 위한 평탄화된 배열
export const hiraganaChars: Character[] = hiraganaRows.flatMap((row) => row.characters.filter((c): c is Character => c !== null))

export const katakanaChars: Character[] = katakanaRows.flatMap((row) => row.characters.filter((c): c is Character => c !== null))
