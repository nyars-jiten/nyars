<template>
	<Component
		:is="block"
		class="px-1"
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
