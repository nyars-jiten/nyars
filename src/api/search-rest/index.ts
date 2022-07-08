import type { Axios } from "axios";
import { BasicRest } from "../basic-rest";
import { SearchResult } from "../types/search/search-result";

type SearchReq = {
	request: string;
	page: number;
};

export class SearchRest extends BasicRest {
	public search(props: SearchReq): Promise<SearchResult> {
		return this.extractData(
			this.#endpoint.get("search/jap", {
				params: {
					r: props.request,
					p: props.page,
					exact: false,
				},
			}),
		);
	}

	public constructor(endpoint: Axios) {
		super();

		this.#endpoint = endpoint;
	}

	#endpoint;
}
