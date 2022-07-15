<template>
	<section class="flex flex-col gap-10">
		<TheGrammar :grammars="store.results.info.parsedGrammar" />

		<TransitionGroup
			tag="main"
			class="flex flex-col gap-5"
			enter-active-class="duration-300 ease-out"
			enter-from-class="transform opacity-0 translate-x-3"
			enter-to-class="opacity-100 translate-x-0"
			leave-active-class="duration-150 ease-in"
			leave-from-class="opacity-100 translate-x-0"
			leave-to-class="transform opacity-0 translate-x-3"
			mode="out-in"
			:class="'min-w-full'"
		>
			<TheArticle
				v-for="result of store.results.result"
				:key="result.wid"
				:article="result"
				:standalone="false"
			/>
		</TransitionGroup>
	</section>
</template>

<script setup lang="ts">
	import { useSearch } from "@/stores/search";

	import TheArticle from "@/components/search/the-article.vue";
	import TheGrammar from "@/components/search/the-grammar.vue";

	const store = useSearch();
</script>
