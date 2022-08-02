<template>
	<article
		class="select-text border border-gray-100 bg-white p-8 leading-loose shadow-md dark:border-gray-700 dark:bg-gray-800 md:rounded-md"
		:class="confStyles()"
	>
		<TheHeader :article="article" :standalone="standalone" />

		<div class="grid grid-cols-[auto_1fr] gap-4">
			<template v-for="(mean, meanId) of article.entry.meanings" :key="meanId">
				<template v-for="(lang, langId) of mean.langMeanings" :key="langId">
					<div
						v-show="infoState && mean.pos.length > 0"
						class="col-span-full flex items-start gap-2 border-b border-gray-100 px-2 pb-2 dark:border-gray-700"
					>
						<span
							v-for="pos of mean.pos"
							:key="pos"
							class="uppercase italic underline underline-offset-2"
						>
							{{ pos }}
						</span>
					</div>

					<div class="italic text-gray-400 dark:text-gray-400">
						{{ locale.t(`${MessagesNames.SearchShortLangName}.${lang.lang}`) }}
					</div>

					<div class="grid grid-cols-[auto_1fr] gap-x-2">
						<template v-for="(sense, senseId) of lang.senses" :key="senseId">
							<div
								class="border-r border-dotted border-gray-100 pr-2 text-center dark:border-gray-500"
							>
								<template v-if="lang.senses.length > 1">
									{{ 1 + senseId }}
								</template>
							</div>

							<div>
								<span
									v-show="
										sense.tags.some(e => e.type == 'Fld' && e.values.length)
									"
									class="italic text-green-600"
								>
									{{ senseBeforeTags(sense).join(", ") }}&#8203;
								</span>

								<!-- eslint-disable vue/no-v-html -->
								<span
									class="whitespace-pre-wrap"
									v-html="bbCodesProcess(sense.value)"
								/>
								<!-- eslint-enable vue/no-v-html -->

								<span
									v-show="
										sense.tags.some(e => e.type != 'Fld' && e.values.length)
									"
									class="italic text-gray-400 dark:text-gray-400"
								>
									&#8203;({{ senseAfterTags(sense).join(", ") }})
								</span>

								<div
									v-show="infoState"
									class="ml-5 border-l border-gray-200 pl-2 text-gray-600 dark:border-gray-500 dark:text-gray-400"
								>
									<p
										v-for="{ value, translation } of sense.examples"
										:key="`${value}${translation}`"
									>
										{{ value }}
										<!-- eslint-disable-next-line vue/no-v-html -->
										<span v-html="bbCodesProcess(translation)" />
									</p>
								</div>

								<div v-show="infoState" class="pl-5">
									<ul
										v-for="reference of sense.references"
										:key="`${reference.value}`"
									>
										<li class="italic">
											<span class="text-xs">⇒</span>
											{{
												locale.t(
													`${MessagesNames.ArticleAbbr}.${reference.referenceType}`,
												)
											}}
											<RouterLink
												:to="location(reference)"
												class="text-indigo-500"
											>
												{{ reference.value }}
											</RouterLink>
										</li>
									</ul>
								</div>
							</div>
						</template>
					</div>
				</template>
			</template>
		</div>

		<p>{{ article.entry.externalEntry }}</p>

		<div
			v-if="!standalone"
			class="mt-2 flex gap-2 border-t border-gray-100 pt-2 dark:border-gray-700"
		>
			<p
				class="inline-flex cursor-copy select-none items-center gap-2 rounded bg-gray-100 px-2 hover:opacity-75 dark:bg-gray-700"
				@click="copy"
			>
				{{ article.wid }}
				<ContentCopyIcon :size="16" class="opacity-50" />
			</p>

			<div class="whitespace-nowrap">
				<button
					v-show="!infoState"
					type="button"
					class="flex select-none items-center gap-2 rounded bg-gray-100 px-2 capitalize hover:opacity-75 dark:bg-gray-700"
					@click="toggleInfo"
				>
					{{ locale.t(MessagesNames.ShowMore) }}
					<PlusIcon :size="16" />
				</button>

				<button
					v-show="infoState"
					type="button"
					class="flex select-none items-center gap-2 rounded bg-gray-100 px-2 capitalize hover:opacity-75 dark:bg-gray-700"
					@click="toggleInfo"
				>
					{{ locale.t(MessagesNames.ShowLess) }}
					<MinusIcon :size="16" />
				</button>
			</div>
		</div>
	</article>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { useI18n } from "vue-i18n";

	import { EntryJp } from "@/api/dictionary/jp/types";
	import { Reference } from "@/api/dictionary/jp/types/reference";
	import { bbCodesProcess } from "@/core/text/bb-code";
	import { MessagesNames } from "@/locale/messages-names";
	import { RoutesNames } from "@/router/routes-names";

	import ContentCopyIcon from "vue-material-design-icons/LinkVariant.vue";
	import MinusIcon from "vue-material-design-icons/Minus.vue";
	import PlusIcon from "vue-material-design-icons/Plus.vue";
	import TheHeader from "./the-article/the-header.vue";

	import type { Sense } from "@/api/dictionary/jp/types/sense";
	import type { RouteLocationRaw } from "vue-router";

	type Props = { article: EntryJp; standalone: boolean };

	const props = defineProps<Props>();

	const url = import.meta.env.VITE_BASE_URL;

	const locale = useI18n();

	const infoState = ref(props.standalone);

	function confStyles() {
		if (props.article.isReviewed) return [];

		return ["border-l-2", "border-l-orange-500", "dark:border-l-orange-500"];
	}

	function senseBeforeTags(sense: Sense) {
		return [
			sense.tags
				.filter(e => e.type == "Fld")
				.map(e =>
					e.values.map(v =>
						locale.t(
							`${
								MessagesNames.ArticleTagName
							}.${e.type.toLocaleLowerCase()}.${v}.short`,
						),
					),
				)
				.filter(e => e.length > 0),
		];
	}

	function senseAfterTags(sense: Sense) {
		return sense.tags
			.filter(e => e.type != "Fld")
			.map(e =>
				e.values.map(v =>
					locale.t(
						`${
							MessagesNames.ArticleTagName
						}.${e.type.toLocaleLowerCase()}.${v}.full`,
					),
				),
			)
			.filter(e => e.length > 0);
	}

	function location(ref: Reference): RouteLocationRaw {
		if (!ref.target || ref.target.length < 1) {
			return {
				name: RoutesNames.SearchResults,
				query: { request: ref.value },
			};
		}

		return {
			name: RoutesNames.DictJpArticle,
			params: { wid: ref.target },
		};
	}

	async function toggleInfo() {
		infoState.value = !infoState.value;
	}

	async function copy(e: MouseEvent) {
		const { target } = e;
		if (target instanceof HTMLElement) {
			await navigator.clipboard.writeText(`${url}/jp/${target.innerText}`);
		}
	}
</script>
