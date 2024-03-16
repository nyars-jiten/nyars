<script setup lang="ts">
  interface Props {
    edit: Edit
  }

  defineProps<Props>()

  const route = useRoute('jpn-wid')

  const isEntryPage = Boolean(route.params.wid)

  const showChanges = ref(false)
</script>

<template>
  <section :class="`border-l-2 px-1.5 lg:px-3 py-2 shadow border-ns-edit-status-${edit.status}`">
    <div class="flex flex-col items-center gap-3 py-1 hover:cursor-pointer md:grid md:grid-cols-[40%_60%] md:gap-0" @click="showChanges = !showChanges">
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
        <span :class="`whitespace-nowrap text-right text-ns-edit-status-${edit.status}`">
          {{ $t(`models.edit.status.${edit.status}`) }}
        </span>
        <EditUserProfile v-if="edit.status !== EditStatus.AutoAccepted && edit.approver !== null" :user="edit.approver" />
      </div>
      <div class="flex items-center gap-2">
        <span>#{{ edit.id }}</span>
        <span class="italic text-neutral-500">
          {{ $t(`models.edit.dictionary.${edit.dictionary}`) }}
        </span>
        <span :class="`italic text-ns-edit-type-${edit.type}`">
          {{ $t(`models.edit.type.${edit.type}`) }}
        </span>
      </div>
      <div class="order-4 flex items-center gap-1.5 max-[490px]:flex-col-reverse md:order-none md:justify-end lg:gap-3">
        <span>
          {{ $t('models.edit.createdDate') }}
          {{ useTime(edit.createdDate).value }}
        </span>
        <EditUserProfile :user="edit.author" />
      </div>
    </div>
    <LazyChangesPreview
      v-if="showChanges"
      :edit-id="edit.id"
      :is-type-create="edit.type === 1"
    />
  </section>
</template>
