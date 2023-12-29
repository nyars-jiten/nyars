<script setup lang="ts">
  interface Props {
    edit: Edit
  }

  defineProps<Props>()

  const isChangesVisible = ref(false)
</script>

<template>
  <section :class="`border-l-2 px-2 pb-2 shadow border-ns-edit-status-${edit.status}`">
    <div class="p-2">
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="truncate">
          <div class="truncate">
            <span
              v-for="(_,w) in edit.title"
              :key="w"
              class="text-2xl after:content-['・'] last:after:content-none"
            >
              {{ w }}
            </span>
          </div>
        </NuxtLink>

        <span :class="`grow whitespace-nowrap text-right text-ns-edit-status-${edit.status}`">
          {{ $t(`models.edit.status.${edit.status}`) }}
        </span>
        <EditUserProfile v-if="edit.status !== EditStatus.AutoAccepted" :user="edit.approver" />
      </div>

      <div class="flex pt-2">
        <div class="flex grow">
          <button class="btn-generic" type="button" @click="isChangesVisible = !isChangesVisible">
            <IconFormatFontSizeIncrease v-if="isChangesVisible" class="!m-0 text-[16px]" />
            <IconFormatFontSizeDecrease v-else class="!m-0 text-[16px]" />
          </button>
          <span class="before:content-['「'] after:content-['」']">
            #{{ edit.id }}
          </span>
          <span class="mr-1 italic text-neutral-500">
            {{ $t(`models.edit.dictionary.${edit.dictionary}`) }}
          </span>
          <span :class="`italic text-ns-edit-type-${edit.type}`">
            {{ $t(`models.edit.type.${edit.type}`) }}
          </span>
        </div>
        <div class="flex gap-4">
          <span>
            {{ $t('models.edit.createdDate') }}
            {{ useTime(edit.createdDate).value }}
          </span>
          <EditUserProfile :user="edit.author" />
        </div>
      </div>
    </div>
    <LazyChangesPreview v-if="isChangesVisible" :edit-id="edit.id" class="m-2 rounded-md" />
  </section>
</template>
