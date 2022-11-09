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

				<TheWords :words="meaning.words" :title="''" v-if="isEditor" />

				<div
					class="flex flex-col gap-y-2 border-l border-gray-200 pl-3 text-gray-600 dark:border-gray-600 dark:text-gray-400"
				>
					<div v-for="word of meaning.words">
<<<<<<< HEAD
						<div v-if="!isEditor">
							<RouterLink :to="location(word)" class="text-lg">
								{{ word.word }}
							</RouterLink>

							<span class="text-gray-400 dark:text-gray-500 px-2">
								{{ convert_to_kana(word.reading) }}
							</span>
=======
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
							class="text-lg cursor-pointer hover:opacity-50"
							@click="
								searchResults({ request: word.word, mode: SearchType.Kan })
							"
						>
							{{ word.word }}
						</span>

						<span class="text-gray-400 dark:text-gray-500 px-2">
							{{ convert_to_kana(word.reading) }}
						</span>
>>>>>>> sawich

							<!-- eslint-disable vue/no-v-html -->
							<span
								class="text-gray-500 dark:text-gray-400"
								v-html="bbCodesProcess(word.meaning)"
							/>
							<!-- eslint-enable vue/no-v-html -->
						</div>

						<div v-else>
							<input
								:value="word.wid"
								name="word-wid-input"
								placeholder="wid"
							/>
							<input
								:value="word.word"
								name="word-word-input"
								placeholder="слово"
							/>
							<input
								:value="word.reading"
								name="word-reading-input"
								placeholder="чтение"
							/>
							<input
								:value="word.meaning"
								name="word-meaning-input"
								placeholder="значение"
							/>
						</div>
					</div>

					<p
						v-show="isEditor"
						class="outline cursor-pointer"
						@click="addWord(meaning.words)"
					>
						+ слово
					</p>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
	import { bbCodesProcess } from "@/core/text/bb-code";
	import { convert_to_kana } from "@nyars-jiten/jp-transcript";
<<<<<<< HEAD
	import { RoutesNames } from "@/router/routes-names";

	import type { RouteLocationRaw } from "vue-router";
	import { type Meaning } from "@/api/dictionary/kanji/types";
	import { type KanjiWord } from "@/api/dictionary/kanji/types";
=======

	import { RoutesNames } from "@/router/routes-names";

	import { KanjiWord, Meaning } from "@/api/dictionary/kanji/types";
	import { useSearch } from "@/stores/search";
	import { SearchType } from "@/api/types/search/search-type";
>>>>>>> sawich

	import TheWords from "../editor/the-words.vue";

	type Props = { meanings: Meaning[]; title: string; isEditor?: boolean };

<<<<<<< HEAD
	withDefaults(defineProps<Props>(), { isEditor: false });

	function location(word: KanjiWord): RouteLocationRaw {
		if (!word.wid || word.wid.length < 1) {
			return {
				name: RoutesNames.SearchKanResults,
				query: { request: word.word },
			};
		}

		return {
			name: RoutesNames.DictJpArticle,
			params: { articleId: word.wid },
		};
=======
	const { searchResults } = useSearch();

	function exists({ wid }: KanjiWord) {
		return wid.length >= 1;
>>>>>>> sawich
	}

	function addWord(words: KanjiWord[]) {
		words.push({
			wid: "",
			word: "",
			reading: "",
			meaning: "",
			nsR: false,
			nsM: false,
		});
	}
</script>
