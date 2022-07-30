<template>
	<article
		class="grid select-text grid-cols-1 gap-8 border border-gray-100 bg-white p-8 leading-relaxed shadow-md dark:border-gray-700 dark:bg-gray-800 md:grid-cols-[12rem_1fr] md:rounded-md"
	>
		<div class="flex flex-col gap-8">
			<div
				class="group min-h-44 relative flex w-auto cursor-copy flex-col justify-center gap-2 rounded-md p-2 text-center hover:bg-gray-100 dark:hover:bg-gray-700"
				@click="copy"
			>
				<span class="text-9xl">{{ article.entry.general.literal }}</span>
				<div class="break-words">{{ article.entry.general.shortMeans }}</div>
				<ContentCopyIcon
					:size="16"
					class="invisible absolute right-2 bottom-2 opacity-50 group-hover:visible"
				/>
			</div>

			<div
				class="flex flex-col gap-2 rounded-md bg-neutral-100 py-2 px-3 dark:bg-gray-700"
			>
				<p v-show="article.entry.general.radical">
					<span class="select-none text-gray-400">
						{{ locale.t(MessagesNames.Radical) }}
					</span>
					<span class="ml-2">{{ article.entry.general.radical }}</span>
				</p>
				<p v-show="article.entry.general.ids">
					<span class="select-none text-gray-400">
						{{ locale.t(MessagesNames.Ids) }}
					</span>
					<span class="ml-2">{{ article.entry.general.ids }}</span>
				</p>
				<p v-show="article.entry.general.strokeCount">
					<span class="select-none text-gray-400">
						{{ locale.t(MessagesNames.StrokeCount) }}
					</span>
					<span class="ml-2">{{ article.entry.general.strokeCount }}</span>
				</p>
				<p v-show="article.entry.general.freq">
					<span class="select-none text-gray-400">
						{{ locale.t(MessagesNames.Frequency) }}
					</span>
					<span class="ml-2">{{ article.entry.general.freq }}</span>
				</p>
			</div>

			<div class="flex flex-col gap-2 rounded-md">
				<p>
					<span class="select-none text-gray-400 dark:text-gray-400">
						Unicode:
					</span>
					<span v-if="article.entry.general.literal.length == 1" class="ml-2">
						{{ getCharUnicode(article.entry.general.literal) }}
					</span>
					<span v-else class="ml-2">-</span>
				</p>
				<p v-show="article.entry.general.jis">
					<span class="select-none text-gray-400 dark:text-gray-400">
						JIS:
					</span>
					<span class="ml-2"> JIS第{{ article.entry.general.jis }}水準 </span>
				</p>
			</div>
		</div>

		<div class="flex flex-col gap-8">
			<TheTags
				v-show="article.entry.general.tags.length > 0"
				:tags="article.entry.general.tags"
			/>

			<div
				v-show="article.entry.general.tags.length > 0"
				class="flex flex-col gap-4"
			>
				<template
					v-for="(reading, readingType) of article.entry.readings"
					:key="readingType"
				>
					<TheReading
						v-show="standalone || readingType != 'other'"
						:readings="reading"
						:type="readingType"
					/>
				</template>
			</div>

			<div
				v-show="article.entry.general.note"
				class="flex flex-col gap-2 rounded-md bg-neutral-100 py-2 px-3 dark:bg-gray-700"
			>
				<span class="select-none text-xs text-gray-400">{{
					locale.t(MessagesNames.Note)
				}}</span>
				<p v-show="article.entry.general.ids">
					{{ article.entry.general.note }}
				</p>
			</div>

			<div class="flex flex-col gap-8">
				<TheWords
					v-show="article.entry.standaloneMeanings.length > 0"
					:words="article.entry.standaloneMeanings"
					:title="locale.t(MessagesNames.StandaloneMeanings)"
				/>

				<TheMeanings
					v-show="article.entry.composedMeanings.length > 0"
					:meanings="article.entry.composedMeanings"
					:title="locale.t(MessagesNames.ComposedMeanings)"
				/>

				<TheMeanings
					v-show="article.entry.kanbunMeanings.length > 0"
					:meanings="article.entry.kanbunMeanings"
					:title="locale.t(MessagesNames.KanbunMeanings)"
				/>

				<TheIndices
					v-show="article.entry.indices.length > 0"
					:indices="article.entry.indices"
				/>
			</div>
		</div>
	</article>
</template>

<script setup lang="ts">
	import { useRoute } from "vue-router";

	import { MessagesNames } from "@/locale/messages-names";
	import { useI18n } from "vue-i18n";

	import { EntryKanji } from "@/api/kanji-rest/types";

	import ContentCopyIcon from "vue-material-design-icons/LinkVariant.vue";
	import TheIndices from "./the-article/the-indices.vue";
	import TheMeanings from "./the-article/the-meanings.vue";
	import TheReading from "./the-article/the-reading.vue";
	import TheTags from "./the-article/the-tags.vue";
	import TheWords from "./the-article/the-words.vue";

	type Props = { article: EntryKanji; standalone: boolean };

	const props = defineProps<Props>();

	const route = useRoute();

	const locale = useI18n();

	const kid = route.params.kid;
	if (typeof kid !== "string") throw new Error("Bad component usage");

	function getCharUnicode(char: string) {
		const codePoint = char.codePointAt(0);
		if (typeof codePoint === "number") {
			const hex = codePoint.toString(16);
			return "U+" + "0000".substring(0, 4 - hex.length) + hex;
		}
	}

	async function copy(e: MouseEvent) {
		const { target } = e;
		if (target instanceof HTMLElement) {
			await navigator.clipboard.writeText(target.innerText);
		}
	}
</script>
