import { ParserResponse } from "@/api/types/search/parser-response";

export type SearchResultJpInfo = {
	count: number;
	page: number; // remove
	request: string; // remove
	selectedLemma: number;
	parsedGrammar: ParserResponse[];
};
