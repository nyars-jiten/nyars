<template>
	<section class="flex flex-col gap-10">
		<TheWeeaboo
			class="rounded border border-gray-100 bg-white px-10 py-5 leading-relaxed shadow-xl"
		/>

		<section
			class="flex flex-col gap-2 rounded border border-gray-100 bg-white px-10 py-5 leading-relaxed shadow-xl"
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
