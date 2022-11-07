<script setup lang="ts">
	import { useI18n } from "vue-i18n";

	import { Reference } from "@/api/dictionary/jp/types/reference";
	import { bbCodesProcess } from "@/core/text/bb-code";
	import { RoutesNames } from "@/router/routes-names";

	import { type RouteLocationRaw } from "vue-router";
	import { type EntryJp } from "@/api/dictionary/jp/types";

	import Panel from "../../Panel.vue";
	import PanelBody from "../../PanelBody.vue";
	import { MessagesNames } from "@/locale/messages-names";

	type Variants = "short" | "full";
	type Props = {
		meanings: EntryJp["entry"]["meanings"];
		details: boolean;
	};

	defineProps<Props>();

	const { t } = useI18n();

	function path({ type, tag, v }: { type: string; tag: string; v: Variants }) {
		const p = MessagesNames.ArticleTagName;
		return `${p}.${type.toLocaleLowerCase()}.${tag.toLocaleLowerCase()}.${v}`;
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
			params: { articleId: ref.target },
		};
	}
</script>

<template>
	<div>
		<template v-for="(mean, meanId) of meanings">
			<Transition
				enter-active-class="duration-150 ease-out"
				enter-from-class="transform opacity-0 -translate-y-4"
				enter-to-class="opacity-100"
				leave-active-class="duration-150 ease-in"
				leave-from-class="opacity-100"
				leave-to-class="transform opacity-0 -translate-y-4"
				mode="out-in"
			>
				<div
					v-show="details && mean.pos.length > 0"
					class="pl-4 mb-2 border-b border-gray-200 dark:border-gray-700 pb-2"
				>
					<span v-for="tag of mean.pos" class="uppercase font-bold">
						{{ t(path({ type: "pos", tag, v: "full" })) }}
						&#8203;
					</span>
				</div>
			</Transition>

			<div class="grid grid-cols-[auto_min-content_1fr] items-start">
				<template v-for="(lang, langId) of mean.langMeanings">
					<span
						class="px-2 border-r border-gray-200 dark:border-gray-700 border-dotted text-gray-400 dark:text-gray-400 pr-2 mr-2 h-full"
						:style="{ 'grid-row': `span ${lang.senses.length}` }"
					>
						<div class="text-xs leading-6 uppercase font-medium">
							{{ t(`${MessagesNames.SearchShortLangName}.${lang.lang}`) }}
						</div>
					</span>

					<template v-for="(sense, senseId) of lang.senses">
						<span
							class="rounded-md text-center col-start-2 text-gray-400 dark:text-gray-400 mr-2 whitespace-nowrap"
						>
							<template v-if="lang.senses.length > 1">
								{{ 1 + senseId }}
							</template>
							<template v-else>-</template>
						</span>

						<div class="col-start-3 pr-2">
							<span
								v-show="
									sense.tags.some(e => e.type == 'Fld' && e.values.length)
								"
								class="italic text-green-600"
							>
								<template
									v-for="{ type, values } of sense.tags.filter(
										e => e.type == 'Fld',
									)"
								>
									<template v-for="tag of values">
										{{ t(path({ tag, type, v: "short" })) }}
									</template>
								</template>
								&#8203;
							</span>

							<span
								class="whitespace-pre-wrap"
								v-html="bbCodesProcess(sense.value)"
							/>

							<span
								v-show="
									sense.tags.some(e => e.type != 'Fld' && e.values.length)
								"
								class="italic text-gray-400 dark:text-gray-400"
							>
								&#8203;

								<template
									v-for="{ type, values } of sense.tags.filter(
										e => e.type != 'Fld',
									)"
								>
									<template v-for="tag of values">
										{{ t(path({ tag, type, v: "short" })) }}
									</template>
								</template>
								&#8203;
							</span>

							<Transition
								enter-active-class="duration-150 ease-out"
								enter-from-class="transform opacity-0 translate-x-4"
								enter-to-class="opacity-100"
								leave-active-class="duration-150 ease-in"
								leave-from-class="opacity-100"
								leave-to-class="transform opacity-0 translate-x-4"
								mode="out-in"
							>
								<Panel
									:disabled="!details || sense.examples.length <= 0"
									class="mx-6 my-2"
								>
									<PanelBody>
										<p v-for="{ value, translation } of sense.examples">
											{{ value }}
											<span v-html="bbCodesProcess(translation)" />
										</p>
									</PanelBody>
								</Panel>
							</Transition>

							<div v-show="details" class="pl-5">
								<ul v-for="ref of sense.references">
									<li class="italic">
										<span class="text-xs">⇒</span>
										{{ t(`${MessagesNames.ArticleAbbr}.${ref.referenceType}`) }}

										<RouterLink
											:to="location(ref)"
											class="text-indigo-500 underline underline-offset-4 decoration-dotted hover:text-accent-500"
										>
											{{ ref.value }}
										</RouterLink>
									</li>
								</ul>
							</div>
						</div>
					</template>

					<div
						class="col-span-full h-4"
						v-show="mean.langMeanings.length != langId + 1"
					/>
				</template>
			</div>

			<div
				class="h-px bg-gray-200 dark:bg-gray-700 col-span-full my-2"
				v-show="meanings.length != meanId + 1"
			/>
		</template>
	</div>
</template>
