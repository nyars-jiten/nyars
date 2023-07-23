<script setup lang="ts">
	import TheHeader from "./components/the-header.vue";
</script>

<template>
	<TheHeader />

	<RouterView class="container mx-auto my-20 max-w-4xl md:leading-relaxed" />
</template>
