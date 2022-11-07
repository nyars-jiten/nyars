<script setup lang="ts">
	import TheInput from "@/components/search/the-input.vue";
</script>

<template>
	<section class="flex flex-col gap-10">
		<TheInput />

		<RouterView v-slot="{ Component }">
			<Transition
				enter-active-class="duration-300 ease-out"
				enter-from-class="transform opacity-0 translate-y-5"
				enter-to-class="opacity-100 translate-y-0"
				leave-active-class="duration-150 ease-in"
				leave-from-class="opacity-100 translate-y-0"
				leave-to-class="transform opacity-0 translate-y-5"
				mode="out-in"
			>
				<Component :is="Component" />
			</Transition>
		</RouterView>
	</section>
</template>
