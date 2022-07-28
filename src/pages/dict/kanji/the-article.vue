<template>
	<section class="flex flex-col gap-4">
		<article
			class="grid select-text grid-cols-1 gap-8 border border-gray-100 bg-white p-8 leading-relaxed shadow-md dark:border-gray-700 dark:bg-gray-800 md:grid-cols-[14rem_1fr] md:rounded-md"
		>
			<!-- 1 col-->
			<div class="flex flex-col gap-8">
				<!-- kanji pic-->
				<div
					class="group relative flex h-40 w-40 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<span class="text-9xl">{{ article.entry.general.literal }}</span>
					<ContentCopyIcon
						:size="16"
						class="invisible absolute right-2 bottom-2 opacity-50 group-hover:visible"
					/>
				</div>

				<!-- shortmeans -->
				<div
					class="border-l border-dotted border-gray-500 pl-2 dark:border-gray-500"
				>
					<span>{{ article.entry.general.shortMeans }}</span>
				</div>

				<!-- stats -->
				<div
					class="flex flex-col gap-2 rounded-md bg-neutral-100 py-2 px-3 dark:bg-gray-700"
				>
					<p v-show="article.entry.general.radical">
						<span class="select-none text-gray-400 dark:text-gray-400">
							{{ locale.t(MessagesNames.Radical) }}
						</span>
						<span class="ml-2">{{ article.entry.general.radical }}</span>
					</p>
					<p v-show="article.entry.general.ids">
						<span class="select-none text-gray-400 dark:text-gray-400">
							{{ locale.t(MessagesNames.Ids) }}
						</span>
						<span class="ml-2">{{ article.entry.general.ids }}</span>
					</p>
					<p v-show="article.entry.general.strokeCount">
						<span class="select-none text-gray-400 dark:text-gray-400">
							{{ locale.t(MessagesNames.StrokeCount) }}
						</span>
						<span class="ml-2">{{ article.entry.general.strokeCount }}</span>
					</p>
				</div>

				<!-- stats -->
				<div class="flex flex-col gap-2 rounded-md">
					<p>
						<span class="select-none text-gray-400 dark:text-gray-400">
							Unicode:
						</span>
						<span v-if="article.entry.general.literal.length == 1" class="ml-2">
							{{ getCharUnicode(article.entry.general.literal) }}
						</span>
						<span v-else class="ml-2"> отсутствует </span>
					</p>
					<p v-show="article.entry.general.jis">
						<span class="select-none text-gray-400 dark:text-gray-400">
							JIS:
						</span>
						<span class="ml-2">
							{{ article.entry.general.jis }}
						</span>
					</p>
				</div>
			</div>

			<!-- 2 col-->
			<div class="flex flex-col gap-8">
				<div
					v-show="article.entry.general.tags.length > 0"
					class="flex flex-wrap items-start gap-2"
				>
					<span
						v-for="(tag, tagId) of article.entry.general.tags"
						:key="tagId"
						type="button"
						class="select-none whitespace-nowrap rounded-md border border-tag-jlpt-n4 px-2 text-sm text-tag-jlpt-n4 hover:opacity-50"
					>
						{{ tag }}
					</span>
				</div>

				<div class="flex flex-col gap-4">
					<!-- reading group (ONYOMI) -->
					<div
						v-show="article.entry.onyomi.length > 0"
						class="grid grid-cols-[auto_1fr] gap-2"
					>
						<!-- icon -->
						<span
							class="h-fit select-none rounded-md border border-gray-500 px-1 text-gray-500 dark:border-gray-400 dark:text-gray-400"
							>音</span
						>

						<div class="flex flex-row flex-wrap gap-2">
							<div
								v-for="(onyomi, onyomiId) of article.entry.onyomi"
								:key="onyomiId"
								class="after:text-gray-200 after:content-['・'] last:after:content-none"
							>
								<span v-show="onyomi.tags.length > 0">
									<span
										v-for="(tag, tagId) of onyomi.tags"
										:key="tagId"
										class="select-none rounded-tl-md border-t border-l border-yellow-500 px-1 py-0.5 text-yellow-500"
										:class="[`text-tag-${tag}-500`, `border-tag-${tag}-500`]"
									>
										{{
											locale.t(
												`${MessagesNames.KanjiReadingTagName}.${tag}.badge`,
											)
										}}
									</span>
								</span>
								<span class="ml-1">{{ convert_to_kana(onyomi.value) }}</span>
							</div>
						</div>
					</div>

					<!-- reading group (KUNYOMI) -->
					<div
						v-show="article.entry.kunyomi.length > 0"
						class="grid grid-cols-[auto_1fr] gap-2"
					>
						<!-- icon -->
						<span
							class="h-fit select-none rounded-md border border-gray-500 px-1 text-gray-500 dark:border-gray-400 dark:text-gray-400"
							>訓</span
						>

						<div class="flex flex-row flex-wrap gap-2">
							<div
								v-for="(kunyomi, kunyomiId) of article.entry.kunyomi"
								:key="kunyomiId"
								class="after:text-gray-200 after:content-['・'] last:after:content-none"
							>
								<span v-show="kunyomi.tags.length > 0">
									<span
										v-for="(tag, tagId) of kunyomi.tags"
										:key="tagId"
										class="select-none rounded-tl-md border-t border-l px-1 py-0.5"
										:class="[`text-tag-${tag}-500`, `border-tag-${tag}-500`]"
									>
										{{
											locale.t(
												`${MessagesNames.KanjiReadingTagName}.${tag}.badge`,
											)
										}}
									</span>
								</span>
								<span class="ml-1">{{ convert_to_kana(kunyomi.value) }}</span>
							</div>
						</div>
					</div>

					<!-- reading group (NANORI) -->
					<div
						v-show="article.entry.nanori.length > 0"
						class="grid grid-cols-[auto_1fr] gap-2"
					>
						<!-- icon -->
						<span
							class="h-fit select-none rounded-md border border-gray-500 px-1 text-gray-500 dark:border-gray-400 dark:text-gray-400"
							>名</span
						>

						<div class="flex flex-row flex-wrap gap-2">
							<div
								v-for="(nanori, nanoriId) of article.entry.nanori"
								:key="nanoriId"
								class="after:text-gray-200 after:content-['・'] last:after:content-none"
							>
								<span v-show="nanori.tags.length > 0">
									<span
										v-for="(tag, tagId) of nanori.tags"
										:key="tagId"
										class="select-none rounded-tl-md border-t border-l px-1 py-0.5"
										:class="[`text-tag-${tag}-500`, `border-tag-${tag}-500`]"
									>
										{{
											locale.t(
												`${MessagesNames.KanjiReadingTagName}.${tag}.badge`,
											)
										}}
									</span>
								</span>
								<span class="ml-1">{{ convert_to_kana(nanori.value) }}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="flex flex-col gap-8">
					<!-- standaloneMeaning -->
					<div
						v-show="article.entry.standaloneMeaning"
						class="flex flex-col gap-2 leading-loose"
					>
						<div class="border-l-2 border-accent-500 px-3 text-accent-500">
							{{ locale.t(MessagesNames.StandaloneMeaning) }}
						</div>
						<div class="flex flex-col gap-y-1">
							<span
								v-for="word of article.entry.standaloneMeaning"
								:key="word.wid"
							>
								<RouterLink :to="location(word.wid)">
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
							</span>
						</div>
					</div>

					<!-- composedMeanings-->
					<div
						v-show="article.entry.composedMeanings.length > 0"
						class="flex flex-col gap-2 leading-loose"
					>
						<div class="border-l-2 border-accent-500 px-3 text-accent-500">
							{{ locale.t(MessagesNames.ComposedMeanings) }}
						</div>
						<template
							v-for="(meaning, meaningsId) of article.entry.composedMeanings"
							:key="meaningsId"
						>
							<div class="flex flex-col gap-y-2">
								<div>
									<!-- eslint-disable-next-line vue/no-v-html -->
									<span v-html="bbCodesProcess(meaning.title)" />

									<span
										v-show="meaning.readings.length > 0"
										class="before:text-gray-200 before:content-['【'] after:text-gray-200 after:content-['】'] dark:before:text-gray-500 dark:after:text-gray-500"
									>
										<span
											v-for="(reading, readingId) of meaning.readings"
											:key="readingId"
											class="before:text-gray-200 after:text-gray-200 after:content-['・'] last:after:content-none"
										>
											{{ convert_to_kana(reading) }}
										</span>
									</span>
								</div>
								<div
									class="flex flex-col border-l border-gray-200 pl-2 text-gray-600 dark:border-gray-600 dark:text-gray-400"
								>
									<div
										v-for="word of meaning.words"
										:key="word.wid"
										class="inline-flex flex-wrap gap-x-2"
									>
										<RouterLink :to="location(word.wid)">
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

					<!-- note -->
					<div
						v-show="article.entry.general.note"
						class="flex flex-col gap-2 rounded-md bg-neutral-100 p-2"
					>
						<p>
							<span class="select-none text-sm text-gray-400 dark:text-gray-400"
								>Заметка:</span
							>
						</p>
						<p v-show="article.entry.general.ids">
							{{ article.entry.general.note }}
						</p>
					</div>
				</div>
			</div>
		</article>
	</section>
