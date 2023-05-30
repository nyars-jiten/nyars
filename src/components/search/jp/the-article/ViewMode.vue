<template>
	<slot :state="state" :toggle="toggle" />
</template>

<script setup lang="ts">
	const state = ref(false);

	const toggle = () => (state.value = !state.value);
</script>
