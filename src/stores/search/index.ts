import { api } from "@/api";
import { defineStore } from "pinia";

import type { Actions, Getters, State } from "./types";

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
