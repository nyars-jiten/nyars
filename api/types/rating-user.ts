import type { RatingSummary } from './rating-summary'

export interface RatingUser {
  id: number
  userRef: number
  alltimeRating: number
  monthRating: number
  weekRating: number
  todayRating: number
  summary: RatingSummary
}
