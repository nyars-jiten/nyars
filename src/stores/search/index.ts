import { api } from "@/api";
import { defineStore, _GettersTree } from "pinia";

import type { SearchResults } from "@/api/types/search-results";

export type State = {
	request: string;
	results: SearchResults;
};

export type Actions = {
	search(): Promise<void>;
	clearResults(): void;
};

export const useSearch = defineStore<string, State, {}, Actions>("search", {
	state() {
		return {
			request: "",
			results: { results: [], total: 0 },
		};
	},

	actions: {
		async search() {
			this.results = await api.search.search({ request: this.request });
		},

		clearResults() {
			this.results = {
				results: [],
				total: 0,
			};
		},
	},
});
