<script setup lang="ts">
	import TheHeader from "./components/the-header.vue";
</script>

<template>
	<TheHeader />

	<Suspense>
		<template #default>
			<RouterView class="container mx-auto my-20 max-w-4xl" />
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
