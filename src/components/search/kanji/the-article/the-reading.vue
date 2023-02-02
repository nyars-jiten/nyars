<template>
	<div v-if="readings.length > 0" class="grid grid-cols-[auto_1fr] gap-2">
		<span
			class="h-fit rounded-md border border-gray-500 px-1 text-gray-500 dark:border-gray-400 dark:text-gray-400"
		>
			{{ t(`${MessagesNames.KanjiReadingTypeName}.${type}.badge`) }}
		</span>

		<div class="flex flex-row flex-wrap gap-y-2 gap-x-1">
			<div
				v-for="(reading, ri) in readings"
				:class="[reading.tags.includes('gai') ? `text-gray-400` : '']"
				class="after:ml-2 after:text-gray-200 after:content-['・'] last:after:content-none dark:after:text-gray-500"
			>
				<span
					v-if="reading.tags.length > 0 && !reading.tags.includes('gai')"
					class="mx-1"
				>
					<template v-for="tag of reading.tags">
						<span
							v-if="tag != 'gai'"
							class="rounded-tl-md border-t border-l px-1 py-0.5 empty:hidden"
							:class="[`text-tag-${tag}-500`, `border-tag-${tag}-500`]"
						>
							{{ t(`${MessagesNames.KanjiReadingTagName}.${tag}.badge`) }}
						</span>
					</template>
				</span>
				<span v-if="!isEditor" class="ml-1">
					{{ convert_to_kana(reading.value) }}
				</span>
				<span v-else class="ml-1">
					<EditableSpan v-model="reading.value" block="span" />
					<Button
						@click="readings.splice(ri, 1)"
						class="font-medium text-red-700"
						>X</Button
					>
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

	import EditableSpan from "./editable-span.vue";

	type Props = { readings: Reading[]; type: string; isEditor: boolean };

	defineProps<Props>();

	const { t } = useI18n();
</script>
