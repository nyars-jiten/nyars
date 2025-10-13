export function useAvatar(img: string) {
  const config = useRuntimeConfig()

  return new URL(`/static/avatar/${img}`, config.public.imageUrl)
}
