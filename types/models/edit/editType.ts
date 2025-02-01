import { z } from 'zod'

export enum EditType {
  None,
  Create,
  Edit,
  Delete,
  Transfer,
  Revert,
}

export const EditTypeSchema = z.nativeEnum(EditType)
