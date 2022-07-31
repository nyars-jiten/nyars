import type { InternalEntryKanji } from "./internal-entry-kanji";
import type { Radical } from "./radical";

export type EntryKanji = {
	kid: string;
	entry: InternalEntryKanji;
	radical: Radical;
	isReviewed: boolean;
};
