<script setup lang="ts">
import Header from "./components/header.vue";
</script>

<template>
	<Header />

	<RouterView class="max-w-4xl container mx-auto my-20" />
</template>

<style>
#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
