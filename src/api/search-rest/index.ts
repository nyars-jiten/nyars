import type { Axios } from "axios";
import { BasicRest } from "../basic-rest";
import { SearchResultKanji } from "./types/search-result-kanji";
import { SearchResultWord } from "./types/search-result-word";

type SearchReq = {
	request: string;
	page: number;
};

export class SearchRest extends BasicRest {
	public searchJp(props: SearchReq): Promise<SearchResultWord> {
		return this.extractData(
			this.#endpoint.get(`search/jap`, {
				params: {
					r: props.request,
					p: props.page,
					exact: false,
				},
			}),
		);
	}

	public searchKanji(props: SearchReq): Promise<SearchResultKanji> {
		return this.extractData(
			this.#endpoint.get(`search/kanji`, {
				params: {
					r: props.request,
					p: props.page,
					exact: false,
				},
			}),
		);
	}

	public sugg(props: { request: string }): Promise<string[]> {
		return this.extractData(
			this.#endpoint.get("search/preview", {
				params: { r: props.request, n: 10 },
			}),
		);
	}

	public constructor(endpoint: Axios) {
		super();

		this.#endpoint = endpoint;
	}

	#endpoint;
}
