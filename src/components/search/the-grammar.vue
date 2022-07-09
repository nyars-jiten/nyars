<template>
	<section
		v-show="grammars.length"
		class="select-text px-10 py-5 bg-white rounded shadow"
	>
		<div class="flex gap-2 underline underline-offset-4 flex-wrap">
			<button
				v-for="(grammar, i) of grammars"
				:key="`${grammar.word}-${i}`"
				class="hover:opacity-50"
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
