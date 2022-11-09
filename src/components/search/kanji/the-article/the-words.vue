<template>
	<div class="flex flex-col gap-4">
		<div class="rounded-md text-accent-500">
			{{ title }}
		</div>
		<div>
			<div v-for="word of words">
				<div v-if="!isEditor">
					<RouterLink :to="location(word.wid)" class="text-lg">
						{{ word.word }}
					</RouterLink>

					<span class="text-gray-400 dark:text-gray-500 px-2">
						{{ convert_to_kana(word.reading) }}
					</span>

					<!-- eslint-disable vue/no-v-html -->
					<span
						class="flex-wrap text-gray-500 dark:text-gray-400"
						v-html="bbCodesProcess(word.meaning)"
					/>
				</div>
				<div v-else>
					<input :value="word.wid" name="word-wid-input" placeholder="wid" />
					<input :value="word.word" name="word-word-input" placeholder="слово" />
					<input :value="word.reading" name="word-reading-input" placeholder="чтение" />
					<input :value="word.meaning" name="word-meaning-input" placeholder="значение" />
				</div>
			</div>
			<p v-show="isEditor" class="outline cursor-pointer" @click="addWord">
				+ слово
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { bbCodesProcess } from "@/core/text/bb-code";
	import { convert_to_kana } from "@nyars-jiten/jp-transcript";

	import { type RouteLocationRaw } from "vue-router";
	import { type KanjiWord } from "@/api/dictionary/kanji/types";

	import { RoutesNames } from "@/router/routes-names";

	type Props = { words: KanjiWord[]; title: string; isEditor: boolean };

	const props = defineProps<Props>();

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

	const newWord: KanjiWord = {
		wid: "",
		word: "",
		reading: "",
		meaning: "",
		nsR: false,
		nsM: false
	};

	function addWord() {
		props.words.push(newWord);
	}
</script>
