import { api } from "@/api";
import { defineStore, _GettersTree } from "pinia";

import type { SearchResults } from "@/api/search-rest/types/search-results";

export type State = {
	request: string;
	results: SearchResults;
};

export type Actions = {
	search(): Promise<void>;
	clearResults(): void;
};

type Getters = _GettersTree<State>;

export const useSearch = defineStore<string, State, Getters, Actions>(
	"search",
	{
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
	},
);
