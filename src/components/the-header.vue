<template>
	<header class="sticky top-0 z-50 bg-white shadow-md">
		<div
			class="container mx-auto flex max-w-4xl flex-row flex-wrap items-center py-5"
		>
			<div class="mr-4 border-r border-gray-100 py-1 pr-4">
				<RouterLink
					class="flex h-10 w-10 items-center rounded-full bg-logo bg-cover font-medium"
					:to="{ name: RoutesNames.SearchHome }"
				/>
			</div>

			<nav class="flex flex-wrap items-center justify-center gap-5 text-base">
				<RouterLink
					:to="{ name: RoutesNames.SearchHome }"
					class="hover:text-red-900"
				>
					{{ locale.t(MessagesNames.HeaderHome) }}
				</RouterLink>
				<RouterLink
					:to="{ name: RoutesNames.Edits }"
					class="hover:text-red-900"
				>
					{{ locale.t(MessagesNames.HeaderEdits) }}
				</RouterLink>
				<a href="#" class="hover:text-red-900">
					{{ locale.t(MessagesNames.HeaderBugTracker) }}
				</a>
				<a href="#" class="hover:text-red-900">
					{{ locale.t(MessagesNames.HeaderDownload) }}
				</a>
			</nav>
		</div>
	</header>
</template>

<script setup lang="ts">
	import { MessagesNames } from "@/locale/messages-names";
	import { RoutesNames } from "@/router/routes-names";
	import { useI18n } from "vue-i18n";

	const locale = useI18n();
</script>
