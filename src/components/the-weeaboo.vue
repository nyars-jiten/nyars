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
					<div class="grid grid-cols-[1fr_min-content] gap-x-4">
						<div>{{ locale.t(MessagesNames.UserWeekRating) }}</div>
						<div>{{ userRating.weekRating }}</div>

						<div>{{ locale.t(MessagesNames.UserSummaryNew) }}</div>
						<div>{{ userRating.summary.week.jpNew }}</div>

						<div>{{ locale.t(MessagesNames.UserSummaryEdit) }}</div>
						<div>{{ userRating.summary.week.jpEdit }}</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { MessagesNames } from "@/locale/messages-names";
	import { reactive } from "vue";
	import { useI18n } from "vue-i18n";

	import { api } from "@/api";
	import { avatarUrl } from "@/core/avatar-url";

	const locale = useI18n();

	const bestUsers = reactive(await api.dictionaryJpBestUsers());
</script>
