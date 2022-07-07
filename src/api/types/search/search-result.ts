import type { SearchResultInfo } from "./search-result-info";
import type { EntryJp } from "./../dictionary/jp/entry-jp";

export type SearchResult = {
	info: SearchResultInfo,
	result: EntryJp,
};
