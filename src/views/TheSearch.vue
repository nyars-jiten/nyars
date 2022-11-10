<script setup lang="ts">
	import { useRoute } from "vue-router";
	import { onBeforeMount, watch } from "vue";

	import { useSearch } from "@/stores/search";

	import TheInput from "@/components/search/TheInput.vue";
	import { storeToRefs } from "pinia";

	onBeforeMount(() => {
		const { query } = useRoute();

		const { request } = query;
		if (typeof request !== "string") return;

		const { mode } = storeToRefs(useSearch());
		const { searchResults } = useSearch();

		const cancel = watch(mode, async () => {
			cancel();

			await searchResults({ request });
		});
	});
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
