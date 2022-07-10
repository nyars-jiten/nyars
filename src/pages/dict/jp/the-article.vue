<template>
	<section class="flex flex-col gap-4">
		<TheArticle :article="article" :standalone="standalone" />

		<div
			v-if="images.length > 0"
			class="flex flex-wrap gap-2 bg-white px-10 py-5 leading-relaxed rounded shadow-xl border border-gray-100"
		>
			<img
				v-for="image of images"
				:key="image.link"
				:src="image.link"
				:alt="image.title"
				class="h-20 w-auto"
			/>
		</div>

		<div
			class="bg-white px-10 py-5 leading-relaxed rounded shadow-xl border border-gray-100"
		>
			<div
				v-for="(info, infoId) in locale.tm(MessagesNames.SearchInfo)"
				:key="infoId"
			>
				📙 {{ info }}
			</div>
		</div>

		<div
			class="bg-white px-10 py-5 leading-relaxed rounded shadow-xl border border-gray-100"
		>
			правки
		</div>
	</section>
</template>

<script setup lang="ts">
	import { useI18n } from "vue-i18n";
	import { useRoute } from "vue-router";

	import { api } from "@/api";
	import { MessagesNames } from "@/locale/messages-names";

	import TheArticle from "@/components/search/the-article.vue";

	type Props = { standalone: boolean };

	defineProps<Props>();

	const route = useRoute();
	const locale = useI18n();

	const wid = route.params.wid;
	if (typeof wid !== "string") throw new Error("Bad component usage");

	const article = await api.dictionaryJapEntries({ wid });
	const images = await api.kotoba.entryImages({ wid });
</script>

<style scoped></style>
