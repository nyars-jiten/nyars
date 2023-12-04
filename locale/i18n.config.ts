import ru from './ru.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    ru
  }
}))
