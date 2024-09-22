export interface PitchAccent {
  word: string | null
  clearWord: string | null
  num: number | null
  nasal: number | null
  devoice: number | null
  readonly multiPitch: string | null
  readonly resNum: string | null
  readonly renders: PitchAccentRender[] | null
}
