<template>
	<article
		class="select-text bg-white px-10 py-5 leading-relaxed rounded-md shadow-md border border-gray-100"
	>
		<div
			class="border-b border-b-gray-100 pb-2 mb-2 text-2xl font-header"
			@copy="copy"
		>
			<div v-for="(word, wordId) of article.entry.words" :key="wordId">
				<span class="before:content-['【'] after:content-['】']">
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
								<div v-html="bbCodesProcess(sence.value)" />
							</template>
						</div>
					</template>

					<div v-if="lang.senses.length == 1">
						{{ lang.senses[0].value }}
					</div>
				</template>
			</template>
		</div>

		<p>{{ article.entry.externalEntry }}</p>
	</article>
</template>

<script setup lang="ts">
	import { EntryJp } from "@/api/search-rest/types";
	import { bbCodesProcess } from "@/core/text/bb-code";
	import { MessagesNames } from "@/locale/messages-names";
	import { useReadingsStorage } from "@/stores/readings";
	import { useI18n } from "vue-i18n";

	type Props = { article: EntryJp };

	defineProps<Props>();

	const locale = useI18n();
	const store = useReadingsStorage();

	function copy(e: any) {
		console.log(e);
	}
</script>
