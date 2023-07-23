<script setup lang="ts">
	import { api } from "@/api";
	import { onMounted, reactive } from "vue";

	import { EditList } from "@/api/edits-rest/types";

	import FullArticle from "@/components/edits/full-article.vue";
	import TheWeeaboo from "@/components/TheWeeaboo.vue";

	const articles = reactive<EditList>([]);

	onMounted(async () => {
		articles.push(...(await api.edits.list({ n: 25, p: 0, statuses: [] })));
	});
</script>

<template>
	<section class="flex flex-col gap-10">
		<TheWeeaboo
			class="border border-gray-100 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800 md:rounded-md"
		/>

		<section
			class="flex flex-col gap-2 border border-gray-100 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800 md:rounded-md"
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
