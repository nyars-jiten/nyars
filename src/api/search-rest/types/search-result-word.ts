import { EntryJp } from "./entry-jp";
import { SearchResultJapInfo } from "./search-result-jap-info";

export type SearchResultWord = {
	info: SearchResultJapInfo;
	result: EntryJp[];
};
