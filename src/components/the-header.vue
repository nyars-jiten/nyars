<template>
	<header class="sticky top-0 z-50 bg-white shadow-md dark:bg-zinc-800">
		<div
			class="container mx-auto flex max-w-4xl flex-row flex-wrap items-center justify-between py-5"
		>
			<div class="flex">
				<div
					class="mr-8 border-r border-gray-100 py-1 pr-8 dark:border-zinc-600"
				>
					<RouterLink
						class="flex h-10 w-10 items-center rounded-full bg-cover font-medium"
						:class="{
							'bg-logo-dark': isDarkTheme,
							'bg-logo-light': !isDarkTheme,
						}"
						:to="{ name: RoutesNames.SearchHome }"
					/>
				</div>

				<nav
					class="flex flex-wrap items-center justify-center gap-7 text-base dark:text-zinc-300 [&>*]:duration-150 [&>*]:ease-in-out"
				>
					<RouterLink
						:to="{ name: RoutesNames.SearchHome }"
						class="hover:text-accent-500"
					>
						{{ locale.t(MessagesNames.HeaderHome) }}
					</RouterLink>
					<RouterLink
						:to="{ name: RoutesNames.Edits }"
						class="hover:text-accent-500"
					>
						{{ locale.t(MessagesNames.HeaderEdits) }}
					</RouterLink>
					<a href="#" class="hover:text-accent-500">
						{{ locale.t(MessagesNames.HeaderBugTracker) }}
					</a>
					<a href="#" class="hover:text-accent-500">
						{{ locale.t(MessagesNames.HeaderDownload) }}
					</a>
				</nav>
			</div>

			<div class="flex flex-wrap items-center justify-center gap-5 text-base">
				<ThemeSwitcher ref="themeSwitcher" />
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
	import { userTheme } from "@/core/theme/theme-control";
	import { MessagesNames } from "@/locale/messages-names";
	import { RoutesNames } from "@/router/routes-names";
	import { computed } from "vue";
	import { useI18n } from "vue-i18n";

	import ThemeSwitcher from "./theme-switcher.vue";

	const isDarkTheme = computed(_ => userTheme.value == "dark");

	const locale = useI18n();
</script>
