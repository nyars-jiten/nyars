<template>
	<section
		class="z-10 border p-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 rounded"
		v-show="!disabled"
	>
		<slot />
	</section>
</template>

<script setup lang="ts">
	type Props = { disabled?: boolean };

	withDefaults(defineProps<Props>(), { disabled: false });
</script>
