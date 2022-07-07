import { random } from "lodash";

import type { Axios } from "axios";
import type { SearchResults } from "./types";

export class SearchRest {
	public search(props: { request: string }): Promise<SearchResults> {
		console.log(props);

		return Promise.resolve<SearchResults>({
			total: 100,
			results: Array.from({ length: random(1, 10) }).map(() => ({
				uuid: "test",
				name: "Name",
			})),
		});
	}

	public constructor(endpoint: Axios) {
		this.#endpoint = endpoint;
	}

	#endpoint;
}
