import { type DictionaryVariant } from "./dictionary-variant";
import { type StatusVariant } from "./status-variant";
import { type TypeVariant } from "./type-variant";
import { type UserEntry } from "./user";

export type EditEntry = {
	id: number;
	dictionary: DictionaryVariant;
	identifier: string;
	title: { [key in string]: string };
	type: TypeVariant;
	status: StatusVariant;
	author: UserEntry;
	approver: UserEntry | null;
	commentsCount: number;
	createdDate: string;
	modifiedDate: string;
};
