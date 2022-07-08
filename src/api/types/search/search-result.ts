import type { EntryJp } from "./../dictionary/jp/entry-jp";
import type { SearchResultInfo } from "./search-result-info";

export type SearchResult = {
	info: SearchResultInfo;
	result: EntryJp[];
};
