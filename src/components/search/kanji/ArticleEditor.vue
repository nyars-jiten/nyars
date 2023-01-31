<script setup lang="ts">
	import { useI18n } from "vue-i18n";
	import { MessagesNames } from "@/locale/messages-names";
	import { type EntryKanji } from "@/api/dictionary/kanji/types";
	import TheTags from "@/components/Tags.vue";
	import TheMeanings from "./the-article/the-meanings.vue";
	import TheReading from "./the-article/the-reading.vue";
	import TheWords from "./editor/TheWords.vue";
	import Input from "./editor/Input.vue";
	import TextArea from "./editor/TextArea.vue";
	type Props = { article: EntryKanji };
	defineProps<Props>();
	const standalone = true;
	const { t } = useI18n();
</script>

<template>
	<article
		class="border border-gray-100 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800 md:rounded-md"
	>
		<div class="grid select-text grid-cols-1 gap-8 md:grid-cols-[12rem_1fr]">
			<div class="flex flex-col gap-8">
				<div
					class="group relative flex min-h-[11rem] w-auto flex-col justify-center gap-2 p-2 text-center"
				>
					<div class="flex flex-col gap-2">
						<span class="text-9xl">{{ article.entry.general.literal }}</span>
						<span class="break-words">
							<Input
								type="text"
								v-model="article.entry.general.shortMeans"
								name="short-means-input"
							/>
						</span>
					</div>
				</div>

				<div
					class="flex flex-col gap-2 rounded-md bg-neutral-100 py-2 px-3 dark:bg-gray-700"
				>
					<!-- вероятно пока что не нужно -->
					<!-- <p>
						<span class="text-sm text-gray-400">
							{{ t(MessagesNames.Frequency) }}
						</span>
						<Input v-model="article.entry.general.freq" name="freq-input" />
					</p> -->
					<p>
						<span class="text-sm text-gray-400">
							{{ t(MessagesNames.Radical) }}
						</span>
						<Input
							v-model="article.entry.general.literal"
							name="literal-input"
						/>
					</p>
					<p>
						<span class="text-sm text-gray-400">
							{{ t(MessagesNames.StrokeCount) }}
						</span>
						<Input
							v-model="article.entry.general.strokeCount"
							name="strokecount-input"
						/>
					</p>
					<p>
						<span class="text-sm text-gray-400">
							{{ t(MessagesNames.Ids) }}
						</span>
						<Input v-model="article.entry.general.ids" name="ids-input" />
					</p>
				</div>

				<div class="flex flex-col gap-2 rounded-md">
					<p v-show="article.entry.general.jis">
						<span class="text-sm text-gray-400 dark:text-gray-400">
							{{ t(MessagesNames.JIS) }}
						</span>
						<Input v-model="article.entry.general.jis" name="jis-input" />
					</p>
				</div>

				<!-- <TheForms v-if="standalone" :forms="article.entry.forms" /> -->

				<!-- <TheImages v-if="standalone" :images="article.images" /> -->
			</div>

			<div class="flex flex-col gap-8">
				<TheTags :tags="article.entry.general.tags" class="text-sm" />

				<div v-if="article.entry.readings" class="flex flex-col gap-4">
					<template v-for="(reading, readingType) of article.entry.readings">
						<TheReading
							v-if="
								(standalone || !['other', 'nanori'].includes(readingType)) &&
								reading.length > 0
							"
							:readings="reading"
							:type="readingType"
						/>
					</template>
				</div>

				<div
					class="flex flex-col gap-2 rounded-md bg-neutral-100 py-2 px-3 dark:bg-gray-700"
				>
					<span class="text-sm text-gray-400">{{ t(MessagesNames.Note) }}</span>
					<TextArea v-model="article.entry.general.note" name="note-input" />
				</div>

				<div class="flex flex-col gap-8">
					<TheWords
						:words="article.entry.standaloneMeanings"
						:title="t(MessagesNames.StandaloneMeanings)"
					/>

					<TheMeanings
						:meanings="article.entry.composedMeanings"
						:title="t(MessagesNames.ComposedMeanings)"
						:is-editor="true"
					/>

					<TheMeanings
						:meanings="article.entry.kanbunMeanings"
						:title="t(MessagesNames.KanbunMeanings)"
						:is-editor="true"
					/>
				</div>
			</div>
		</div>
	</article>
</template>
