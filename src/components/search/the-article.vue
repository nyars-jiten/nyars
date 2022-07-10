<template>
	<article
		class="select-text bg-white px-10 py-5 leading-relaxed rounded shadow-md border border-gray-100"
	>
		<div class="flex items-start border-b border-gray-100 pb-2 mb-2">
			<div
				v-for="(word, wordId) of article.entry.words"
				:key="wordId"
				class="flex-1 text-2xl font-header"
			>
				<span
					v-show="word.writings.length > 0"
					class="before:content-['【'] after:content-['】']"
				>
					<span
						v-for="(w, writingId) of word.writings"
						:key="writingId"
						class="after:content-['・'] last:after:content-none"
					>
						{{ w.value }}
					</span>
				</span>

				<span
					v-for="(r, readingId) of word.readings"
					:key="readingId"
					class="after:content-['・'] last:after:content-none"
				>
					{{ store.getByLiteral(r.value) }}
				</span>
			</div>

			<button
				v-show="!isShowFullInfo"
				type="button"
				class="flex items-center gap-2 hover:opacity-50 bg-gray-100 rounded select-none px-2"
				@click="toggleInfo"
			>
				Показать чуть больше
				<PlusIcon :size="18" />
			</button>

			<button
				v-show="isShowFullInfo"
				type="button"
				class="flex items-center gap-2 hover:opacity-50 bg-gray-100 rounded select-none px-2"
				@click="toggleInfo"
			>
				Показать чуть меньше
				<MinusIcon :size="18" />
			</button>
		</div>

		<!-- {{ mean.pos }} -->
		<div class="grid grid-cols-[auto_1fr] gap-4">
			<template v-for="(mean, meanId) of article.entry.meanings" :key="meanId">
				<template v-for="(lang, langId) of mean.langMeanings" :key="langId">
					<div class="italic text-gray-400">
						{{ locale.t(`${MessagesNames.SearchShortLangName}.${lang.lang}`) }}
					</div>

					<template v-if="lang.senses.length > 1">
						<div class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
							<template v-for="(sence, senseId) of lang.senses" :key="senseId">
								<div
									class="text-center border-r border-dotted border-gray-100 pr-2"
								>
									{{ 1 + senseId }}
								</div>
								<!-- eslint-disable vue/no-v-html -->
								<div v-html="bbCodesProcess(sence.value)" />
							</template>
						</div>
					</template>

					<div
						v-if="lang.senses.length == 1"
						v-html="bbCodesProcess(lang.senses[0].value)"
					/>
				</template>
			</template>
		</div>

		<p>{{ article.entry.externalEntry }}</p>

		<div class="border-t border-gray-100 pt-2 mt-2">
			<p
				class="hover:opacity-50 inline-flex px-2 items-center gap-2 cursor-copy bg-gray-100 rounded select-none"
				@click="copy"
			>
				{{ url }}{{ RoutesNames.DictArticle }}/{{ article.wid }}
				<ContentCopyIcon :size="18" class="opacity-50" />
			</p>
		</div>
	</article>
</template>

<script setup lang="ts">
	import { api } from "@/api";
	import { ref } from "vue";
	import { useI18n } from "vue-i18n";
	import { useRoute } from "vue-router";

	import { EntryJp } from "@/api/search-rest/types";
	import { bbCodesProcess } from "@/core/text/bb-code";
	import { MessagesNames } from "@/locale/messages-names";
	import { RoutesNames } from "@/router/routes-names";
	import { useReadingsStorage } from "@/stores/readings";

	import ContentCopyIcon from "vue-material-design-icons/ContentCopy.vue";
	import MinusIcon from "vue-material-design-icons/Minus.vue";
	import PlusIcon from "vue-material-design-icons/Plus.vue";

	type Props = { article?: EntryJp };

	const props = defineProps<Props>();

	const article = await getArticle();

	const url = import.meta.env.VITE_BASE_URL;

	const locale = useI18n();
	const store = useReadingsStorage();

	const isShowFullInfo = ref(false);

	async function getArticle(): Promise<EntryJp> {
		if (props.article) return props.article;

		const route = useRoute();

		const wid = route.params.wid;
		if (typeof wid !== "string") throw new Error("Bad component usage");

		return await api.dictionaryJapEntries({ wid });
	}

	async function toggleInfo() {
		isShowFullInfo.value = !isShowFullInfo.value;
	}

	async function copy(e: MouseEvent) {
		const { target } = e;
		if (target instanceof HTMLElement) {
			await navigator.clipboard.writeText(target.innerText);
		}
	}
</script>
