import { EntryJp } from "@/api/dictionary/jp/types";
import { SearchResultJpInfo } from "./search-result-jp-info";

export type SearchResultWord = {
	info: SearchResultJpInfo;
	result: EntryJp[];
};
