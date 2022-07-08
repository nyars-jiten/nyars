import type { SearchResult } from "@/api/search-rest/types/search-result";

export type State = {
	request: string;
	results: SearchResult;
};
