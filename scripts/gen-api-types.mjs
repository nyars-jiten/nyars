// Генерация типов API из OpenAPI-схемы бэкенда.
//
//   bun run api:types                                  — из docs/swagger.yaml
//   bun run api:types ../nyars-backend/docs/swagger.yaml — из файла в репозитории бэкенда
//                                                        (схема копируется в docs/swagger.yaml)
//   API_SCHEMA=<путь> bun run api:types                — то же через переменную окружения
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'
import openapiTS, { astToString } from 'openapi-typescript'

const root = resolve(import.meta.dirname, '..')
const local = resolve(root, 'docs/swagger.yaml')
const source = resolve(process.argv[2] || process.env.API_SCHEMA || local)
const out = resolve(root, 'app/generated/api.ts')

if (!existsSync(source)) {
  console.error(`Схема не найдена: ${source}`)
  process.exit(1)
}

if (source !== local) {
  copyFileSync(source, local)
  console.log(`Схема скопирована в docs/swagger.yaml`)
}

const ast = await openapiTS(pathToFileURL(local))
const header = `/**
 * Сгенерировано из docs/swagger.yaml — не править вручную.
 * Обновление: bun run api:types [путь/до/swagger.yaml]
 */

`
mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, header + astToString(ast))
console.log(`Типы записаны в app/generated/api.ts`)
