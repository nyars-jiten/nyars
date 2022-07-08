<script setup lang="ts">
	import TheHeader from "./components/the-header.vue";
	import { useReadingsStorage } from "./stores/readings";

	const store = useReadingsStorage();
	store.load();
</script>

<template>
	<TheHeader />

	<RouterView class="max-w-4xl container mx-auto my-20" />
</template>

<style>
	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
