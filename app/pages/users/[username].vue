<script setup lang="ts">
const username = useRoute('users-username').params.username

const { clientGetUser } = useUserRepo()
const { data: user, pending, error } = await useAsyncData(`user-${username}`, () => clientGetUser(username))

watch(user, () => {
  if (user.value) {
    user.value.banned = true
  }
})

const avatar = computed(() => useAvatar(user.value?.avatar ?? '').href)
const regTimeAgo = computed(() => user.value ? useTime(new Date(user.value.createdAt)) : '')

// const { t } = useI18n()

// Calculate total contributions
const totalContributions = computed(() => {
  if (!user.value?.stats)
    return 0
  return user.value.stats.jpnNew + user.value.stats.jpnEdit + user.value.stats.kanjiNew + user.value.stats.kanjiEdit + user.value.stats.rusNew + user.value.stats.rusEdit + user.value.stats.autoNew + user.value.stats.autoEdit
})

// Get role badge styling
function getRoleBadge(isAdmin: boolean) {
  if (isAdmin)
    return { text: 'Администратор' }
  return { text: 'Пользователь' }
}

const roleBadge = computed(() => getRoleBadge(user.value?.isAdmin ?? false))

const { getEdits } = useEditRepo()
const { data: edits } = await useLazyAsyncData(
  'edits',
  () => getEdits(),
  {
    default: (): EditResponse[] => [],
  },
)

// Admin functions
const { updateUserAccess, banUser, unbanUser } = useUserRepo()
const { user: currentUser } = storeToRefs(useUserStore())

const isAdmin = computed(() => currentUser.value?.isAdmin ?? false)

// Admin state
const userAccess = ref(21)
const banReason = ref('')
const isBanning = ref(false)

// Initialize user access when user data loads
// watch(user, (newUser) => {
//   if (newUser) {
//     userAccess.value = (newUser as any).access ?? 0
//   }
// }, { immediate: true })

// Admin functions
async function saveAccess() {
  if (!user.value)
    return

  try {
    await updateUserAccess(user.value.id, userAccess.value)
    // Refresh user data
    await refreshCookie('user')
  }
  catch (error) {
    console.error('Failed to update user access:', error)
  }
}

async function handleBan(reason: string) {
  if (!user.value || !reason)
    return

  try {
    isBanning.value = true
    await banUser(user.value.id, reason)
    // Refresh user data
    await refreshCookie('user')
    banReason.value = ''
  }
  catch (error) {
    console.error('Failed to ban user:', error)
  }
  finally {
    isBanning.value = false
  }
}

async function handleUnban() {
  if (!user.value)
    return

  try {
    await unbanUser(user.value.id)
    // Refresh user data
    await refreshCookie('user')
  }
  catch (error) {
    console.error('Failed to unban user:', error)
  }
}
</script>

