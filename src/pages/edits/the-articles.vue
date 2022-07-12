<template>
	<TheWeeaboo
		class="bg-white px-10 py-5 leading-relaxed rounded shadow-xl border border-gray-100"
	/>

	<section
		class="flex flex-col gap-2 bg-white px-10 py-5 leading-relaxed rounded shadow-xl border border-gray-100"
	>
		<Article
			v-for="article of articles"
			:key="article.id"
			:article="article"
			class="border-b border-gray-100 pb-2 px-2 last:border-none last:pb-0"
		/>
	</section>
</template>

<script setup lang="ts">
	import { api } from "@/api";
	import Article from "@/components/edits/article.vue";
	import TheWeeaboo from "@/components/the-weeaboo.vue";

	const articles = await api.edits.list({ n: 25, p: 0, statuses: [] });
</script>
