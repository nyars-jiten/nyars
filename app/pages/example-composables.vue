<script setup lang="ts">
// Example of using the new composable-style API

// User data with automatic caching and reactivity
const { data: currentUser, pending: userPending, error: userError } = await useUserData().getCurrentUser()

// User profile data
const username = useRoute('users-username').params.username
const { data: user, pending: userProfilePending } = await useUserData().getUser(username)

// Weekly stats with caching
const { data: weeklyStats } = await useUserData().getWeeklyStats()

// Japanese entries with reactive search
const { data: entry, pending: entryPending } = await useJpnEntries().getEntry('12345')

// Edits with pagination
const { data: edits, pending: editsPending } = await useEditsData().getEdits(25, 0, '')

// Search with reactive parameters
const { query, searchResults, nextPage, prevPage, resetSearch } = useReactiveSearch()

// OCR data
const { data: ocrBooks } = await useOcrData().getBooks()

// Settings management
const { changeUsername, changePassword } = useSettings()

// Authentication state
const { isAuthenticated, isAdmin, logout } = useAuthState()

// Example of using actions
async function handleEditEntry(wid: string, data: EditorTxtEntryJp) {
  const { editEntry } = useJpnEntries()
  try {
    const result = await editEntry(wid, data)
    console.log('Entry edited successfully:', result)
  }
  catch (error) {
    console.error('Failed to edit entry:', error)
  }
}

// Example of using search
async function handleSearch() {
  if (query.value.trim()) {
    // searchResults is automatically reactive
    console.log('Searching for:', query.value)
  }
}

// Example of using settings
async function handleUsernameChange(newUsername: string) {
  const result = await changeUsername(newUsername)
  if (result.success) {
    console.log('Username changed successfully')
  }
  else {
    console.error('Failed to change username:', result.error)
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-900 p-8">
    <div class="max-w-4xl mx-auto space-y-8">
      <h1 class="text-3xl font-bold text-white">
        Composable API Examples
      </h1>

      <!-- User Data Example -->
      <div class="bg-neutral-800 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-white mb-4">
          User Data (useAsyncData)
        </h2>

        <div v-if="userPending" class="text-neutral-400">
          Loading user data...
        </div>

        <div v-else-if="userError" class="text-red-400">
          Error loading user data
        </div>

        <div v-else-if="user" class="space-y-2">
          <p class="text-white">
            Username: {{ user.username }}
          </p>
          <p class="text-white">
            Login: {{ user.login }}
          </p>
          <p class="text-white">
            Admin: {{ user.isAdmin ? 'Yes' : 'No' }}
          </p>
        </div>
      </div>

      <!-- Search Example -->
      <div class="bg-neutral-800 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-white mb-4">
          Reactive Search
        </h2>

        <div class="space-y-4">
          <UiInput
            v-model="query"
            placeholder="Search for entries..."
            @keyup.enter="handleSearch"
          />

          <div v-if="searchResults?.pending" class="text-neutral-400">
            Searching...
          </div>

          <div v-else-if="searchResults?.data" class="space-y-2">
            <p class="text-white">
              Found {{ searchResults.data.entries?.length || 0 }} results
            </p>
            <div class="flex gap-2">
              <UiButton :disabled="!searchResults.data.hasMore" @click="prevPage">
                Previous
              </UiButton>
              <UiButton :disabled="!searchResults.data.hasMore" @click="nextPage">
                Next
              </UiButton>
              <UiButton @click="resetSearch">
                Reset
              </UiButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Authentication State Example -->
      <div class="bg-neutral-800 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-white mb-4">
          Authentication State
        </h2>

        <div class="space-y-2">
          <p class="text-white">
            Authenticated: {{ isAuthenticated ? 'Yes' : 'No' }}
          </p>
          <p class="text-white">
            Admin: {{ isAdmin ? 'Yes' : 'No' }}
          </p>

          <UiButton v-if="isAuthenticated" color="delete" @click="logout">
            Logout
          </UiButton>
        </div>
      </div>

      <!-- Weekly Stats Example -->
      <div class="bg-neutral-800 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-white mb-4">
          Weekly Stats (Cached)
        </h2>

        <div v-if="weeklyStats" class="space-y-2">
          <p class="text-white">
            Total entries: {{ weeklyStats.totalEntries }}
          </p>
          <p class="text-white">
            New entries: {{ weeklyStats.newEntries }}
          </p>
          <p class="text-white">
            Edits: {{ weeklyStats.edits }}
          </p>
        </div>
      </div>

      <!-- OCR Books Example -->
      <div class="bg-neutral-800 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-white mb-4">
          OCR Books
        </h2>

        <div v-if="ocrBooks" class="space-y-2">
          <div v-for="book in ocrBooks" :key="book.id" class="text-white">
            {{ book.title }} ({{ book.pages }} pages)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
