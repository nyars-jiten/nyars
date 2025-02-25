export const useEditorEntryStore = defineStore('editorEntryStore', () => {
  const entry = ref({} as EditorTxtEntryJp)

  return { entry }
})
