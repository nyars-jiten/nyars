import type { GoogleProposals } from './types/google-proposals'
import type { Handwriting } from './types/handwriting'

export class Null implements Handwriting {
  onStart(_: MouseEvent | TouchEvent) {
    return undefined
  }

  onEnd() {
    return undefined
  }

  onDraw(_: MouseEvent | TouchEvent) {
    return undefined
  }

  onResize(_?: FocusEvent) {
    return undefined
  }

  getProposals(): Promise<GoogleProposals> {
    return Promise.resolve<GoogleProposals>(['SUCCESS', [['', []]]])
  }

  undo() {
    return Promise.resolve()
  }

  clear() {
    return undefined
  }

  step = 0
  minLineWidth = 0
  maxLineWidth = 0
  lineWidth = 0
  inAction = true
}
