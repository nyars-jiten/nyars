<script setup lang="ts">
  import { tv } from 'tailwind-variants'

  interface Props {
    edit: Edit
  }

  const props = defineProps<Props>()

  const route = useRoute('jpn-wid')

  const isEntryPage = Boolean(route.params.wid)

  const [showChanges, toggleChanges] = useToggle()

  const mark = tv({
    variants: {
      border: {
        [EditStatus.None]: '',
        [EditStatus.New]: 'border-sky-500',
        [EditStatus.Declined]: ' border-red-500',
        [EditStatus.Accepted]: 'border-lime-500',
        [EditStatus.AutoAccepted]: 'border-gray-500',
        [EditStatus.Reverted]: 'border-purple-500'
      },
      text: {
        [EditStatus.None]: '',
        [EditStatus.New]: 'text-sky-300',
        [EditStatus.Declined]: ' text-red-300',
        [EditStatus.Accepted]: 'text-lime-300',
        [EditStatus.AutoAccepted]: 'text-gray-300',
        [EditStatus.Reverted]: 'text-purple-300'
      }
    }
  })

  const createdDate = computed(() => useTime(props.edit.createdDate).value)
  const useApprover = computed(() => props.edit.status !== EditStatus.AutoAccepted)

</script>

<template>
  <section class="rounded-md border-l-2 px-4 py-1 leading-none shadow-md outline-dashed outline-1 outline-neutral-700 transition-colors hover:bg-neutral-700 hover:outline-neutral-600" :class="mark({ border: edit.status })">
    <div class="flex flex-col items-center gap-3 py-1 hover:cursor-pointer md:grid md:grid-cols-[40%_60%] md:gap-0" @click="toggleChanges()">
      <NuxtLink
        :to="{name: 'jpn-wid', params: {wid: edit.identifier}}"
        :class="`flex px-2 md:px-0 justify-center w-full md:truncate md:inline ${isEntryPage ? 'pointer-events-none':'hover:text-ns-500'}`"
        @click.stop
      >
        <span
          v-for="(_,w) in edit.title"
          :key="w"
          class="truncate text-2xl after:content-['・'] last:after:content-none"
        >
          {{ w }}
        </span>
      </NuxtLink>

      <div class="order-3 flex gap-3 md:order-none md:justify-end">
        <span class="whitespace-nowrap text-right" :class="mark({text: edit.status})">
          {{ $t(`models.edit.status.${edit.status}`) }}
        </span>

        <EditUserProfile v-if="useApprover && edit.approver" :user="edit.approver" />
      </div>

      <div class="flex items-center gap-2">
        <span>#{{ edit.id }}</span>
        
        <i class="text-neutral-500">
          {{ $t(`models.edit.dictionary.${edit.dictionary}`) }}
        </i>

        <span :class="`italic text-ns-edit-type-${edit.type}`">
          {{ $t(`models.edit.type.${edit.type}`) }}
        </span>
      </div>

      <div class="order-4 flex items-center gap-1.5 max-[490px]:flex-col-reverse md:order-none md:justify-end lg:gap-3">
        <span>
          {{ $t('models.edit.createdDate') }}
          {{ createdDate }}
        </span>

        <EditUserProfile :user="edit.author" />
      </div>
    </div>

    <LazyChangesPreview v-if="showChanges" :edit-id="edit.id" :is-type-create="edit.type === 1" />
  </section>
</template>
