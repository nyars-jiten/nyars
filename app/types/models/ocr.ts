export interface OCRBook {
  id: number
  title: string
  totalPages: number
  completedPages: number
  prefix: string
  description: string
}

export interface OCRPageWithBook {
  id: string
  bookId: number
  file: string
  rawLine: string
  word: string
  reading: string
  meaningRu: string
  meaningEn: string
  innerIndex: number
  status: PageStatus
  title: string
  description: string
  prefix: string
}

export enum PageStatus {
  New = 0,
  Working = 1,
  Completed = 2,
  Skipped = 3,
}
