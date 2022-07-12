import axios from "axios";

import { BasicRest } from "./basic-rest";
import { EditsRest } from "./edits-rest";
import { KotobaRest } from "./kotoba-rest";
import { SearchRest } from "./search-rest";
import { StatisticsRest } from "./statistics-rest";
import { UsersRest } from "./users-rest";

import type { EntryJp } from "./search-rest/types";
import { Users } from "./types";

export const api = new (class extends BasicRest {
	readonly statistics;
	readonly search;
	readonly kotoba;
	readonly users;
	readonly edits;

	dictionaryJapEntries(props: { wid: string }) {
		return this.extractData(
			this.#endpoint.get<EntryJp>(`dictionary/jap/entries/${props.wid}`),
		);
	}

	dictionaryJapBestUsers() {
		return this.extractData(
			this.#endpoint.get<Users>("/dictionary/jap/stats-user"),
		);
	}

	constructor() {
		super();

		this.#endpoint = axios.create({ baseURL: import.meta.env.VITE_API_URL });

		this.statistics = new StatisticsRest(this.#endpoint);
		this.search = new SearchRest(this.#endpoint);
		this.kotoba = new KotobaRest(this.#endpoint);
		this.users = new UsersRest(this.#endpoint);
		this.edits = new EditsRest(this.#endpoint);
	}

	#endpoint;
})();
