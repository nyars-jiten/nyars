<template>
	<div class="flex gap-2">
		<Button @click="copy" class="cursor-copy">
			<template #default>
				{{ article.wid }}
			</template>

			<template #icon="{ size, class: c }">
				<LinkVariantIcon :size="size" :class="c" />
			</template>
		</Button>

		<Button @click="toggle">
			<template #default>
				{{
					t(
						details
							? MessagesNames.SearchShowLess
							: MessagesNames.SearchShowMore,
					)
				}}
			</template>

			<template #icon="{ size, class: c }">
				<Component
					:is="details ? MinusIcon : PlusIcon"
					:size="size"
					:class="c"
				/>
			</template>
		</Button>
	</div>
</template>

<script setup lang="ts">
	import { DeepReadonly } from "vue";
	import { useI18n } from "vue-i18n";

	import { MessagesNames } from "@/locale/messages-names";
	import { type EntryJp } from "@/api/dictionary/jp/types";

	import MinusIcon from "vue-material-design-icons/Minus.vue";
	import PlusIcon from "vue-material-design-icons/Plus.vue";
	import LinkVariantIcon from "vue-material-design-icons/LinkVariant.vue";
	import Button from "@/components/Button.vue";

	type Props = {
		article: DeepReadonly<EntryJp>;
		details: boolean;
		toggle: () => void;
	};

	defineProps<Props>();

	const { t } = useI18n();
	const { VITE_BASE_URL: url } = import.meta.env;

	async function copy(e: MouseEvent) {
		const { target } = e;

		if (target instanceof HTMLElement) {
			await navigator.clipboard.writeText(`${url}/jp/${target.innerText}`);
		}
	}
</script>
