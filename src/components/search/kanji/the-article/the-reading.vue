<template>
	<div v-if="readings.length > 0" class="grid grid-cols-[auto_1fr] gap-2">
		<span
			class="h-fit rounded-md border border-gray-500 px-1 text-gray-500 dark:border-gray-400 dark:text-gray-400"
			>{{ t(`${MessagesNames.KanjiReadingTypeName}.${type}.badge`) }}</span
		>

		<div class="flex flex-row flex-wrap gap-y-2 gap-x-1">
			<div
				v-for="(reading, readingId) of readings"
				:class="[reading.tags.includes('gai') ? `text-gray-400` : '']"
				class="after:ml-2 after:text-gray-200 after:content-['・'] last:after:content-none dark:after:text-gray-500"
			>
				<span
					v-if="reading.tags.length > 0 && !reading.tags.includes('gai')"
					class="mx-1"
				>
					<template v-for="(tag, tagId) of reading.tags">
						<span
							v-if="tag != 'gai'"
							class="rounded-tl-md border-t border-l px-1 py-0.5 empty:hidden"
							:class="[`text-tag-${tag}-500`, `border-tag-${tag}-500`]"
						>
							{{ t(`${MessagesNames.KanjiReadingTagName}.${tag}.badge`) }}
						</span>
					</template>
				</span>
				<span class="ml-1">
					{{ convert_to_kana(reading.value) }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Reading } from "@/api/dictionary/kanji/types";
	import { convert_to_kana } from "@nyars-jiten/jp-transcript";
	import { useI18n } from "vue-i18n";

	import { MessagesNames } from "@/locale/messages-names";

	type Props = { readings: Reading[]; type: string };

	defineProps<Props>();

	const { t } = useI18n();
</script>
