export const useAvatar = (img: string) => {
  const config = useRuntimeConfig()

  return new URL(img, config.public.imageUrl)
}
