export interface LLMValue {
  canonical_translation: string
  japanese_forms: string[]
  gloss: string
  examples: LLMExample[]
  collocations: string[]
  domain_register: string
  grammatical_note: string
  sources: LLMSource[]
  raw_evidence: string
  confidence: number
}

export interface LLMExample {
  ja: string
  ru: string
  source_id: number
}

export interface LLMSource {
  source_id: number
  fragment: string
}

export interface LLMConflict {
  issue: string
  sources: string[]
  recommendation: string
}

export interface LLMEntry {
  word: string
  pos_hint: string
  values: LLMValue[]
  conflicts: LLMConflict[]
  model: string
}

export interface LLMStoredResponse {
  id: string
  wid: string
  model: string
  body: LLMEntry
  msg: string
  status: LLMStatus
  created_at: string
  updated_at: string
  requested_by: string
  sources: Record<number, string>
}

export enum LLMStatus {
  PENDING,
  PROCESSING,
  COMPLETED,
  FAILED,
}
