<script setup lang="ts">
// import { computed, ref } from 'vue'
// import { useI18n } from 'vue-i18n'

import { StatusVariant } from '@/api/edits-rest/types/status-variant'
import TextBetween from '@/components/text-between.vue'
import type { EditEntry } from '@/api/edits-rest/types'
import ChangesPreview from './changes-preview.vue'
import UserProfile from './user-profile.vue'
// import { formatDistanceToNow } from '@/locale/formatDistanceToNow'
// import { MessagesNames } from '@/locale/messages-names'

type Props = { article: EditEntry }

const props = defineProps<Props>()

// const { t } = useI18n()

const isShowApprover = computed(
  () => props.article.approver && props.article.status !== StatusVariant.AutoAccepted
)

const isChangesVisible = ref(false)

function toggleChanges() {
  isChangesVisible.value = !isChangesVisible.value
}
</script>

<template>
  <section>
    <div
      class="cursor-pointer border-l-2 pl-2"
      :class="`border-status-variant-${article.status}`"
      @click="toggleChanges"
    >
      <div class="flex gap-4">
        <TextBetween class="whitespace-nowrap"> #{{ article.id }} </TextBetween>

        <span :class="`text-status-variant-${article.status}`">
          {{ $t(`edits.status.${article.status}`) }}
        </span>

        <UserProfile v-if="isShowApprover" :user="article.approver!" />

        <span :class="`text-type-variant-${article.type}`" class="italic">
          {{ $t(`edits.type.${article.type}`) }}
        </span>

        <span class="grow truncate">
          {{ $t('edits.created') }}
          <!-- {{ formatDistanceToNow(Date.parse(article.createdDate)) }} -->
        </span>

        <UserProfile :user="article.author" />
      </div>
    </div>

    <div
      v-if="isChangesVisible"
      class="mb-2 mt-4 rounded-md border border-gray-200 dark:border-gray-600"
    >
      <ChangesPreview :id="article.id" />
    </div>
  </section>
</template>
