<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { SearchType } from "@/api/types/search/search-type";
	import { useSearch } from "@/stores/search";

	import Grammar from "@/components/search/jp/Grammar.vue";
	import JpArticle from "@/components/search/jp/Article.vue";
	import KanjiArticle from "@/components/search/kanji/the-article.vue";

	const { type, resultsJp, resultsKanji } = storeToRefs(useSearch());
</script>

<template>
	<section class="flex flex-col gap-5">
		<Grammar v-if="type != SearchType.Kanji" />

		<TransitionGroup
			enter-active-class="duration-300 ease-out"
			enter-from-class="transform opacity-0 translate-x-3"
			enter-to-class="opacity-100 translate-x-0"
			leave-active-class="duration-150 ease-in"
			leave-from-class="opacity-100 translate-x-0"
			leave-to-class="transform opacity-0 translate-x-3"
			mode="out-in"
		>
			<template v-if="type == SearchType.Jp">
				<JpArticle
					v-for="result of resultsJp.result"
					:article="result"
					:standalone="false"
				/>
			</template>

			<template v-else-if="type == SearchType.Kanji">
				<KanjiArticle
					v-for="result of resultsKanji.result"
					:article="result"
					:standalone="false"
				/>
			</template>
		</TransitionGroup>
	</section>
</template>
