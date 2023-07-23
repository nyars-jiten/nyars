<script setup lang="ts">
	type Props = {
		sep?: string;
	};

	withDefaults(defineProps<Props>(), { sep: "・" });
</script>

<template>
	<span :class="`after:content-['${sep}'] last:after:content-none`">
		<slot />
	</span>
</template>
