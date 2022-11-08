<template>
	<div class="flex flex-col gap-4">
		<div class=" rounded-md text-accent-500">
			{{ title }}
		</div>
		<div class="flex flex-col gap-y-2">
			<div v-for="word of words">
				<RouterLink :to="location(word.wid)" class="text-lg">
					{{ word.word }}
				</RouterLink>
				<span class="mx-2 text-gray-400 dark:text-gray-500">
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

<script setup lang="ts">
	import { bbCodesProcess } from "@/core/text/bb-code";
	import { convert_to_kana } from "@nyars-jiten/jp-transcript";
	import type { RouteLocationRaw } from "vue-router";

	import { RoutesNames } from "@/router/routes-names";

	import { KanjiWord } from "@/api/dictionary/kanji/types";

	type Props = { words: KanjiWord[]; title: string };

	defineProps<Props>();

	function location(wid: string): RouteLocationRaw {
		if (!wid || wid.length < 1) {
			return {
				name: RoutesNames.SearchResults,
				query: { request: wid },
			};
		}

		return {
			name: RoutesNames.DictJpArticle,
			params: { articleId: wid },
		};
	}
</script>
