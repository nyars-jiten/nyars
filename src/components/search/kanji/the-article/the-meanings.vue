<template>
	<div class="flex flex-col gap-4">
		<div class="rounded-md text-accent-500">
			{{ title }}
		</div>
		<template v-for="meaning of meanings">
			<div class="flex flex-col gap-y-2">
				<div>
					<!-- eslint-disable-next-line vue/no-v-html -->
					<span v-html="bbCodesProcess(meaning.title)" />

					<span
						v-if="meaning.readings.length > 0"
						class="before:text-gray-200 before:content-['【'] after:text-gray-200 after:content-['】'] dark:before:text-gray-500 dark:after:text-gray-500"
					>
						<span
							v-for="reading of meaning.readings"
							class="before:text-gray-200 after:text-gray-200 after:content-['・'] last:after:content-none"
						>
							{{ convert_to_kana(reading) }}
						</span>
					</span>
				</div>
				<div
					class="flex flex-col gap-y-2 border-l border-gray-200 pl-3 text-gray-600 dark:border-gray-600 dark:text-gray-400"
				>
					<div
						v-for="word of meaning.words"
						class="inline-flex flex-wrap gap-x-2"
					>
						<RouterLink :to="location(word.wid)" class="text-lg">
							{{ word.word }}
						</RouterLink>
						<span class="text-gray-400 dark:text-gray-500">
							{{ convert_to_kana(word.reading) }}
						</span>
						<!-- eslint-disable vue/no-v-html -->
						<span
							class="text-gray-500 dark:text-gray-400"
							v-html="bbCodesProcess(word.meaning)"
						/>
						<!-- eslint-enable vue/no-v-html -->
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
	import { bbCodesProcess } from "@/core/text/bb-code";
	import { convert_to_kana } from "@nyars-jiten/jp-transcript";
	import type { RouteLocationRaw } from "vue-router";

	import { RoutesNames } from "@/router/routes-names";

	import { Meaning } from "@/api/dictionary/kanji/types";

	type Props = { meanings: Meaning[]; title: string };

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
