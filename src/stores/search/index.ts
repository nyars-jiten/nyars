import { api } from "@/api";
import { SearchResultJapInfo } from "@/api/search-rest/types/search-result-jap-info";
import { SearchResultKanji } from "@/api/search-rest/types/search-result-kanji";
import { SearchResultWord } from "@/api/search-rest/types/search-result-word";
import { SearchType } from "@/api/types/search/search-type";
import { RoutesNames } from "@/router/routes-names";
import { defineStore } from "pinia";

import type { Actions, Getters, State } from "./types";

function emptySearchGrammar(): SearchResultJapInfo {
	return {
		count: 0,
		page: 0,
		request: "",
		selectedLemma: 0,
		parsedGrammar: [],
	};
}

function emptySearchWordResults(): SearchResultWord {
	return {
		info: emptySearchGrammar(),
		result: [],
	};
}

function emptySearchKanjiResults(): SearchResultKanji {
	return {
		result: [],
	};
}

export const useSearch = defineStore<string, State, Getters, Actions>(
	"search",
	{
		state() {
			return {
				request: "",
				resultsJap: emptySearchWordResults(),
				resultsKanji: emptySearchKanjiResults(),
				type: SearchType.Jap,
			};
		},

		actions: {
			async searchJap(props: { request?: string; userRequest?: boolean }) {
				this.type = SearchType.Jap;
				this.resultsJap.result = [];

				if (props.request) {
					this.request = props.request;
				}

				await this.router.push({
					name: RoutesNames.SearchResults,
					query: { request: this.request, type: this.type },
				});

				const response = await api.search.searchJap({
					request: this.request,
					page: 0,
				});

				if (props.userRequest) {
					this.resultsJap.info = response.info;
				}

				this.resultsJap.result = response.result;
			},

			async searchKanji(props: { request?: string; userRequest?: boolean }) {
				this.type = SearchType.Kanji;
				this.resultsJap.result = [];

				if (props.request) {
					this.request = props.request;
				}

				await this.router.push({
					name: RoutesNames.SearchResults,
					query: { request: this.request, type: this.type },
				});

				const response = await api.search.searchKanji({
					request: this.request,
					page: 0,
				});

				this.resultsKanji.result = response.result;
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
