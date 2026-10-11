// Действия модератора над правкой (принять, принять непроверенной, отклонить).
// `patched` — правки, изменённые на странице: показываются поверх ответа сервера.

export function useEditModeration() {
  const { user } = storeToRefs(useUserStore())
  const { approveEditAsReviewed, approveEditAsUnreviewed, declineEdit } = useEditActions()

  const patched = ref<Record<string, EditResponse>>({})

  async function act(edit: EditResponse, action: 'approve' | 'approve-unreviewed' | 'decline') {
    const run = action === 'approve'
      ? approveEditAsReviewed
      : action === 'approve-unreviewed' ? approveEditAsUnreviewed : declineEdit
    const updated = await run(edit.id)
    // сервер может ответить без тела — тогда меняем статус сами
    const fallback = action === 'decline' ? EditStatus.Declined : EditStatus.Accepted
    patched.value = {
      ...patched.value,
      [edit.id]: updated?.id ? updated : { ...edit, status: fallback, approver: user.value ?? edit.approver, updatedAt: new Date() },
    }
  }

  return { patched, act }
}
