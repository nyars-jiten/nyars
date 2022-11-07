<template>
	<slot :active="active" :change="change" />
</template>

<script setup lang="ts">
	import { ref } from "vue";

	const active = ref(0);

	function change(id: number) {
		active.value = id;
	}
</script>

<style scoped></style>
