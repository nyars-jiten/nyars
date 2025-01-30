export interface EditorTxtEntryJp {
  reading: string
  spelling: string
  body: string
  status: EntryStatus
  comment: string
}

export interface EditorEntryJp {
  entry: EntryJp
  warnings: string[]
}
