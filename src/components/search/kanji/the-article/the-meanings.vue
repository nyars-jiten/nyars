<script setup lang="ts">
	import { bbCodesProcess } from "@/utils/text/bb-code";
	import { convert_to_kana } from "@nyars-jiten/jp-transcript";

	import { RoutesNames } from "@/router/routes-names";

	import { KanjiWord, Meaning } from "@/api/dictionary/kanji/types";
	import { SearchType } from "@/api/types/search/search-type";
	import { useSearch } from "@/stores/search";

	import TheWords from "../editor/TheWords.vue";
	import EditInput from "../editor/EditInput.vue";
	import Button from "@/components/generic-button.vue";
	import EditableSpan from "./editable-span.vue";

	type Props = { meanings: Meaning[]; title: string; isEditor?: boolean };

	withDefaults(defineProps<Props>(), { isEditor: false });

	function exists({ wid }: KanjiWord) {
		return wid.length >= 1;
	}

	const { searchResults } = useSearch();

	// function editReadingByIndex(meaningId: number, readingId: number) {
	// 	//
	// }
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

<template>
	<div class="flex flex-col gap-4">
		<div class="text-accent-500 rounded-md">
			{{ title }}
		</div>
		<template v-for="meaning of meanings">
			<div class="flex flex-col gap-y-2">
				<div v-if="!isEditor">
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
				<div v-else>
					<EditableSpan
						v-model="meaning.title"
						name="meaning-edit-input"
						placeholder="значение"
					/>

					<span
						class="before:text-gray-200 before:content-['【'] after:text-gray-200 after:content-['】'] dark:before:text-gray-500 dark:after:text-gray-500"
					>
						<span
							v-for="(_, readingId) of meaning.readings"
							class="before:text-gray-200 after:text-gray-200 after:content-['・'] last:after:content-none"
						>
							<EditableSpan
								v-model="meaning.readings[readingId]"
								name="reading-edit-input"
								placeholder="чтение"
							/>
							<Button
								@click="meaning.readings.splice(readingId, 1)"
								class="font-medium text-red-700"
								>X</Button
							>
						</span>
						<span>
							<Button @click="meaning.readings.push('')" class="font-medium"
								>+ чтение</Button
							>
						</span>
					</span>
					<div>
						<span>Источники: </span>
						<EditInput
							v-model="meaning.source"
							name="source-edit-input"
							placeholder="источники"
						/>
					</div>
				</div>
				<div
					v-if="!isEditor"
					class="flex flex-col gap-y-2 border-l border-gray-200 pl-3 text-gray-600 dark:border-gray-600 dark:text-gray-400"
				>
					<div v-for="word of meaning.words">
						<div v-if="!isEditor">
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
								@click="
									searchResults({ request: word.word, mode: SearchType.Kan })
								"
							>
								{{ word.word }}
							</span>

							<span
								v-else
								class="cursor-pointer text-lg hover:opacity-50"
								@click="
									searchResults({ request: word.word, mode: SearchType.Kan })
								"
							>
								{{ word.word }}
							</span>
							<span class="px-2 text-gray-400 dark:text-gray-500">
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
				<TheWords :words="meaning.words" :title="''" v-else />
			</div>
		</template>
	</div>
</template>
