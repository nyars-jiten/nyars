<script setup lang="ts">
	import TheHeader from "./components/the-header.vue";
	import { useReadingsStorage } from "./stores/readings";

	const store = useReadingsStorage();
	store.load();
</script>

<template>
	<TheHeader />

	<Suspense>
		<template #default>
			<RouterView class="max-w-4xl container mx-auto my-20" />
		</template>
		<template #fallback> loading... </template>
	</Suspense>
</template>

<style>
	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
