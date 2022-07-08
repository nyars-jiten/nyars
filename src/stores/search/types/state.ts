// import type { SearchResults } from "@/api/search-rest/types";

import type { SearchResult } from "@/api/types/search/search-result";

export type State = {
	request: string;
	results: SearchResult;
};
