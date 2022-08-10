<template>
	<div v-if="images.length > 0" class="flex flex-col gap-4">
		<span class="select-none text-sm text-gray-400 dark:text-gray-400">
			{{ locale.t(MessagesNames.KanjiStyle) }}
		</span>
		<div class="flex flex-row flex-wrap justify-center gap-2">
			<div
				v-for="(image, imageId) of images"
				:key="imageId"
				class="flex flex-col items-center gap-2"
			>
				<div class="w-20">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						version="1.1"
						baseProfile="full"
						:viewBox="image.viewBox"
						fill="currentColor"
					>
						<path
							v-for="(path, pathId) of splitPaths(image.data)"
							:key="pathId"
							:d="path"
						></path>
					</svg>
				</div>
				<span class="text-center text-sm">
					{{ locale.t(`${MessagesNames.KanjiStyleName}.${image.style}`) }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { MessagesNames } from "@/locale/messages-names";
	import { useI18n } from "vue-i18n";

	import { KanjiImage } from "@/api/dictionary/kanji/types";

	type Props = { images: KanjiImage[] };

	defineProps<Props>();

	const locale = useI18n();

	function splitPaths(data: string) {
		return data !== null ? data.split("|") : "";
	}
</script>
