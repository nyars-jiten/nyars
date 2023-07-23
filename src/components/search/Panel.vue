<script setup lang="ts">
	type Props = { disabled?: boolean };

	withDefaults(defineProps<Props>(), { disabled: false });
</script>

<template>
	<section
		class="z-10 rounded border border-gray-200 bg-gray-100 p-2 dark:border-gray-700 dark:bg-gray-900"
		v-show="!disabled"
	>
		<slot />
	</section>
</template>
