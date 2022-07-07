<template>
	<section>
		<div class="flex flex-wrap">
			<div
				v-for="{ name, avatar, statistics } of bestUsers.results"
				:key="name"
				class="p-4 md:w-1/3 flex"
			>
				<img
					class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-200 object-contain"
					:src="avatar"
				/>
				<div class="flex-grow pl-6">
					<h2 class="text-lg title-font font-medium mb-2">{{ name }}</h2>
					<div class="leading-relaxed grid grid-cols-[1fr_min-content] gap-x-4">
						<div>Рейтинг</div>
						<div>{{ statistics.rating }}</div>

						<div>Новых статей</div>
						<div>{{ statistics.contents_new }}</div>

						<div>Исправлений</div>
						<div>{{ statistics.contents_edit }}</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { reactive } from "vue";
	import { api } from "@/api";

	const bestUsers = reactive(await api.statistics.bestUsers());
</script>
