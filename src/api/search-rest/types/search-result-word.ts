import { EntryJp } from "@/api/dictionary/jp/types";
import { SearchResultJapInfo } from "./search-result-jap-info";

export type SearchResultWord = {
	info: SearchResultJapInfo;
	result: EntryJp[];
};
