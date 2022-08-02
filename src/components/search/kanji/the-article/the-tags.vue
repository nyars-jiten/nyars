<template>
	<div v-if="tags.length > 0" class="flex flex-wrap items-start gap-2">
		<span
			v-for="(tag, tagId) of tags"
			:key="tagId"
			type="button"
			class="select-none whitespace-nowrap rounded-md border border-tag-jlpt-n4 px-2 text-sm text-tag-jlpt-n4 hover:opacity-75"
		>
			{{ tag }}
		</span>
	</div>
</template>

<script setup lang="ts">
	type Props = { tags: string[] };

	defineProps<Props>();
</script>
