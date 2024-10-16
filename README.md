# NYARS THE DICTIONARY

[![Discord](https://img.shields.io/discord/564319699152666624?style=for-the-badge&label=Discord%20server)](https://discord.gg/u7H5nsPWVB)

![Downdetector](https://img.shields.io/website?style=for-the-badge&url=https%3A%2F%2Fnyars.org%2F)

## Development

Make sure to use an even numbered version of Node.js (18, 20, etc.)

##### Check Node.js version:

```bash
$ node --version
```

##### DevTools (in the browser):

press `Shift + Alt + D` in the browser

##### Installation:

```bash
$ pnpm i
```
##### Dev server:

```bash
$ pnpm dev
```

##### After run dev server:

| What            | Url                              |
|-----------------|----------------------------------|
| main page       | http://localhost:8080/           |
| tailwind styles | http://localhost:8080/_tailwind/ |

##### Upgrade:

```properties
$ npx nuxi upgrade --force
```

##### Check ts errors:

```properties
$ npx nuxi typecheck
```

##### View current eslint rules:

```properties
$ npx @eslint/config-inspector
```

<details>
  <summary>Possible problems:</summary>
  
  #### Cannot find name 'defineNuxtConfig'.ts(2304)

  Delete the `node_modules` folder and do:
  
  ```bash
  $ pnpm i
  ```
  Then `F1 + Volar: Restart Vue server`

  #### [Vue Router warn]: No match found for location with path "/_tailwind/"
  
  Probably just ignore this for now, tailwind viewer page still works fine with this warning, but impossible view this page from nuxt devtools ("404 not found"). Check this [issue](https://github.com/nuxt-modules/tailwindcss/issues/459).

  #### Autoimports don't have IDE support

  Run `npx nuxi prepare`

  Or run project (`pnpm dev`) and then run `Developer: Reload Window`

</details>

<details>
  <summary>Wiki:</summary>

  #### Why isn't Prettier on the repo?
  
  Because of this: [issue](https://github.com/prettier/prettier-vscode/issues/352)
  
  Because Prettier is adding a lot of dependencies: `"prettier"`, `"eslint-plugin-prettier"`, `"eslint-config-prettier"`
  
  Because Prettier conflicts with another eslint plugins.
  
  Because all Prettier settings available in eslint plugins.
  
  Because antfu don't use Prettier: [link](https://antfu.me/posts/why-not-prettier)

  #### How to use icons? :trollface:

  Find the icons you want and download as an svg file from [here](https://icon-sets.iconify.design/)

  Then add file to the folder `assets/icons`

  After all you can use it (default behavior as font)
  
  ```html
  <IconMagnify class="text-3xl !m-1" /> <!-- icon as font, if need change margin use !important -->
  <IconMagnify class="h-5 w-5" :font-controlled="false" /> <!-- icon as normal svg -->
  ```

  #### Why pages on dev server is very slow?

  Because lodash loads all functions, see this [issue](https://github.com/cipami/nuxt-lodash/issues/53). On production mode this problem does not exist.

</details>

```
⡏⠉⠉⠉⠉⠉⠉⠋⠉⠉⠉⠉⠉⠉⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠙⠉⠉⠉⠹
⡇⢸⣿⡟⠛⢿⣷⠀⢸⣿⡟⠛⢿⣷⡄⢸⣿⡇⠀⢸⣿⡇⢸⣿⡇⠀⢸⣿⡇⠀
⡇⢸⣿⣧⣤⣾⠿⠀⢸⣿⣇⣀⣸⡿⠃⢸⣿⡇⠀⢸⣿⡇⢸⣿⣇⣀⣸⣿⡇⠀
⡇⢸⣿⡏⠉⢹⣿⡆⢸⣿⡟⠛⢻⣷⡄⢸⣿⡇⠀⢸⣿⡇⢸⣿⡏⠉⢹⣿⡇⠀
⡇⢸⣿⣧⣤⣼⡿⠃⢸⣿⡇⠀⢸⣿⡇⠸⣿⣧⣤⣼⡿⠁⢸⣿⡇⠀⢸⣿⡇⠀
⣇⣀⣀⣀⣀⣀⣀⣄⣀⣀⣀⣀⣀⣀⣀⣠⣀⡈⠉⣁⣀⣄⣀⣀⣀⣠⣀⣀⣀⣰
⣇⣿⠘⣿⣿⣿⡿⡿⣟⣟⢟⢟⢝⠵⡝⣿⡿⢂⣼⣿⣷⣌⠩⡫⡻⣝⠹⢿⣿⣷
⡆⣿⣆⠱⣝⡵⣝⢅⠙⣿⢕⢕⢕⢕⢝⣥⢒⠅⣿⣿⣿⡿⣳⣌⠪⡪⣡⢑⢝⣇
⡆⣿⣿⣦⠹⣳⣳⣕⢅⠈⢗⢕⢕⢕⢕⢕⢈⢆⠟⠋⠉⠁⠉⠉⠁⠈⠼⢐⢕⢽
⡗⢰⣶⣶⣦⣝⢝⢕⢕⠅⡆⢕⢕⢕⢕⢕⣴⠏⣠⡶⠛⡉⡉⡛⢶⣦⡀⠐⣕⢕
⡝⡄⢻⢟⣿⣿⣷⣕⣕⣅⣿⣔⣕⣵⣵⣿⣿⢠⣿⢠⣮⡈⣌⠨⠅⠹⣷⡀⢱⢕
⡝⡵⠟⠈⢀⣀⣀⡀⠉⢿⣿⣿⣿⣿⣿⣿⣿⣼⣿⢈⡋⠴⢿⡟⣡⡇⣿⡇⡀⢕
⡝⠁⣠⣾⠟⡉⡉⡉⠻⣦⣻⣿⣿⣿⣿⣿⣿⣿⣿⣧⠸⣿⣦⣥⣿⡇⡿⣰⢗⢄
⠁⢰⣿⡏⣴⣌⠈⣌⠡⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣬⣉⣉⣁⣄⢖⢕⢕⢕
⡀⢻⣿⡇⢙⠁⠴⢿⡟⣡⡆⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣵⣵⣿
⡻⣄⣻⣿⣌⠘⢿⣷⣥⣿⠇⣿⣿⣿⣿⣿⣿⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣷⢄⠻⣿⣟⠿⠦⠍⠉⣡⣾⣿⣿⣿⣿⣿⣿⢸⣿⣦⠙⣿⣿⣿⣿⣿⣿⣿⣿⠟
⡕⡑⣑⣈⣻⢗⢟⢞⢝⣻⣿⣿⣿⣿⣿⣿⣿⠸⣿⠿⠃⣿⣿⣿⣿⣿⣿⡿⠁⣠
⡝⡵⡈⢟⢕⢕⢕⢕⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣿⣿⣿⣿⣿⠿⠋⣀⣈⠙
⡝⡵⡕⡀⠑⠳⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⢉⡠⡲⡫⡪⡪⡣
```
