import { rusPluralRule } from './rus-plural-rule'

export default defineI18nConfig(() => ({
  legacy: false,
  warnHtmlMessage: false,
  warnHtmlInMessage: 'off',
  pluralRules: {
    ru: rusPluralRule,
  },
}))
