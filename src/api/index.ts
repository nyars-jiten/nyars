import axios from "axios";

import { BasicRest } from "./basic-rest";
import { KotobaRest } from "./kotoba-rest";
import { SearchRest } from "./search-rest";
import { StatisticsRest } from "./statistics-rest";
import { UsersRest } from "./users-rest";

import type { EntryJp } from "./search-rest/types";

export const api = new (class extends BasicRest {
	readonly statistics;
	readonly search;
	readonly kotoba;
	readonly users;

	dictionaryJapEntries(props: { wid: string }) {
		return this.extractData(
			this.#endpoint.get<EntryJp>(`dictionary/jap/entries/${props.wid}`),
		);
	}

	constructor() {
		super();

		this.#endpoint = axios.create({ baseURL: import.meta.env.VITE_API_URL });

		this.statistics = new StatisticsRest(this.#endpoint);
		this.search = new SearchRest(this.#endpoint);
		this.kotoba = new KotobaRest(this.#endpoint);
		this.users = new UsersRest(this.#endpoint);
	}

	#endpoint;
})();
