export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    const cookie = parseCookies(event)
    if (cookie?.settings === '1') {
      html.htmlAttrs.push(' class="dark"')
    } else {
      html.htmlAttrs.push(' class="light"')
    }
  })
})
