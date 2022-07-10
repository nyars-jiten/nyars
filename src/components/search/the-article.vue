<template>
	<article
		class="select-text bg-white px-10 py-5 leading-relaxed rounded shadow-md border border-gray-100"
	>
		<div class="flex gap-4 items-start border-b border-gray-100 pb-2 mb-2">
			<component
				:is="standalone ? 'div' : 'RouterLink'"
				:class="standalone ? '' : 'hover:opacity-50'"
				:to="{ name: RoutesNames.DictJpArticle, params: { wid: article.wid } }"
			>
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
			</component>

			<div v-if="!standalone" class="whitespace-nowrap">
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

		<div v-if="!standalone" class="border-t border-gray-100 pt-2 mt-2">
			<p
				class="hover:opacity-50 inline-flex px-2 items-center gap-2 cursor-copy bg-gray-100 rounded select-none"
				@click="copy"
			>
				{{ url }}jp/{{ article.wid }}
				<ContentCopyIcon :size="18" class="opacity-50" />
			</p>
		</div>
	</article>
</template>

<script setup lang="ts">
	import { RoutesNames } from "@/router/routes-names";
	import { computed, ref } from "vue";
	import { useI18n } from "vue-i18n";

	import { EntryJp } from "@/api/search-rest/types";
	import { bbCodesProcess } from "@/core/text/bb-code";
	import { MessagesNames } from "@/locale/messages-names";
	import { useReadingsStorage } from "@/stores/readings";

	import ContentCopyIcon from "vue-material-design-icons/ContentCopy.vue";
	import MinusIcon from "vue-material-design-icons/Minus.vue";
	import PlusIcon from "vue-material-design-icons/Plus.vue";

	type Props = { article: EntryJp; standalone: boolean };

	const props = defineProps<Props>();

	const url = import.meta.env.VITE_BASE_URL;

	const locale = useI18n();
	const store = useReadingsStorage();

	const infoState = ref(false);

	const isShowFullInfo = computed(() => infoState.value || props.standalone);

	async function toggleInfo() {
		infoState.value = !infoState.value;
	}

	async function copy(e: MouseEvent) {
		const { target } = e;
		if (target instanceof HTMLElement) {
			await navigator.clipboard.writeText(target.innerText);
		}
	}
</script>
