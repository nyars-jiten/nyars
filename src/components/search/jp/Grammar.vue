<script setup lang="ts">
	import { useSearch } from "@/stores/search";

	const store = useSearch();

	async function search(request: string) {
		await store.searchJp({ request, userRequest: false });
	}
</script>

<template>
	<section
		v-show="store.resultsJp.info.parsedGrammar.length"
		class="rounded border border-gray-100 bg-white px-10 py-5 shadow-md dark:border-gray-700 dark:bg-gray-800"
	>
		<div class="flex flex-wrap gap-2 underline underline-offset-4">
			<button
				v-for="grammar of store.resultsJp.info.parsedGrammar"
				class="hover:opacity-75 select-text"
				type="button"
				@click="search(grammar.word)"
			>
				{{ grammar.word }}
			</button>
		</div>
	</section>
</template>
