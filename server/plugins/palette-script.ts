// Без cookie `palette` (пользователь тему не выбирал) тема берётся по системной ещё до отрисовки,
// чтобы страница не мигала. Скрипт вставляется в <head> на сервере, мимо Vue, иначе гидрация ругается.
const SCRIPT = `<script>(function(){try{if(/(?:^|; )palette=(rice|sumi|kanagawa)/.test(document.cookie))return;var l=matchMedia('(prefers-color-scheme: light)').matches,h=document.documentElement;h.setAttribute('data-theme',l?'rice':'sumi');h.className=l?'light':'dark'}catch(e){}})()</script>`

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:html', (html) => {
    html.head.unshift(SCRIPT)
  })
})
