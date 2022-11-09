<script setup lang="ts">
	import { onBeforeMount, watch } from "vue";
	import { debounce, isEmpty } from "lodash";
	import { useJapSearch } from "@/stores/search/jap";
	import { useRoute } from "vue-router";
	import { storeToRefs } from "pinia";
	import { useSearch } from "@/stores/search";

	type Emits = { (event: "onSelected"): void };

	defineEmits<Emits>();

	const { request } = storeToRefs(useSearch());
	const { searchSuggestions } = useSearch();

	const { resetSuggestions } = useJapSearch();
	const { suggestions } = storeToRefs(useJapSearch());

	const search = debounce(searchSuggestions, 100);

	async function onRequest(request: string) {
		if (isEmpty(request)) {
			resetSuggestions();
			return;
		}

		await search({ request });
	}

	watch(request, onRequest);

	onBeforeMount(async () => {
		const { query } = useRoute();
		const { request } = query;

		if (typeof request != "string") return;

		await searchSuggestions({ request });
	});
</script>

<template>
	<div
		class="invisible peer-focus:visible absolute inset-x-0 top-[calc(100%)] z-10 overflow-hidden rounded-b-md bg-gray-100 shadow-xl hover:visible dark:bg-gray-700"
	>
		<button
			v-for="sugg of suggestions.values"
			type="button"
			class="block min-w-full hover:bg-white dark:hover:bg-gray-600 border-t border-gray-300 dark:border-gray-600 dark:bg-gray-700 py-2 px-4 text-left"
			@click="$emit('onSelected')"
		>
			{{ sugg }}
		</button>
	</div>
</template>
