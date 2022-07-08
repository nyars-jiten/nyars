import { ParserResponse } from "@/api/types/search/parser-response";

export type SearchResultInfo = {
	count: number;
	page: number; // remove
	request: string; // remove
	selectedLemma: number;
	parsedGrammar: ParserResponse[];
};
