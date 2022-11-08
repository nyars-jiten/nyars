<template>
	<button
		:disabled="disabled"
		:class="
			disabled
				? 'bg-accent-400 dark:bg-accent-700'
				: 'bg-gray-100 dark:bg-gray-700 hover:opacity-75'
		"
		class="flex items-center gap-2 rounded-md py-1 px-3 capitalize"
	>
		<slot />
	</button>
</template>

<script setup lang="ts">
	type Props = { disabled: boolean };

	defineProps<Props>();
</script>
