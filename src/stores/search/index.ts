import {  ref } from "vue";
import { defineStore } from "pinia";

import { SearchType } from "@/api/types/search/search-type";
import { useJapSearch } from "./jap";

import { useKanSearch } from "./kan";
import { ReadOnlyRequest } from "./types";

export const useSearch = defineStore("search", () => {
	const { searchSuggestions: japSs } = useJapSearch();
	const { searchResults: searchJap } = useJapSearch();

	const { search: searchKan } = useKanSearch();

	const mode = ref(SearchType.Jap);
	const request = ref("");

	function updateRequest(params?: ReadOnlyRequest) {
		if (params) {
			request.value = params.request;
		}
	}

	async function searchResults(params?: ReadOnlyRequest) {
		updateRequest(params);

		if (mode.value == SearchType.Kan) {
			return await searchKan({ request: request.value });
		}

		return await searchJap({ request: request.value });
	}

	async function searchSuggestions(params?: ReadOnlyRequest) {
		updateRequest(params);

		await japSs({ request: request.value });
	}

	return { mode, request, searchSuggestions, searchResults };
});
