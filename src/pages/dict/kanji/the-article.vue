<template>
	<section class="flex flex-col gap-4">
		<TheArticle :article="article" :standalone="standalone" />
	</section>
</template>

<script setup lang="ts">
	import { api } from "@/api";

	import { useRoute } from "vue-router";

	import TheArticle from "@/components/search/kanji/the-article.vue";
	import { onMounted, ref } from "vue";
	import { EntryKanji } from "@/api/dictionary/kanji/types";

	type Props = { standalone: boolean };

	defineProps<Props>();

	const route = useRoute();

	const { articleId } = route.params;
	if (typeof articleId !== "string") throw new Error("Bad component usage");

	const article = ref<EntryKanji>({
		kid: "",
		entry: {
			general: {
				literal: "",
				ids: "",
				radical: "",
				shortMeans: "",
				strokeCount: 0,
				jis: 0,
				note: "",
				freq: 0,
				tags: [],
			},
			readings: {
				onyomi: [],
				kunyomi: [],
				nanori: [],
				other: [],
			},
			forms: [],
			standaloneMeanings: [],
			composedMeanings: [],
			kanbunMeanings: [],
			indices: [],
		},
		images: [],
		radical: {
			id: 0,
			sid: "",
			classificationId: 0,
			image: "",
			literal: "",
			strokes: 0,
			position: "",
			meaning: "",
			reading: "",
		},
		isReviewed: false,
	});

	onMounted(async () => {
		article.value = await api.dictionaryKanjiEntries({ kid: articleId });
	});
</script>
