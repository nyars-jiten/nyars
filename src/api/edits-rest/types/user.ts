import type { RatingUser } from "@/api/types/rating-user";

export type UserEntry = {
	id: number;
	username: string;
	banned: boolean;
	role: string;
	access: number;
	avatar: string;
	isBot: boolean;
	userRating: RatingUser;
	createdDate: string;
};
