<!-- TODO: deprecated -->
<script setup lang="ts">
	import BestUsers from "@/components/best-users.vue";
	import TotalStats from "@/components/total-stats.vue";
</script>

<template>
	<main class="container my-20 mx-auto max-w-4xl">
		<h1 class="mb-10 text-center text-4xl font-medium">На этой неделе</h1>
		<h2 class="mb-20 text-center text-3xl font-medium">
			Наибольший вклад внесли
		</h2>
		<Suspense>
			<template #default>
				<BestUsers class="mb-20" />
			</template>
			<template #fallback> loading... </template>
		</Suspense>

		<h1 class="mb-10 text-center text-4xl font-medium">За все время</h1>
		<h2 class="mb-20 text-center text-3xl font-medium">
			Оставили след в истории
		</h2>

		<Suspense>
			<template #default>
				<BestUsers class="mb-20" />
			</template>
			<template #fallback> loading... </template>
		</Suspense>

		<h1 class="mb-10 text-center text-3xl font-medium">Было</h1>

		<Suspense>
			<template #default>
				<TotalStats />
			</template>
			<template #fallback> loading... </template>
		</Suspense>
	</main>
</template>
