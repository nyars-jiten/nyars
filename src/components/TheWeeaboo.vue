<script setup lang="ts">
	import { useI18n } from "vue-i18n";
	import { onMounted, reactive } from "vue";

	import { api } from "@/api";
	import { avatarUrl } from "@/utils/avatar-url";
	import { MessagesNames } from "@/locale/messages-names";

	import { type UserList } from "@/api/types";

	const { t } = useI18n();

	const users = reactive<UserList>([]);

	onMounted(async () => {
		users.push(...(await api.dictionaryJpBestUsers()));
	});
</script>

<template>
	<section class="flex flex-wrap">
		<div
			v-for="{ username, avatar, userRating } of users"
			class="flex p-4 md:w-1/3"
		>
			<img
				class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 object-contain"
				:src="avatarUrl(avatar).href"
			/>

			<div class="grow pl-6">
				<h2 class="mb-2 text-lg font-medium uppercase">
					{{ username }}
				</h2>
				<div class="grid grid-cols-[1fr_min-content] gap-x-4">
					<div>{{ t(MessagesNames.UserWeekRating) }}</div>
					<div>{{ userRating.weekRating }}</div>

					<div>{{ t(MessagesNames.UserSummaryNew) }}</div>
					<div>{{ userRating.summary.week.japNew }}</div>

					<div>{{ t(MessagesNames.UserSummaryEdit) }}</div>
					<div>{{ userRating.summary.week.japEdit }}</div>
				</div>
			</div>
		</div>
	</section>
</template>
