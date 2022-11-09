<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { useKanSearch } from "@/stores/search/kan";

	import KanjiArticle from "@/components/search/kanji/the-article.vue";
	import { onBeforeMount } from "vue";
	import { useSearch } from "@/stores/search";
	import { SearchType } from "@/api/types/search/search-type";

	const { results } = storeToRefs(useKanSearch());

	onBeforeMount(() => {
		console.log("kan");

		const { mode } = storeToRefs(useSearch());
		mode.value = SearchType.Kan;
	});
</script>

<template>
	<section class="flex flex-col gap-5">
		<TransitionGroup
			enter-active-class="duration-300 ease-out"
			enter-from-class="transform opacity-0 translate-x-3"
			enter-to-class="opacity-100 translate-x-0"
			leave-active-class="duration-150 ease-in"
			leave-from-class="opacity-100 translate-x-0"
			leave-to-class="transform opacity-0 translate-x-3"
			mode="out-in"
		>
			<KanjiArticle
				v-for="result of results.result"
				:key="result.kid"
				:article="result"
				:standalone="false"
			/>
		</TransitionGroup>
	</section>
</template>
