import type { DictionaryVariant } from "./dictionary-variant";
import type { StatusVariant } from "./status-variant";
import type { TypeVariant } from "./type-variant";
import type { User } from "./user";

export type Article = {
	id: number;
	dictionary: DictionaryVariant;
	identifier: string;
	title: { [key in string]: string };
	type: TypeVariant;
	status: StatusVariant;
	author: User;
	approver: User | null;
	commentsCount: number;
	createdDate: string;
	modifiedDate: string;
};
