<script setup lang="ts">
	import { type EntryJp } from "@/api/dictionary/jp/types";

	import ViewMode from "./the-article/ViewMode.vue";
	import Words from "./the-article/Words.vue";
	import Description from "./the-article/Description.vue";
	import UserBar from "./the-article/UserBar.vue";

	type Props = { article: EntryJp; standalone: boolean };

	defineProps<Props>();

	function unrevived(article: EntryJp) {
		if (article && article.isReviewed) return [];

		return ["border-l-2", "border-l-orange-500", "dark:border-l-orange-500"];
	}
</script>

<template>
	<article
		class="rounded p-8 select-text border border-gray-100 dark:border-gray-700 bg-white shadow-md dark:bg-gray-800"
		:class="unrevived(article)"
	>
		<ViewMode #default="{ state, toggle }">
			<Words
				:article="article"
				:standalone="standalone"
				class="mb-2 border-b border-gray-200 dark:border-gray-700 pb-2"
			/>

			<Description
				:meanings="article.entry.meanings"
				:details="state || standalone"
				class="px-8"
			/>

			<UserBar
				v-if="!standalone"
				:article="article"
				:toggle="toggle"
				:details="state"
				class="px-8 mt-2 border-t border-gray-200 dark:border-gray-700 py-2"
			/>
		</ViewMode>
	</article>
</template>
