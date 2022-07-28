<template>
	<section class="flex flex-col gap-10">
		<TheWeeaboo
			class="border border-gray-100 bg-white p-8 leading-relaxed shadow-md dark:border-gray-700 dark:bg-gray-800 md:rounded-md"
		/>

		<section
			class="flex flex-col gap-2 border border-gray-100 bg-white p-8 leading-relaxed shadow-md dark:border-gray-700 dark:bg-gray-800 md:rounded-md"
		>
			<FullArticle
				v-for="article of articles"
				:key="article.id"
				:article="article"
				class="px-2 pb-2 shadow"
			/>
		</section>
	</section>
</template>

<script setup lang="ts">
	import { api } from "@/api";

	import FullArticle from "@/components/edits/full-article.vue";
	import TheWeeaboo from "@/components/the-weeaboo.vue";

	const articles = await api.edits.list({ n: 25, p: 0, statuses: [] });
</script>
