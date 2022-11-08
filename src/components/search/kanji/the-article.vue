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

	type Props = { article: EntryKanji; standalone: boolean };

	const props = defineProps<Props>();

	const url = import.meta.env.VITE_BASE_URL;

	const { t } = useI18n();

	function confStyles() {
		if (props.article.isReviewed) return [];

		return ["border-l-2", "border-l-orange-500", "dark:border-l-orange-500"];
	}

	async function copy(e: MouseEvent) {
		const { target } = e;
		if (target instanceof HTMLElement) {
			await navigator.clipboard.writeText(`${url}/kanji/${props.article.kid}`);
		}
	}

	async function copyContent(e: MouseEvent) {
		const { target } = e;
		if (target instanceof HTMLElement) {
			await navigator.clipboard.writeText(target.innerText);
		}
	}
</script>

<template>
	<article
		class="border border-gray-100 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800 md:rounded-md"
		:class="confStyles()"
	>
		<div class="grid select-text grid-cols-1 gap-8 md:grid-cols-[12rem_1fr]">
			<div class="flex flex-col gap-8">
				<Component
					:is="standalone ? 'div' : 'RouterLink'"
					:class="[
						standalone
							? 'cursor-copy rounded-md hover:bg-gray-100 dark:hover:bg-gray-700'
							: 'hover:opacity-75',
					]"
					:to="{
						name: RoutesNames.DictKanjiArticle,
						params: { articleId: article.kid },
					}"
					class="group relative flex min-h-[11rem] w-auto flex-col justify-center gap-2 p-2 text-center"
					v-on="standalone ? { click: copyContent } : {}"
				>
					<div class="flex flex-col gap-2">
						<span class="text-9xl">{{ article.entry.general.literal }}</span>
						<span class="break-words">
							{{ article.entry.general.shortMeans }}
						</span>
						<ContentCopyIcon
							v-if="standalone"
							:size="16"
							class="invisible absolute right-2 bottom-2 opacity-50 group-hover:visible"
						/>
					</div>
				</Component>

				<div
					v-if="standalone"
					class="flex flex-col gap-2 rounded-md bg-neutral-100 py-2 px-3 dark:bg-gray-700"
				>
					<p v-if="article.entry.general.freq">
						<span class="text-sm text-gray-400">
							{{ t(MessagesNames.Frequency) }}
						</span>
						<span class="ml-2">{{ article.entry.general.freq }}</span>
					</p>
					<p v-if="article.radical && article.radical.literal">
						<span class="text-sm text-gray-400">
							{{ t(MessagesNames.Radical) }}
						</span>
						<span class="ml-2 font-medium">{{ article.radical.literal }}</span>
					</p>
					<p v-if="article.entry.general.strokeCount">
						<span class="text-sm text-gray-400">
							{{ t(MessagesNames.StrokeCount) }}
						</span>
						<span class="ml-2">{{ article.entry.general.strokeCount }}</span>
					</p>
					<p v-if="article.entry.general.ids">
						<span class="text-sm text-gray-400">
							{{ t(MessagesNames.Ids) }}
						</span>
						<span class="ml-2">{{ article.entry.general.ids }}</span>
					</p>
				</div>

				<div v-if="standalone" class="flex flex-col gap-2 rounded-md">
					<p>
						<span class="text-sm text-gray-400 dark:text-gray-400">
							{{ t(MessagesNames.Unicode) }}
						</span>
						<span class="ml-2">
							<template v-if="article.entry.general.literal.length == 1">
								{{ unicodeIndexFromUTF8(article.entry.general.literal) }}
							</template>

							<template v-else-if="article.entry.general.literal.length == 2">
								{{ unicodeIndexFromUTF16(article.entry.general.literal) }}
							</template>

							<template v-else>{{ "-" }}</template>
						</span>
					</p>
					<p v-show="article.entry.general.jis">
						<span class="text-sm text-gray-400 dark:text-gray-400">
							{{ t(MessagesNames.JIS) }}
						</span>
						<span class="ml-2">第{{ article.entry.general.jis }}水準</span>
					</p>
				</div>

				<TheForms v-if="standalone" :forms="article.entry.forms" />

				<TheImages v-if="standalone" :images="article.images" />
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
					v-if="standalone && article.entry.general.note"
					class="flex flex-col gap-2 rounded-md bg-neutral-100 py-2 px-3 dark:bg-gray-700"
				>
					<span class="text-sm text-gray-400">{{ t(MessagesNames.Note) }}</span>
					<p v-show="article.entry.general.ids">
						{{ article.entry.general.note }}
					</p>
				</div>

				<div v-if="standalone" class="flex flex-col gap-8">
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

					<div
						v-if="
							article.entry.composedMeanings.length == 0 &&
							article.entry.standaloneMeanings.length == 0 &&
							article.entry.kanbunMeanings.length == 0
						"
						class="rounded-md bg-gray-100 p-4 text-gray-400 dark:bg-gray-700"
					>
						{{ t(MessagesNames.MeaningsEmpty) }}
					</div>

					<TheIndices
						v-if="article.entry.indices.length > 0"
						:indices="article.entry.indices"
					/>
				</div>
			</div>
		</div>
		<div v-if="!standalone" class="mt-4 flex gap-2">
			<p
				class="inline-flex cursor-copy items-center gap-2 rounded bg-gray-100 px-2 capitalize hover:opacity-75 dark:bg-gray-700"
				@click="copy"
			>
				{{ t(MessagesNames.CopyLink) }}
				<ContentCopyIcon :size="16" class="opacity-50" />
			</p>
		</div>
	</article>
</template>
