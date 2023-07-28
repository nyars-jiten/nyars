import type { Axios } from 'axios'
import { BasicRest } from '../basic-rest'

import type { Dicts } from './types'

export type ImageEntry = {
  link: string
  title: string
}

export type ImageList = ImageEntry[]

export class KotobaRest extends BasicRest {
  dicts() {
    return this.extractData(this.#endpoint.get<Dicts>('kotoba/get-dictionaries'))
  }

  entryImages(props: { wid: string }) {
    return this.extractData(
      this.#endpoint.get<ImageList>('kotoba/entry-images', {
        params: { id: props.wid, dict: 0 }
      })
    )
  }

  constructor(endpoint: Axios) {
    super()

    this.#endpoint = endpoint
  }

  #endpoint
}
