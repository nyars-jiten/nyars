<template>
	<article
		class="select-text bg-white px-10 py-5 leading-relaxed rounded shadow-md border border-gray-100"
	>
		<TheHeader :article="article" :standalone="standalone" />

		<div class="grid grid-cols-[auto_1fr] gap-4">
			<template v-for="(mean, meanId) of article.entry.meanings" :key="meanId">
				<template v-for="(lang, langId) of mean.langMeanings" :key="langId">
					<div
						v-show="infoState && mean.pos.length > 0"
						class="px-5 col-span-full flex gap-2 items-start border-b border-gray-100 pb-2"
					>
						<span
							v-for="pos of mean.pos"
							:key="pos"
							class="uppercase italic underline underline-offset-2"
						>
							{{ pos }}
						</span>
					</div>

					<div class="italic text-gray-400">
						{{ locale.t(`${MessagesNames.SearchShortLangName}.${lang.lang}`) }}
					</div>

					<div class="grid grid-cols-[auto_1fr] gap-x-2">
						<template v-for="(sence, senseId) of lang.senses" :key="senseId">
							<div
								class="text-center border-r border-dotted border-gray-100 pr-2"
							>
								<template v-if="lang.senses.length > 1">
									{{ 1 + senseId }}
								</template>
							</div>

							<div>
								<span
									v-show="sence.tags.some(e => e.type == 'Fld')"
									class="italic text-green-600"
								>
									{{
										sence.tags
											.filter(e => e.type == "Fld")
											.map(e =>
												e.values.map(v =>
													locale.t(
														`${MessagesNames.ArticleTagName}.fld.${v}.short`,
													),
												),
											)
											.join(", ")
									}}&#8203;
								</span>

								<!-- eslint-disable-next-line vue/no-v-html -->
								<span v-html="bbCodesProcess(sence.value)" />

								<span
									v-show="sence.tags.some(e => e.type != 'Fld')"
									class="italic text-gray-400"
								>
									&#8203;({{
										sence.tags
											.filter(e => e.type != "Fld")
											.map(e =>
												e.values.map(v =>
													locale.t(
														`${MessagesNames.ArticleTagName}.misc.${v}.full`,
													),
												),
											)
											.join(", ")
									}})
								</span>

								<div class="border-l border-gray-200 text-gray-600 pl-2 ml-5">
									<p
										v-for="{ value, translation } of sence.examples"
										:key="`${value}${translation}`"
									>
										{{ value }}
										{{ translation }}
									</p>
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
			class="flex gap-2 border-t border-gray-100 pt-2 mt-2"
		>
			<p
				class="hover:opacity-50 inline-flex px-2 items-center gap-2 cursor-copy bg-gray-100 rounded select-none"
				@click="copy"
			>
				{{ article.wid }}
				<ContentCopyIcon :size="18" class="opacity-50" />
			</p>

			<div class="whitespace-nowrap">
				<button
					v-show="!infoState"
					type="button"
					class="flex items-center gap-2 hover:opacity-50 bg-gray-100 rounded select-none px-2"
					@click="toggleInfo"
				>
					Показать чуть больше
					<PlusIcon :size="18" />
				</button>

				<button
					v-show="infoState"
					type="button"
					class="flex items-center gap-2 hover:opacity-50 bg-gray-100 rounded select-none px-2"
					@click="toggleInfo"
				>
					Показать чуть меньше
					<MinusIcon :size="18" />
				</button>
			</div>
		</div>
	</article>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { useI18n } from "vue-i18n";

	import { EntryJp } from "@/api/search-rest/types";
	import { bbCodesProcess } from "@/core/text/bb-code";
	import { MessagesNames } from "@/locale/messages-names";

	import ContentCopyIcon from "vue-material-design-icons/LinkVariant.vue";
	import MinusIcon from "vue-material-design-icons/Minus.vue";
	import PlusIcon from "vue-material-design-icons/Plus.vue";
	import TheHeader from "./the-article/the-header.vue";

	type Props = { article: EntryJp; standalone: boolean };

	const props = defineProps<Props>();

	const url = import.meta.env.VITE_BASE_URL;

	const locale = useI18n();

	const infoState = ref(props.standalone);

	async function toggleInfo() {
		infoState.value = !infoState.value;
	}

	async function copy(e: MouseEvent) {
		const { target } = e;
		if (target instanceof HTMLElement) {
			await navigator.clipboard.writeText(`${url}jp/${target.innerText}`);
		}
	}
</script>
