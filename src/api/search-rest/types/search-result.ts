import { EntryJp } from "./entry-jp";
import { SearchResultInfo } from "./search-result-info";

export type SearchResult = {
	info: SearchResultInfo;
	result: EntryJp[];
};
