import type { Axios } from 'axios'
import { BasicRest } from '../basic-rest'

import type { EditList, Compare } from './types'

export class EditsRest extends BasicRest {
  list(props: { n: number; p: number; statuses: number[] }) {
    return this.extractData(this.#endpoint.get<EditList>('edits', { params: props }))
  }

  compare(props: { id: number }) {
    return this.extractData(this.#endpoint.get<Compare>(`edits/${props.id}/compare`))
  }

  byEntry(props: { wid: string }) {
    return this.extractData(this.#endpoint.get<EditList>(`edits/by-entry/0/${props.wid}`))
  }

  constructor(endpoint: Axios) {
    super()

    this.#endpoint = endpoint
  }

  #endpoint
}