export interface Sense {
  tags: Tag[]
  value: string|null
  readonly examples: Example[]|null
  references: Reference[]|null
  loanSources: LoanSource[]|null
  isRare: boolean
}
