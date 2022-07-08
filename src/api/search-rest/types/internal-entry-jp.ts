import type { Meaning } from "./meaning";
import type { Word } from "./word";

export type InternalEntryJp = {
	words: Word[];
	meanings: Meaning[];
	externalEntry: string;
};
