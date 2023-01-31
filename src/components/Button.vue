<script setup lang="ts"></script>

<template>
	<button
		class="focus:outline-none shadow text-xs uppercase inline-flex items-center gap-2 rounded px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-300 hover:dark:bg-gray-600 font-medium whitespace-nowrap"
	>
		<slot />
		<slot :size="16" class="opacity-50" name="icon" />
	</button>
</template>
