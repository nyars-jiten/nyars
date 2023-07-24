<script setup lang="ts">
	import { Reading } from "@/api/dictionary/kanji/types";
	import { convert_to_kana } from "@nyars-jiten/jp-transcript";
	import { useI18n } from "vue-i18n";

	import { MessagesNames } from "@/locale/messages-names";

	// import EditableSpan from "./editable-span.vue";
	import EditInput from "../editor/EditInput.vue";
	import Button from "@/components/generic-button.vue";
	import Multiselect from "vue-multiselect";

	type Props = { readings: Reading[]; type: string; isEditor: boolean };
	const props = defineProps<Props>();

	const { t } = useI18n();

	const optionsList = [
		"shou",
		"chuu",
		"kou",
		"kanon",
		"touon",
		"goon",
		"kanyoon",
		"souon",
		"gai",
	];

	function customLabel(option: string) {
		return t(`${MessagesNames.KanjiReadingTagName}.${option}.full`);
	}

	function addReading() {
		props.readings.push({
			value: "",
			tags: [],
			source: "",
		});
	}
</script>

<template>
	<div
		v-if="readings.length > 0 || isEditor"
		class="grid grid-cols-[auto_1fr] gap-2"
	>
		<span
			class="h-fit rounded-md border border-gray-500 px-1 text-gray-500 dark:border-gray-400 dark:text-gray-400"
		>
			{{ t(`${MessagesNames.KanjiReadingTypeName}.${type}.badge`) }}
		</span>

		<div v-if="!isEditor" class="flex flex-row flex-wrap gap-y-2 gap-x-1">
			<div
				v-for="(reading, ri) in readings"
				:key="ri"
				:class="[reading.tags.includes('gai') ? `text-gray-400` : '']"
				class="after:ml-2 after:text-gray-200 after:content-['・'] last:after:content-none dark:after:text-gray-500"
			>
				<span
					v-if="reading.tags.length > 0 && !reading.tags.includes('gai')"
					class="mx-1"
				>
					<template v-for="(tag, ti) in reading.tags">
						<span
							v-if="tag != 'gai'"
							:key="ti"
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

		<div v-else class="gap-y-2 gap-x-1">
			<div v-for="(reading, ri) in readings" :key="ri" class="flex gap-2">
				<EditInput
					v-model="reading.value"
					name="reading-input"
					placeholder="чтение"
				/>
				<Multiselect
					v-model="reading.tags"
					:options="optionsList"
					:multiple="true"
					:custom-label="customLabel"
				/>
				<span
					@click="readings.splice(ri, 1)"
					class="ml-1 cursor-pointer font-medium text-red-700"
					>X</span
				>
			</div>
			<Button @click="addReading" class="w-full font-medium">+ чтение</Button>
		</div>
	</div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
