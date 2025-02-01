export interface WeeklyStats {
  stats: WeeklyUserStats[]
  site: StatsSite
}

export interface StatsSite {
  jpn: number
  jpnRev: number
  kanji: number
  kanjiRev: number
  rus: number
  rusRev: number
  jpnPrev: number
  jpnRevPrev: number
  kanjiPrev: number
  kanjiRevPrev: number
  rusPrev: number
  rusRevPrev: number
}

export interface WeeklyUserStats {
  stats: StatsUser
  user: ShortUser
}

export interface StatsUser {
  jpnNew: number
  jpnEdit: number
  kanjiNew: number
  kanjiEdit: number
  rusNew: number
  rusEdit: number
  autoNew: number
  autoEdit: number
  reviews: number
  rating: number
  edits: number
}
