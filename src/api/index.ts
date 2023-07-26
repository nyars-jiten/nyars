import axios from 'axios'

import { BasicRest } from './basic-rest'
import { EditsRest } from './edits-rest'
import { KotobaRest } from './kotoba-rest'
import { SearchRest } from './search-rest'
import { StatisticsRest } from './statistics-rest'
import { UsersRest } from './users-rest'

import { type EntryJp } from './dictionary/jp/types'
import { type EntryKanji } from './dictionary/kanji/types'
import { type UserList } from './types'

type SatelliteValue = {
  title: string
  lang: 'eng' | 'rus' | 'jap'
}

export type SatelliteEntry = {
  body: string
  key: number
  satellite: SatelliteValue
}

export type SatelliteList = SatelliteEntry[]

export const api = new (class extends BasicRest {
  readonly statistics
  readonly search
  readonly kotoba
  readonly users
  readonly edits

  dictionaryJpEntries(props: { wid: string }) {
    return this.extractData(this.#endpoint.get<EntryJp>(`dictionary/jap/entries/${props.wid}`))
  }

  dictionaryJpBestUsers() {
    return this.extractData(this.#endpoint.get<UserList>('/dictionary/jap/stats-user'))
  }

  dictionaryKanjiEntries(props: { kid: string }) {
    return this.extractData(this.#endpoint.get<EntryKanji>(`dictionary/kanji/entries/${props.kid}`))
  }

  satellites(props: { wid: string }) {
    return this.extractData(this.#endpoint.get<SatelliteList>(`/satellites/${props.wid}`))
  }

  constructor() {
    super()

    this.#endpoint = axios.create({ baseURL: import.meta.env.VITE_API_URL })

    this.statistics = new StatisticsRest()
    this.search = new SearchRest(this.#endpoint)
    this.kotoba = new KotobaRest(this.#endpoint)
    this.users = new UsersRest()
    this.edits = new EditsRest(this.#endpoint)
  }

  #endpoint
})()
