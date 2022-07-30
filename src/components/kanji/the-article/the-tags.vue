<template>
	<div class="flex flex-wrap items-start gap-2">
		<span
			v-for="(tag, tagId) of tags"
			:key="tagId"
			type="button"
			class="border-tag-jlpt-n4 text-tag-jlpt-n4 select-none whitespace-nowrap rounded-md border px-2 text-sm hover:opacity-50"
		>
			{{ tag }}
		</span>
	</div>
</template>

<script setup lang="ts">
	import { useI18n } from "vue-i18n";

	//import { MessagesNames } from "@/locale/messages-names";

	type Props = { tags: string[] };

	defineProps<Props>();

	const locale = useI18n();
</script>
