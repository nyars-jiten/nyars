<template>
	<section
		v-show="grammars.length"
		class="select-text rounded border border-gray-100 bg-white px-10 py-5 shadow-md dark:border-gray-700 dark:bg-gray-800"
	>
		<div class="flex flex-wrap gap-2 underline underline-offset-4">
			<button
				v-for="(grammar, i) of grammars"
				:key="`${grammar.word}-${i}`"
				class="hover:opacity-75"
				type="button"
				@click="search(grammar.word)"
			>
				{{ grammar.word }}
			</button>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { ParserResponse } from "@/api/types/search/parser-response";
	import { useSearch } from "@/stores/search";

	type Props = { grammars: ParserResponse[] };

	defineProps<Props>();

	const store = useSearch();

	async function search(request: string) {
		await store.search({ request, userRequest: false });
	}
</script>
