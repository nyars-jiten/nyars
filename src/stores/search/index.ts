import { api } from "@/api";
import { SearchResult } from "@/api/search-rest/types/search-result";
import { SearchResultInfo } from "@/api/search-rest/types/search-result-info";
import { defineStore } from "pinia";

import type { Actions, Getters, State } from "./types";

function emptySearchGrammar(): SearchResultInfo {
	return {
		count: 0,
		page: 0,
		request: "",
		selectedLemma: 0,
		parsedGrammar: [],
	};
}

function emptySearchResults(): SearchResult {
	return {
		info: emptySearchGrammar(),
		result: [],
	};
}

export const useSearch = defineStore<string, State, Getters, Actions>(
	"search",
	{
		state() {
			return {
				request: "ようこそ実力至上主義の教室へ 2期",
				results: emptySearchResults(),
			};
		},

		actions: {
			async search(props: { request?: string; userRequest: boolean }) {
				this.results.result = [];

				const response = await api.search.search({
					request: props.request ?? this.request,
					page: 0,
				});

				if (props.userRequest) {
					this.results.info = response.info;
				}

				this.results.result = response.result;
			},

			clearResults(props: { withGrammar: boolean }) {
				this.results.result = [];

				if (props.withGrammar) {
					this.results.info = emptySearchGrammar();
				}
			},
		},
	},
);
