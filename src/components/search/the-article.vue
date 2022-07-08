<template>
	<article
		class="select-text bg-white px-10 py-5 leading-relaxed rounded-md shadow-md border border-gray-100"
	>
		<div class="border-b border-b-gray-100 pb-2 mb-2 text-xl">
			<div v-for="word of article.entry.words">
				<span class="before:content-['【'] after:content-['】']">
					<span
						v-for="w of word.writings"
						class="after:content-['・'] last:after:content-none"
					>
						{{ w.value }}
					</span>
				</span>
				<span
					v-for="r of word.readings"
					class="after:content-['・'] last:after:content-none"
				>
					{{ rStore.getByLiteral(r.value) }}
				</span>
			</div>
		</div>

		<!-- {{ mean.pos }} -->
		<div class="grid grid-cols-[auto_1fr] gap-4">
			<template v-for="mean of article.entry.meanings">
				<template v-for="lang of mean.langMeanings">
					<div class="italic text-gray-400">
						{{ locale.t(`${MessagesNames.SearchShortLangName}.${lang.lang}`) }}
					</div>

					<template v-if="lang.senses.length > 1">
						<div class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
							<template v-for="(sence, i) of lang.senses">
								<div
									class="text-center border-r border-dotted border-gray-100 pr-2"
								>
									{{ 1 + i }}
								</div>
								<div>
									{{ sence.value }}
								</div>
							</template>
						</div>
					</template>

					<div v-if="lang.senses.length == 1">{{ lang.senses[0].value }}</div>
				</template>
			</template>
		</div>

		<p>{{ article.entry.externalEntry }}</p>
	</article>
</template>

<script setup lang="ts">
	import type { EntryJp } from "@/api/types/dictionary/jp/entry-jp";
	import { MessagesNames } from "@/locale/messages-names";
	import { useReadingsStorage } from "@/stores/readings";
	import { useI18n } from "vue-i18n";

	type Props = { article: EntryJp };

	defineProps<Props>();

	const locale = useI18n();
	const rStore = useReadingsStorage();
</script>
