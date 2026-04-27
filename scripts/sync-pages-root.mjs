import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const distIndex = resolve(root, "dist/src/index.template.html")
const distRootIndex = resolve(root, "dist/index.html")
const rootIndex = resolve(root, "index.html")
const distAssets = resolve(root, "dist/assets")
const rootAssets = resolve(root, "assets")

if (!existsSync(distIndex)) {
  throw new Error(`Missing built index at ${distIndex}`)
}

rmSync(rootAssets, { recursive: true, force: true })
mkdirSync(rootAssets, { recursive: true })
cpSync(distAssets, rootAssets, { recursive: true })
cpSync(distIndex, rootIndex)
cpSync(distIndex, distRootIndex)
