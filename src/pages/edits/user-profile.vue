<template>
	<span class="flex gap-2 items-center">
		<img class="rounded-full h-6 shadow" :src="avatar(user.avatar).href" />

		<TextBetween class="whitespace-nowrap">
			{{ user.username }}
		</TextBetween>
	</span>
</template>

<script setup lang="ts">
	import type { User } from "@/api/edits-rest/types";

	type Props = { user: User };

	defineProps<Props>();

	function avatar(relative: string) {
		return new URL(relative, "https://nyars.org/upload/avatars/");
	}
</script>
