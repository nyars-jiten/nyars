import axios from "axios";

import { SearchRest } from "./search-rest";
import { StatisticsRest } from "./statistics-rest";
import { UsersRest } from "./users-rest";

export const api = new (class {
	public readonly statistics;
	public readonly search;
	public readonly users;

	public constructor() {
		this.#endpoint = axios.create({ baseURL: import.meta.env.VITE_APP_API });

		this.statistics = new StatisticsRest(this.#endpoint);
		this.search = new SearchRest(this.#endpoint);
		this.users = new UsersRest(this.#endpoint);
	}

	#endpoint;
})();
