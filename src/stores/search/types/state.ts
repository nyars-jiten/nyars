import type { SearchResults } from "@/api/search-rest/types";

export type State = {
	request: string;
	results: SearchResults;
};
