# Composable API Documentation

This directory contains the new composable-style API implementation that replaces the old repository pattern. The new API provides better TypeScript support, automatic caching with `useAsyncData`, and a more intuitive developer experience.

## Key Features

- **Automatic Caching**: All data fetching functions use `useAsyncData` for automatic caching and reactivity
- **Type Safety**: Full TypeScript support with proper type inference
- **Reactive Updates**: Data automatically updates when dependencies change
- **Error Handling**: Built-in error handling with reactive error states
- **Optimistic Updates**: Support for optimistic updates in user actions

## Available Composables

### User Management (`use-user.ts`)

```typescript
// Authentication
const { login, register, logout } = useUserAuth()

// User data with caching
const { getCurrentUser, getUser, getWeeklyStats } = useUserData()

// User management (admin functions)
const { updateUserAccess, banUser, unbanUser } = useUserManagement()

// User profile management
const { updateUsername, updatePassword, uploadAvatar, removeAvatar } = useUserProfile()
```

### Japanese Dictionary (`use-jpn.ts`)

```typescript
// Entry management
const { getEntry, getEntrySource, getSatellites, editEntry, createEntry } = useJpnEntries()

// Tag management
const { getTags, updateTag, createTag } = useJpnTags()

// Downloads
const { getDownloads } = useJpnDownloads()
```

### Edits Management (`use-edits.ts`)

```typescript
// Data fetching
const { getEdit, getEdits, getEditsByWid, getEditsByEntry } = useEditsData()

// Edit actions
const { updateEdit, approveEditAsUnreviewed, approveEditAsReviewed, declineEdit } = useEditActions()
```

### Search (`use-search.ts`)

```typescript
// Basic search
const { getSuggestions, search } = useSearch()

// Reactive search with pagination
const { query, searchResults, nextPage, prevPage, resetSearch } = useReactiveSearch()
```

### OCR (`use-ocr.ts`)

```typescript
// Data fetching
const { getBooks, searchPages, getPage, getNextPage } = useOcrData()

// Actions
const { updatePage } = useOcrActions()

// Utilities
const { ocrImageUrl } = useOcrUtils()
```

### Authentication (`use-auth.ts`)

```typescript
// Authentication actions
const { login, register } = useAuth()

// Authentication state
const { isAuthenticated, isAdmin, refreshUser, logout } = useAuthState()
```

### Settings (`use-settings.ts`)

```typescript
// Settings management with optimistic updates
const { changeUsername, changePassword, changeAvatar, deleteAvatar } = useSettings()
```

## Usage Examples

### Basic Data Fetching

```typescript
// Get user data with automatic caching
const { data: user, pending, error } = await useUserData().getUser('username')

// Get entry with caching
const { data: entry } = await useJpnEntries().getEntry('12345')

// Get edits with pagination
const { data: edits } = await useEditsData().getEdits(25, 0, '')
```

### Reactive Search

```typescript
// Reactive search with automatic updates
const { query, searchResults, nextPage, prevPage } = useReactiveSearch()

// Search results automatically update when query changes
watch(searchResults, (results) => {
  console.log('Search results:', results.data)
})
```

### User Actions

```typescript
// Update user profile with optimistic updates
const { changeUsername } = useSettings()

async function handleUsernameChange(newUsername: string) {
  const result = await changeUsername(newUsername)
  if (result.success) {
    console.log('Username changed successfully')
  }
  else {
    console.error('Failed to change username:', result.error)
  }
}
```

### Authentication State

```typescript
// Check authentication state
const { isAuthenticated, isAdmin, logout } = useAuthState()

// Conditional rendering
if (isAuthenticated.value) {
  // Show authenticated content
}
```

## Migration from Old API

The new composable API provides a cleaner and more efficient way to interact with the backend:

```typescript
// New way (recommended)
const { data: user } = await useUserData().getUser('username')
```

## Benefits of New API

1. **Better Performance**: Automatic caching reduces unnecessary API calls
2. **Reactive Updates**: Data automatically updates when dependencies change
3. **Type Safety**: Better TypeScript support with proper type inference
4. **Error Handling**: Built-in error states that are reactive
5. **Developer Experience**: More intuitive API with better documentation
6. **Optimistic Updates**: Support for optimistic updates in user actions
7. **Consistent Patterns**: All composables follow the same patterns

## Best Practices

1. **Use the new composables** for new code
2. **Gradually migrate** existing code to use the new API
3. **Leverage caching** by using the same key for the same data
4. **Handle errors** properly using the reactive error states
5. **Use optimistic updates** for better user experience
6. **Use the new composables** for all new development

## Type Safety

All composables are fully typed with TypeScript:

```typescript
// TypeScript will infer the correct types
const { data: user } = await useUserData().getUser('username')
// user is typed as Ref<User | null>

const { data: entry } = await useJpnEntries().getEntry('12345')
// entry is typed as Ref<EntryJp | null>
```

This provides better IDE support, compile-time error checking, and better developer experience.
