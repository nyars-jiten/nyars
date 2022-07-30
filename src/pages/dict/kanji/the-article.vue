<template>
	<section class="flex flex-col gap-4">
		<TheArticle :article="article" :standalone="standalone" />
	</section>
</template>

<script setup lang="ts">
	import { api } from "@/api";

	import { useRoute } from "vue-router";

	import TheArticle from "@/components/kanji/the-article.vue";

	type Props = { standalone: boolean };

	defineProps<Props>();

	const route = useRoute();

	const kid = route.params.kid;
	if (typeof kid !== "string") throw new Error("Bad component usage");

	const article = await api.dictionaryKanjiEntries({ kid });
</script>
