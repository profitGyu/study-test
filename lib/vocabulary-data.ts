export interface VocabularyWord {
  id: number
  kanji: string
  hiragana: string
  korean: string
}

export interface VocabularyCategory {
  id: string
  title: string
  description: string
  words: VocabularyWord[]
}

export const VOCABULARY_CATEGORIES: VocabularyCategory[] = [
  {
    id: "body-parts",
    title: "신체 부위",
    description: "일본어로 신체 부위 배우기",
    words: [
      { id: 1, kanji: "頭", hiragana: "あたま", korean: "머리" },
      { id: 2, kanji: "顔", hiragana: "かお", korean: "얼굴" },
      { id: 3, kanji: "目", hiragana: "め", korean: "눈" },
      { id: 4, kanji: "口", hiragana: "くち", korean: "입" },
      { id: 5, kanji: "鼻", hiragana: "はな", korean: "코" },
      { id: 6, kanji: "耳", hiragana: "みみ", korean: "귀" },
      { id: 7, kanji: "首", hiragana: "くび", korean: "목" },
      { id: 8, kanji: "肩", hiragana: "かた", korean: "어깨" },
      { id: 9, kanji: "腕", hiragana: "うで", korean: "팔" },
      { id: 10, kanji: "手", hiragana: "て", korean: "손" },
      { id: 11, kanji: "指", hiragana: "ゆび", korean: "손가락" },
      { id: 12, kanji: "胸", hiragana: "むね", korean: "가슴" },
      { id: 13, kanji: "背中", hiragana: "せなか", korean: "등" },
      { id: 14, kanji: "腹", hiragana: "はら", korean: "배" },
      { id: 15, kanji: "足", hiragana: "あし", korean: "다리/발" },
    ],
  },
  {
    id: "family",
    title: "가족",
    description: "가족 관계 표현 배우기",
    words: [
      { id: 1, kanji: "家族", hiragana: "かぞく", korean: "가족" },
      { id: 2, kanji: "父", hiragana: "ちち", korean: "아버지 (나의)" },
      { id: 3, kanji: "母", hiragana: "はは", korean: "어머니 (나의)" },
      { id: 4, kanji: "お父さん", hiragana: "おとうさん", korean: "아버지 (상대방의)" },
      { id: 5, kanji: "お母さん", hiragana: "おかあさん", korean: "어머니 (상대방의)" },
      { id: 6, kanji: "兄", hiragana: "あに", korean: "형/오빠 (나의)" },
      { id: 7, kanji: "姉", hiragana: "あね", korean: "언니/누나 (나의)" },
      { id: 8, kanji: "弟", hiragana: "おとうと", korean: "남동생" },
      { id: 9, kanji: "妹", hiragana: "いもうと", korean: "여동생" },
      { id: 10, kanji: "祖父", hiragana: "そふ", korean: "할아버지 (나의)" },
      { id: 11, kanji: "祖母", hiragana: "そぼ", korean: "할머니 (나의)" },
      { id: 12, kanji: "夫", hiragana: "おっと", korean: "남편" },
      { id: 13, kanji: "妻", hiragana: "つま", korean: "아내" },
      { id: 14, kanji: "息子", hiragana: "むすこ", korean: "아들" },
      { id: 15, kanji: "娘", hiragana: "むすめ", korean: "딸" },
    ],
  },
  {
    id: "colors",
    title: "색깔",
    description: "다양한 색깔 표현 배우기",
    words: [
      { id: 1, kanji: "色", hiragana: "いろ", korean: "색깔" },
      { id: 2, kanji: "赤", hiragana: "あか", korean: "빨강" },
      { id: 3, kanji: "青", hiragana: "あお", korean: "파랑" },
      { id: 4, kanji: "黄色", hiragana: "きいろ", korean: "노랑" },
      { id: 5, kanji: "緑", hiragana: "みどり", korean: "초록" },
      { id: 6, kanji: "黒", hiragana: "くろ", korean: "검정" },
      { id: 7, kanji: "白", hiragana: "しろ", korean: "하양" },
      { id: 8, kanji: "茶色", hiragana: "ちゃいろ", korean: "갈색" },
      { id: 9, kanji: "灰色", hiragana: "はいいろ", korean: "회색" },
      { id: 10, kanji: "紫", hiragana: "むらさき", korean: "보라" },
      { id: 11, kanji: "ピンク", hiragana: "ぴんく", korean: "분홍" },
      { id: 12, kanji: "オレンジ", hiragana: "おれんじ", korean: "오렌지색" },
    ],
  },
  {
    id: "numbers",
    title: "숫자",
    description: "기본 숫자 배우기",
    words: [
      { id: 1, kanji: "一", hiragana: "いち", korean: "1" },
      { id: 2, kanji: "二", hiragana: "に", korean: "2" },
      { id: 3, kanji: "三", hiragana: "さん", korean: "3" },
      { id: 4, kanji: "四", hiragana: "し/よん", korean: "4" },
      { id: 5, kanji: "五", hiragana: "ご", korean: "5" },
      { id: 6, kanji: "六", hiragana: "ろく", korean: "6" },
      { id: 7, kanji: "七", hiragana: "しち/なな", korean: "7" },
      { id: 8, kanji: "八", hiragana: "はち", korean: "8" },
      { id: 9, kanji: "九", hiragana: "きゅう/く", korean: "9" },
      { id: 10, kanji: "十", hiragana: "じゅう", korean: "10" },
      { id: 11, kanji: "百", hiragana: "ひゃく", korean: "100" },
      { id: 12, kanji: "千", hiragana: "せん", korean: "1000" },
      { id: 13, kanji: "万", hiragana: "まん", korean: "10000" },
    ],
  },
  {
    id: "daily-verbs",
    title: "일상 동사",
    description: "자주 사용하는 동사 배우기",
    words: [
      { id: 1, kanji: "食べる", hiragana: "たべる", korean: "먹다" },
      { id: 2, kanji: "飲む", hiragana: "のむ", korean: "마시다" },
      { id: 3, kanji: "見る", hiragana: "みる", korean: "보다" },
      { id: 4, kanji: "聞く", hiragana: "きく", korean: "듣다" },
      { id: 5, kanji: "話す", hiragana: "はなす", korean: "말하다" },
      { id: 6, kanji: "読む", hiragana: "よむ", korean: "읽다" },
      { id: 7, kanji: "書く", hiragana: "かく", korean: "쓰다" },
      { id: 8, kanji: "行く", hiragana: "いく", korean: "가다" },
      { id: 9, kanji: "来る", hiragana: "くる", korean: "오다" },
      { id: 10, kanji: "帰る", hiragana: "かえる", korean: "돌아가다" },
      { id: 11, kanji: "寝る", hiragana: "ねる", korean: "자다" },
      { id: 12, kanji: "起きる", hiragana: "おきる", korean: "일어나다" },
      { id: 13, kanji: "買う", hiragana: "かう", korean: "사다" },
      { id: 14, kanji: "売る", hiragana: "うる", korean: "팔다" },
      { id: 15, kanji: "作る", hiragana: "つくる", korean: "만들다" },
    ],
  },
]
