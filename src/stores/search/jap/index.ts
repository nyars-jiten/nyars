import { isEmpty } from "lodash";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import { api } from "@/api";
import { RoutesNames } from "@/router/routes-names";

import { type SearchResultWord } from "@/api/search-rest/types";
import { type DeepReadonly } from "vue";
import { type SearchResultJpInfo } from "@/api/search-rest/types/search-result-jp-info";
import { type ReadOnlyRequest } from "../types";

function emptySearchGrammar(): SearchResultJpInfo {
	return {
		count: 0,
		page: 0,
		request: "",
		selectedLemma: 0,
		parsedGrammar: [],
	};
}

function emptySearchWordResults(): SearchResultWord & { updatedAt: Date } {
	return {
		info: emptySearchGrammar(),
		result: [],
		updatedAt: new Date(),
	};
}

export const useJapSearch = defineStore("japSearch", () => {
	type Suggestions = {
		updatedAt: Date;
		values: string[];
	};

	const { push } = useRouter();

	const suggestions = reactive<Suggestions>({
		updatedAt: new Date(),
		values: [],
	});

	const results = ref<ReturnType<typeof emptySearchWordResults>>(
		emptySearchWordResults(),
	);

	const request = reactive({ value: "" });

	function resetSuggestions() {
		suggestions.updatedAt = new Date();
		suggestions.values = [];
	}

	function resetResults() {
		results.value = emptySearchWordResults();
	}

	async function searchResults({ request: q }: ReadOnlyRequest) {
		// if (request.value == q) return false;

		resetResults();

		await push({
			name: RoutesNames.SearchJapResults,
			query: { request: (request.value = q) },
		});

		const updatedAt = new Date();

		const response = await api.search.searchJp({
			request: request.value,
			page: 0,
		});

		if (updatedAt >= results.value.updatedAt) {
			results.value = { ...response, updatedAt };
		}

		return true;
	}

	async function searchSuggestions({ request: q }: ReadOnlyRequest) {
		if (isEmpty(q) || q == request.value) return false;

		const updatedAt = new Date();
		const values = await api.search.sugg({ request: q });

		if (updatedAt >= suggestions.updatedAt) {
			suggestions.updatedAt = updatedAt;
			suggestions.values = values;
		}

		return true;
	}

	return {
		request: request as DeepReadonly<typeof request>,

		suggestions: suggestions as DeepReadonly<typeof suggestions>,
		searchSuggestions,
		resetSuggestions,

		results: results as DeepReadonly<typeof results>,
		searchResults,
	};
});