</template>

<script setup lang="ts">
	import { api } from "@/api";
	import { bbCodesProcess } from "@/core/text/bb-code";
	import { convert_to_kana } from "@nyars-jiten/jp-transcript";
	import { useI18n } from "vue-i18n";

	import { MessagesNames } from "@/locale/messages-names";
	import { RoutesNames } from "@/router/routes-names";
	import { useRoute } from "vue-router";

	import type { RouteLocationRaw } from "vue-router";

	import ContentCopyIcon from "vue-material-design-icons/LinkVariant.vue";

	const route = useRoute();

	const locale = useI18n();

	const kid = route.params.kid;
	if (typeof kid !== "string") throw new Error("Bad component usage");

	const article = await api.dictionaryKanjiEntries({ kid });

	function location(wid: string): RouteLocationRaw {
		if (!wid || wid.length < 1) {
			return {
				name: RoutesNames.SearchResults,
				query: { request: wid },
			};
		}

		return {
			name: RoutesNames.DictJpArticle,
			params: { wid: wid },
		};
	}

	function getCharUnicode(char: string) {
		const codePoint = char.codePointAt(0);
		if (typeof codePoint === "number") {
			const hex = codePoint.toString(16);
			return "U+" + "0000".substring(0, 4 - hex.length) + hex;
		}
	}
</script>
