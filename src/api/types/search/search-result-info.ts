import type { ParserResponse } from "./parser-response";

export type SearchResultInfo = {
	count: number,
	page: number,
	request: string,
	selectedLemma: number,
	parsedGrammar: ParserResponse[],
};
