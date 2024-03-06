export interface Reference {
  value: string|null
  target: string|null
  /** синоним | частичный синоним | антоним | сравни | сокращение от */
  referenceType: 0|1|2|3|4
}
