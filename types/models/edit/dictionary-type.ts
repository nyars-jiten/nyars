import { z } from 'zod'

export enum DictionaryType {
  Jpn,
  Rus,
  Kanji,
  Name,
  JpnAuto,
  Example,
}

export const ZodDictionaryType = z.nativeEnum(DictionaryType)
