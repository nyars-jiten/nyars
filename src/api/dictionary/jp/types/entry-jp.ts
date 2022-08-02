import type { InternalEntryJp } from "./internal-entry-jp";

export type EntryJp = {
	wid: string;
	entry: InternalEntryJp;
	externalEntry: string;
	isReviewed: boolean;
	isUnconfirmed: boolean;
	// accent:,
	picturesId: number;
};
