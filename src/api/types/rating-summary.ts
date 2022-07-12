import type { RatingValue } from "./rating-value";

export interface RatingSummary {
	alltime: RatingValue;
	month: RatingValue;
	week: RatingValue;
	today: RatingValue;
}
