<template>
	<section class="flex flex-col gap-10">
		<TheInput />
		<transition
			enter-active-class="duration-500 ease-out"
			enter-from-class="transform opacity-0 translate-y-5"
			enter-to-class="opacity-100 translate-y-0"
			leave-active-class="duration-300 ease-in"
			leave-from-class="opacity-100 translate-y-0"
			leave-to-class="transform opacity-0 translate-y-5"
		>
			<RouterView />
		</transition>
	</section>
</template>

<script setup lang="ts">
	import TheInput from "@/components/search/the-input.vue";
</script>

<style scoped></style>
