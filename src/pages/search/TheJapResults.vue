<script setup lang="ts">
	import { storeToRefs } from "pinia";

	import { useJapSearch } from "@/stores/search/jap";

	import TheJapGrammar from "@/components/search/jp/TheJapGrammar.vue";
	import JpArticle from "@/components/search/jp/Article.vue";

	const { results } = storeToRefs(useJapSearch());
</script>

<template>
	<section class="flex flex-col gap-5">
		<TheJapGrammar />

		<TransitionGroup
			enter-active-class="duration-300 ease-out"
			enter-from-class="transform opacity-0 translate-x-3"
			enter-to-class="opacity-100 translate-x-0"
			leave-active-class="duration-150 ease-in"
			leave-from-class="opacity-100 translate-x-0"
			leave-to-class="transform opacity-0 translate-x-3"
			mode="out-in"
		>
			<JpArticle
				v-for="result of results.result"
				:key="result.wid"
				:article="result"
				:standalone="false"
			/>
		</TransitionGroup>
	</section>
</template>
