export interface UserRating {
  id: number
  userRef: number
  alltimeRating: number
  monthRating: number
  weekRating: number
  todayRating: number
  summary: UserStats
}
