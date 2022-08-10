<template>
	<section class="flex flex-col gap-10">
		<TheGrammar
			v-if="store.resultsJp.info && store.type != SearchType.Kanji"
			:grammars="store.resultsJp.info.parsedGrammar"
		/>

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
			<template v-if="store.type == SearchType.Jp">
				<JpArticle
					v-for="result of store.resultsJp.result"
					:key="result.wid"
					:article="result"
					:standalone="false"
				/>
			</template>
			<template v-else-if="store.type == SearchType.Kanji">
				<KanjiArticle
					v-for="result of store.resultsKanji.result"
					:key="result.kid"
					:article="result"
					:standalone="false"
				/>
			</template>
		</TransitionGroup>
	</section>
</template>

<script setup lang="ts">
	import { SearchType } from "@/api/types/search/search-type";
	import { useSearch } from "@/stores/search";

	import JpArticle from "@/components/search/jp/the-article.vue";
	import TheGrammar from "@/components/search/jp/the-grammar.vue";
	import KanjiArticle from "@/components/search/kanji/the-article.vue";

	const store = useSearch();
</script>
