import { api } from "@/api";
import { SearchResultJpInfo } from "@/api/search-rest/types/search-result-jp-info";
import { SearchResultKanji } from "@/api/search-rest/types/search-result-kanji";
import { SearchResultWord } from "@/api/search-rest/types/search-result-word";
import { SearchType } from "@/api/types/search/search-type";
import { RoutesNames } from "@/router/routes-names";
import { isEmpty } from "lodash";
import { defineStore } from "pinia";

import type { Actions, Getters, State } from "./types";

function emptySearchGrammar(): SearchResultJpInfo {
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
				suggs: [],
				request: "",
				resultsJp: emptySearchWordResults(),
				resultsKanji: emptySearchKanjiResults(),
				type: SearchType.Jp,
			};
		},

		actions: {
			async searchJp(props: { request?: string; userRequest?: boolean }) {
				this.type = SearchType.Jp;
				this.resultsJp.result = [];

				if (props.request) {
					this.request = props.request;
				}

				await this.router.push({
					name: RoutesNames.SearchResults,
					query: { request: this.request, type: this.type },
				});

				const response = await api.search.searchJp({
					request: this.request,
					page: 0,
				});

				if (props.userRequest) {
					this.resultsJp.info = response.info;
				}

				this.resultsJp.result = response.result;
			},

			async searchKanji(props: { request?: string; userRequest?: boolean }) {
				this.type = SearchType.Kanji;
				this.resultsKanji.result = [];

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

			async searchSuggs({ request }: { request?: string }) {
				const r = request ?? this.request;
				if (isEmpty(r)) return;

				this.suggs = await api.search.sugg({ request: r });
			},

			clearResults(props: { withGrammar: boolean }) {
				this.results.result = [];
				this.suggs = [];

				if (props.withGrammar) {
					this.results.info = emptySearchGrammar();
				}
			},
		},
	},
);
