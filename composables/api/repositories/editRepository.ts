import { useApiFetch } from '../apiFetch'

export const useEditRepository = () => {
  const path = '/Edits'
  const fetch = useApiFetch()

  const getEdits = (number = 25, page = 0, statuses: number|null = null): Promise<Edit[]> => {
    return fetch<Edit[]>(path, {
      params: {
        n: number,
        p: page,
        statuses
      }
    })
  }

  const getCompare = (editId: number): Promise<EditCompare> => {
    return fetch<EditCompare>(`${path}/${editId}/compare`)
  }

  return { getEdits, getCompare }
}
