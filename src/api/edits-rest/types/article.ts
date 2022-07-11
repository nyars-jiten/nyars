import type { User } from "./user";
import type { DictionaryVariant } from "./dictionary-variant";

export type Article = {
	id: number;
	dictionary: DictionaryVariant;
	identifier: string;
	title: { [key in string]: string };
	type: number;
	status: number;
	author: User;
	approver: User;
	commentsCount: number;
	createdDate: string;
	modifiedDate: string;
};
