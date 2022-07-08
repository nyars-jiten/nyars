<template>
	<section>
		<div class="flex flex-wrap -m-4 text-center">
			<div class="p-4 w-1/4">
				<h2 class="title-font font-medium text-3xl">
					{{ format(stats.added) }}
				</h2>
				<p class="leading-relaxed">Добавлено статей</p>
			</div>
			<div class="p-4 w-1/4">
				<h2 class="title-font font-medium text-3xl">
					{{ format(stats.verified) }}
				</h2>
				<p class="leading-relaxed">Исправлено статей</p>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { api } from "@/api";
	import { reactive } from "vue";

	const stats = reactive(await api.statistics.total());

	function format(value: number) {
		const formatter = Intl.NumberFormat("en", { notation: "compact" });
		return formatter.format(value);
	}
</script>
