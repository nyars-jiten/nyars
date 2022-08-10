import { EntryKanji } from "../../kanji/types";
import type { InternalEntryJp } from "./internal-entry-jp";

export type EntryJp = {
	wid: string;
	entry: InternalEntryJp;
	externalEntry: string;
	isReviewed: boolean;
	isUnconfirmed: boolean;
	kanjis: EntryKanji[];
	// accent:,
	picturesId: number;
};
