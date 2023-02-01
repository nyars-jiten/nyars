<template>
	<Component
		:is="block"
		class="ml-1 border-red-600"
		contenteditable="true"
		@input="
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
