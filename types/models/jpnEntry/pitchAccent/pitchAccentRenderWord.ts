export interface PitchAccentRenderWord {
  char: string | null
  pitch: string | null
  nextPitch: string | null
  nasal: boolean
  devoice: boolean
  pos: number
}
