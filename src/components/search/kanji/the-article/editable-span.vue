<template>
	<Component
		:is="block"
		class="h-full border border-dotted bg-gray-100 px-2 py-1 dark:border-gray-700 dark:bg-gray-900"
		contenteditable="true"
		@blur="
			$emit('update:modelValue', ($event!.target as HTMLElement).innerText)
		"
	>
		{{ modelValue }}
	</Component>
</template>

<script setup lang="ts">
	import "vue";

	type Props = {
		block?: "div" | "span";
		modelValue: any;
	};

	withDefaults(defineProps<Props>(), {
		block: "span",
	});
</script>
