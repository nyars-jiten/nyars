<template>
	<div v-show="forms.length > 0" class="flex flex-col gap-4 rounded-md">
		<span class="text-sm text-gray-400 dark:text-gray-400">
			{{ t(MessagesNames.KanjiForm) }}
		</span>
		<div class="flex flex-row flex-wrap gap-2">
			<div v-for="form of forms" class="flex flex-row items-start gap-4">
				<div class="w-20">
					<span v-if="form.literal.length <= 2" class="text-7xl">
						{{ form.literal }}
					</span>

					<svg
						v-else-if="(form.data?.length || 0) > 0"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						version="1.1"
						baseProfile="full"
						viewBox="0 0 200 200"
						fill="currentColor"
					>
						<path v-for="path of splitPaths(form?.data ?? '')" :d="path" />
					</svg>
				</div>
				<div class="flex flex-col gap-2">
					<span
						v-if="form.type !== null"
						class="border-accent-500 text-accent-500 whitespace-nowrap rounded-md border px-2 text-sm hover:opacity-75"
					>
						{{ t(`${MessagesNames.KanjiFormTypeName}.${form.type}.short`) }}
					</span>

					<span v-if="form.literal.length == 1" class="text-sm">
						{{ unicodeIndexFromUTF8(form.literal) }}
					</span>

					<span v-else-if="form.literal.length == 2" class="text-sm">
						{{ unicodeIndexFromUTF16(form.literal) }}
					</span>

					<span v-else class="text-sm"> - </span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { unicodeIndexFromUTF16, unicodeIndexFromUTF8 } from "@/utils/unicode";
	import { MessagesNames } from "@/locale/messages-names";
	import { useI18n } from "vue-i18n";

	import type { KanjiForm } from "@/api/dictionary/kanji/types";

	type Props = { forms: KanjiForm[] };

	defineProps<Props>();

	const { t } = useI18n();

	function splitPaths(data: string) {
		return data !== null ? data.split("|") : "";
	}
</script>
