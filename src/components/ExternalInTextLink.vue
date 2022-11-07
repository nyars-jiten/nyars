<template>
	<a
		:href="href"
		target="_blank"
		class="underline underline-offset-4 decoration-dotted hover:text-accent-500"
	>
		<slot />
	</a>
</template>

<script setup lang="ts">
	type Props = { href: string };

	defineProps<Props>();
</script>