<template>
  <div v-if="pending" class="space-y-8">
    <ProfileSkeleton />
  </div>

  <div v-else-if="error || !user" class="flex flex-col items-center justify-center py-16 space-y-4">
    <Icon name="ic:baseline-person-off" class="text-neutral-600" size="4rem" />
    <h1 class="text-2xl font-semibold">
      Пользователь не найден
    </h1>

    <p class="text-neutral-400">
      Пользователь с именем "{{ username }}" не существует или был удален.
    </p>

    <UiButton @click="navigateTo('/')">
      <Icon name="ic:baseline-home" />
      На главную
    </UiButton>
  </div>

  <div v-else class="space-y-8">
    <!-- Hero Section -->
    <section class="rounded-2xl p-8 flex flex-row items-start gap-6">
      <!-- Avatar -->
      <div class="relative group">
        <img
          :src="avatar"
          :alt="user?.username"
          class="size-32 md:size-40 rounded-2xl border-2 border-neutral-700 group-hover:border-neutral-600 transition-all duration-300 group-hover:scale-105 shadow-2xl"
        >
        <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-neutral-900 flex items-center justify-center">
          <Icon name="ic:baseline-check" class="text-sm" />
        </div>
      </div>

      <!-- User Info -->
      <div class="flex-1 space-y-4">
        <div>
          <h1 class="text-4xl md:text-5xl font-bold mb-2">
            {{ user?.username }}
          </h1>

          <div class="flex items-center gap-3">
            <UiBadge v-if="user?.banned" color="danger" text="Заблокирован" />
            <UiBadge v-else color="primary" :text="roleBadge.text" />
          </div>
        </div>

        <!-- Key Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-neutral-800/50 rounded-lg p-4 backdrop-blur-sm">
            <div class="text-2xl font-bold">
              {{ user?.stats.rating }}
            </div>
            <div class="text-sm text-neutral-400">
              Рейтинг
            </div>
          </div>
          <div class="bg-neutral-800/50 rounded-lg p-4 backdrop-blur-sm">
            <div class="text-2xl font-bold">
              {{ totalContributions.toLocaleString() }}
            </div>
            <div class="text-sm text-neutral-400">
              Правок
            </div>
          </div>
          <div class="bg-neutral-800/50 rounded-lg p-4 backdrop-blur-sm">
            <div class="text-2xl font-bold">
              {{ user?.stats.reviews }}
            </div>
            <div class="text-sm text-neutral-400">
              Проверок
            </div>
          </div>
          <div class="bg-neutral-800/50 rounded-lg p-4 backdrop-blur-sm">
            <div class="text-2xl font-bold">
              {{ regTimeAgo }}
            </div>
            <div class="text-sm text-neutral-400">
              На сайте
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Grid -->
    <section class="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Activity Heatmap -->
      <UiBlock class="md:col-span-2">
        <template #default>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold">
              Активность
            </h2>
            <div class="text-sm text-neutral-400">
              {{ new Date().getFullYear() }}
            </div>
          </div>
          <Heatmap :id="user?.id" />
        </template>
      </UiBlock>

      <!-- Quick Stats -->
      <UiBlock class="col-span-2 lg:col-span-1">
        <template #default>
          <h2 class="text-xl font-semibold mb-4">
            Детальная статистика
          </h2>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-neutral-400">Японские слова (новые)</span>
              <span class="text-blue-400 font-medium">{{ user?.stats.jpnNew }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-400">Японские слова (правки)</span>
              <span class="text-blue-400 font-medium">{{ user?.stats.jpnEdit }}</span>
            </div>
            <!-- <div class="flex justify-between">
              <span class="text-neutral-400">Кандзи (новые)</span>
              <span class="text-purple-400 font-medium">{{ user?.stats.kanjiNew }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-400">Кандзи (правки)</span>
              <span class="text-purple-400 font-medium">{{ user?.stats.kanjiEdit }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-400">Русские слова (новые)</span>
              <span class="text-green-400 font-medium">{{ user?.stats.rusNew }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-400">Русские слова (правки)</span>
              <span class="text-green-400 font-medium">{{ user?.stats.rusEdit }}</span>
            </div> -->
          </div>
        </template>
      </UiBlock>

      <!-- Edits -->
      <UiBlock class="col-span-full">
        <template #default>
          <h2 class="text-xl font-semibold mb-4">
            Правки
          </h2>

          <Edit
            v-for="edit in edits"
            :key="edit.id"
            :edit="edit"
            :expanded="true"
          />
        </template>
      </UiBlock>

      <!-- Admin Panel -->
      <UiBlock v-if="isAdmin" class="col-span-full">
        <template #default>
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold">
                <Icon name="ic:baseline-admin-panel-settings" class="inline mr-2" />
                Панель администратора
              </h2>
              <UiBadge color="warning" text="Только для администраторов" />
            </div>

            <!-- User Status -->
            <user-status-manager
              :is-banned="!!user?.banned"
              :ban-reason="undefined"
              :is-banning="isBanning"
              @start-ban="isBanning = true"
              @confirm-ban="handleBan"
              @cancel-ban="isBanning = false; banReason = ''"
              @unban="handleUnban"
            />

            <!-- Access Rights -->
            <access-rights-manager
              v-model:user-access="userAccess"
              @save="saveAccess"
            />
          </div>
        </template>
      </UiBlock>
    </section>
  </div>
</template>
