<template>
	<section>
		<div class="flex flex-wrap">
			<div
				v-for="{ username, avatar, userRating } of bestUsers"
				:key="username"
				class="flex p-4 md:w-1/3"
			>
				<img
					class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 object-contain"
					:src="avatarUrl(avatar).href"
				/>
				<div class="grow pl-6">
					<h2 class="mb-2 text-lg font-medium">
						{{ username }}
					</h2>
					<div class="grid grid-cols-[1fr_min-content] gap-x-4 leading-relaxed">
						<div>Рейтинг</div>
						<div>{{ userRating.weekRating }}</div>

						<div>Новых статей</div>
						<div>{{ userRating.summary.week.japNew }}</div>

						<div>Исправлений</div>
						<div>{{ userRating.summary.week.japEdit }}</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { reactive } from "vue";

	import { api } from "@/api";
	import { avatarUrl } from "@/core/avatar-url";

	const bestUsers = reactive(await api.dictionaryJapBestUsers());
</script>
