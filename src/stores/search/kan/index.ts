import { api } from "@/api";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { reactive } from "vue";

import { RoutesNames } from "@/router/routes-names";

import { type DeepReadonly } from "vue";
import { type SearchResultKanji } from "@/api/search-rest/types/search-result-kanji";
import { type ReadOnlyRequest } from "../types";

function emptySearchKanjiResults(): SearchResultKanji & { updatedAt: Date } {
	return {
		result: [],
		updatedAt: new Date(),
	};
}

export const useKanSearch = defineStore("kanSearch", () => {
	const { push } = useRouter();

	const request = reactive({
		value: "",
	});

	const results = reactive(emptySearchKanjiResults());

	function reset() {
		results.result = [];
	}

	async function search({ request: q }: ReadOnlyRequest) {
		if (request.value == q) return false;

		reset();

		await push({
			name: RoutesNames.SearchKanResults,
			query: { request: (request.value = q) },
		});

		const response = await api.search.searchKanji({
			request: q,
			page: 0,
		});

		results.result = response.result;

		return true;
	}

	return {
		request: request as DeepReadonly<typeof request>,
		results: results as Readonly<ReturnType<typeof emptySearchKanjiResults>>,
		search,
	};
});
