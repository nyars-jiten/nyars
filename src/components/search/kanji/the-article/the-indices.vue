<template>
	<div>
		<template v-for="(index, indexId) of indicesByTypes" :key="indexId">
			<Disclosure
				v-slot="{ open }"
				as="div"
				class="border-l-2 border-gray-400 dark:border-gray-500"
			>
				<DisclosureButton
					class="flex w-full select-none justify-between py-2 px-3 text-gray-400 hover:opacity-75"
				>
					<span>{{
						locale.t(`${MessagesNames.KanjiIndexTypeName}.${indexId}`)
					}}</span>
					<Chevron :class="open ? 'transform rotate-180' : ''" />
				</DisclosureButton>
				<DisclosurePanel>
					<table
						class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
					>
						<thead
							class="select-none bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
						>
							<tr>
								<th scope="col" class="p-3 font-normal">
									{{ locale.t(MessagesNames.Index) }}
								</th>
								<th scope="col" class="p-3 font-normal">
									{{ locale.t(MessagesNames.Source) }}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="(entry, entryId) of index"
								:key="entryId"
								class="border-b bg-white last:border-none dark:border-gray-700 dark:bg-gray-800"
							>
								<td class="p-3">{{ entry.value }}</td>
								<td
									scope="row"
									class="p-3 font-medium text-gray-900 dark:text-white"
								>
									{{
										locale.t(`${MessagesNames.IndexSourceAbbr}.${entry.source}`)
									}}
								</td>
							</tr>
						</tbody>
					</table>
				</DisclosurePanel>
			</Disclosure>
		</template>
	</div>
</template>

<script setup lang="ts">
	import { MessagesNames } from "@/locale/messages-names";
	import { useI18n } from "vue-i18n";

	import { KanjiIndex } from "@/api/kanji-rest/types";

	import {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
	} from "@headlessui/vue";
	import Chevron from "vue-material-design-icons/ChevronDown.vue";

	type Props = { indices: KanjiIndex[] };

	const props = defineProps<Props>();

	const locale = useI18n();

	const indicesByTypes = props.indices.reduce((acc, curr) => {
		acc[curr.type] = acc[curr.type] || [];
		acc[curr.type].push(curr);
		return acc;
	}, Object.create(null));
</script>
