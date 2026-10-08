import {
  cookieToPalette,
  paletteToTheme,
} from '#shared/palette'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    const cookie = parseCookies(event)
    const palette = cookieToPalette(cookie?.settings)
    const theme = paletteToTheme(palette)
    html.htmlAttrs.push(` class="${theme}" data-palette="${palette}"`)
  })
})
