<template>
	<button
		type="button"
		class="select-none rounded-md bg-neutral-100 p-1.5 capitalize text-gray-500 duration-150 ease-in-out hover:opacity-50 dark:bg-zinc-700 dark:text-zinc-300"
		@click="toggleTheme"
	>
		<span v-if="userTheme === 'dark'">
			<weather-night :size="24" />
		</span>
		<span v-if="userTheme === 'light'">
			<white-balance-sunny :size="24" />
		</span>
	</button>
</template>

<script setup lang="ts">
	import {
		toggleTheme,
		updateTheme,
		userTheme,
	} from "@/core/theme/theme-control";

	import { onMounted } from "vue";
	import WeatherNight from "vue-material-design-icons/WeatherNight.vue";
	import WhiteBalanceSunny from "vue-material-design-icons/WhiteBalanceSunny.vue";

	onMounted(() => updateTheme());
</script>
