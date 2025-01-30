import type { GoogleProposals } from './google-proposals'

export interface Handwriting {
  onStart: (e: MouseEvent | TouchEvent) => void
  onEnd: () => void
  onDraw: (e: MouseEvent | TouchEvent) => void
  onResize: (e?: FocusEvent) => void

  getProposals: () => Promise<GoogleProposals>
  undo: () => Promise<void>
  clear: () => void

  step: number
  minLineWidth: number
  maxLineWidth: number
  lineWidth: number
  inAction: boolean
}
