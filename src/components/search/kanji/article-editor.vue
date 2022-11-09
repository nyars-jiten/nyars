<script setup lang="ts">
	import { computed } from "vue";

	import { MessagesNames } from "@/locale/messages-names";
	import { RoutesNames } from "@/router/routes-names";
	import { useI18n } from "vue-i18n";

	import { EntryKanji } from "@/api/dictionary/kanji/types";
	import { unicodeIndexFromUTF8, unicodeIndexFromUTF16 } from "@/core/unicode";

	import TheTags from "@/components/Tags.vue";
	import ContentCopyIcon from "vue-material-design-icons/LinkVariant.vue";
	import TheForms from "./the-article/the-forms.vue";
	import TheImages from "./the-article/the-images.vue";
	import TheIndices from "./the-article/the-indices.vue";
	import TheMeanings from "./the-article/the-meanings.vue";
	import TheReading from "./the-article/the-reading.vue";
	import TheWords from "./the-article/the-words.vue";

	type Props = { article: EntryKanji };

	const props = defineProps<Props>();

	const url = import.meta.env.VITE_BASE_URL;
	const standalone = true;

	const { t } = useI18n();

	function confStyles() {
		if (props.article.isReviewed) return [];

		return ["border-l-2", "border-l-orange-500", "dark:border-l-orange-500"];
	}
</script>

<template>
	<article
		class="border border-gray-100 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800 md:rounded-md"
		:class="confStyles()"
	>
		<div class="grid select-text grid-cols-1 gap-8 md:grid-cols-[12rem_1fr]">
			<div class="flex flex-col gap-8">
				<div
					class="group relative flex min-h-[11rem] w-auto flex-col justify-center gap-2 p-2 text-center"
				>
					<div class="flex flex-col gap-2">
						<span class="text-9xl">{{ article.entry.general.literal }}</span>
						<span class="break-words">
							<input
								:value="article.entry.general.shortMeans" name="short-means-input"
							/>
						</span>
					</div>
				</div>

				<div
					class="flex flex-col gap-2 rounded-md bg-neutral-100 py-2 px-3 dark:bg-gray-700"
				>
					<p>
						<span class="text-sm text-gray-400">
							{{ t(MessagesNames.Frequency) }}
						</span>
						<input :value="article.entry.general.freq" name="freq-input" />
					</p>
					<p>
						<span class="text-sm text-gray-400">
							{{ t(MessagesNames.Radical) }}
						</span>
						<input :value="article.entry.general.literal" name="literal-input" />
					</p>
					<p>
						<span class="text-sm text-gray-400">
							{{ t(MessagesNames.StrokeCount) }}
						</span>
						<input :value="article.entry.general.strokeCount" name="strokecount-input" />
					</p>
					<p>
						<span class="text-sm text-gray-400">
							{{ t(MessagesNames.Ids) }}
						</span>
						<input :value="article.entry.general.ids" name="ids-input" />
					</p>
				</div>

				<div class="flex flex-col gap-2 rounded-md">
					<p v-show="article.entry.general.jis">
						<span class="text-sm text-gray-400 dark:text-gray-400">
							{{ t(MessagesNames.JIS) }}
						</span>
						<input :value="article.entry.general.jis" name="jis-input" />
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
					<input :value="article.entry.general.note" name="note-input" />
				</div>

				<div class="flex flex-col gap-8">
					<TheWords
						v-if="article.entry.standaloneMeanings.length > 0"
						:words="article.entry.standaloneMeanings"
						:title="t(MessagesNames.StandaloneMeanings)"
					/>

					<TheMeanings
						v-if="article.entry.composedMeanings.length > 0"
						:meanings="article.entry.composedMeanings"
						:title="t(MessagesNames.ComposedMeanings)"
					/>

					<TheMeanings
						v-if="article.entry.kanbunMeanings.length > 0"
						:meanings="article.entry.kanbunMeanings"
						:title="t(MessagesNames.KanbunMeanings)"
					/>
				</div>
			</div>
		</div>
	</article>
</template>
