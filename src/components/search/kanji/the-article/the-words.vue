<script setup lang="ts">
	import { bbCodesProcess } from "@/utils/text/bb-code";
	import { convert_to_kana } from "@nyars-jiten/jp-transcript";

	import { type KanjiWord } from "@/api/dictionary/kanji/types";

	import { RoutesNames } from "@/router/routes-names";
	import { useSearch } from "@/stores/search";
	import { SearchType } from "@/api/types/search/search-type";

	type Props = { words: KanjiWord[]; title: string };

	defineProps<Props>();

	const { searchResults } = useSearch();

	function exists({ wid }: KanjiWord) {
		return wid.length >= 1;
	}
</script>

<template>
	<div class="flex flex-col gap-4">
		<div class="rounded-md text-accent-500">
			{{ title }}
		</div>
		<div>
			<div v-for="word of words">
				<RouterLink
					v-if="exists(word)"
					:to="{
						name: RoutesNames.DictKanjiArticle,
						params: { articleId: word.wid },
					}"
					class="text-lg"
				>
					{{ word.word }}
				</RouterLink>

				<span
					v-else
					class="cursor-pointer text-lg hover:opacity-50"
					@click="searchResults({ request: word.word, mode: SearchType.Kan })"
				>
					{{ word.word }}
				</span>

				<span class="px-2 text-gray-400 dark:text-gray-500">
					{{ convert_to_kana(word.reading) }}
				</span>

				<!-- eslint-disable vue/no-v-html -->
				<span
					class="flex-wrap text-gray-500 dark:text-gray-400"
					v-html="bbCodesProcess(word.meaning)"
				/>
				<!-- eslint-enable vue/no-v-html -->
			</div>
		</div>
	</div>
</template>
