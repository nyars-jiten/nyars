import { takeHeapSnapshot } from '../../../utils/heap-snapshot'

export default defineEventHandler(async (event) => {
  // Check user authentication via /_api/me
  const user = await $fetch<{ isAdmin: boolean } | null>('/_api/me', {
    headers: {
      cookie: getRequestHeader(event, 'cookie') || '',
    },
  }).catch(() => null)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'You must be logged in to take heap snapshots',
    })
  }

  // Check if user is admin
  if (!user.isAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
      message: 'Only administrators can take heap snapshots',
    })
  }

  const result = takeHeapSnapshot()

  if (result.success) {
    return {
      success: true,
      message: 'Heap snapshot taken successfully',
      filename: result.filename,
      timestamp: result.timestamp,
    }
  }
  else {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to take heap snapshot',
      message: result.error,
    })
  }
})
