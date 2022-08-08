<template>
	<div v-show="forms.length > 0" class="flex flex-col gap-4 rounded-md">
		<span class="select-none text-sm text-gray-400 dark:text-gray-400">
			{{ locale.t(MessagesNames.KanjiForm) }}
		</span>
		<div class="flex flex-row flex-wrap gap-2">
			<div
				v-for="(form, formId) of forms"
				:key="formId"
				class="flex flex-row items-start gap-4"
			>
				<div class="w-20">
					<span v-if="form.literal.length === 1" class="font-header text-7xl">
						{{ form.literal }}
					</span>
					<svg
						v-else-if="form.data.length > 0"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						version="1.1"
						baseProfile="full"
						viewBox="0 0 200 200"
						fill="currentColor"
					>
						<path
							v-for="(path, pathId) of splitPaths(form.data)"
							:key="pathId"
							:d="path"
						></path>
					</svg>
				</div>
				<div class="flex flex-col gap-2">
					<span
						v-if="form.type !== null"
						class="select-none whitespace-nowrap rounded-md border border-accent-500 px-2 text-sm text-accent-500 hover:opacity-75"
					>
						{{
							locale.t(`${MessagesNames.KanjiFormTypeName}.${form.type}.short`)
						}}
					</span>
					<span v-if="form.literal.length === 1" class="text-sm">
						{{ charUnicode(form.literal) }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { charUnicode } from "@/core/unicode";
	import { MessagesNames } from "@/locale/messages-names";
	import { useI18n } from "vue-i18n";

	import type { KanjiForm } from "@/api/dictionary/kanji/types";

	type Props = { forms: KanjiForm[] };

	defineProps<Props>();

	const locale = useI18n();

	function splitPaths(data: string) {
		return data !== null ? data.split("|") : "";
	}
</script>
