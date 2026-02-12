#!/usr/bin/env node

/**
 * Bump the semantic version and update vercel.json rewrite.
 *
 * Usage:
 *   node scripts/bump-version.mjs <level>
 *
 * Examples:
 *   node scripts/bump-version.mjs patch   → 1.0.0 → 1.0.1
 *   node scripts/bump-version.mjs minor   → 1.0.0 → 1.1.0
 *   node scripts/bump-version.mjs major   → 1.0.0 → 2.0.0
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectDir = resolve(__dirname, '..')

const [, , level = 'patch'] = process.argv

if (!['patch', 'minor', 'major'].includes(level)) {
  console.error('❌ Usage: node scripts/bump-version.mjs <patch|minor|major>')
  process.exit(1)
}

// --- 1. Read current version ---
const pkgPath = resolve(projectDir, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
const currentVersion = pkg.version
const [major, minor, patch] = currentVersion.split('.').map(Number)

// --- 2. Bump version ---
let newVersion
switch (level) {
  case 'major':
    newVersion = `${major + 1}.0.0`
    break
  case 'minor':
    newVersion = `${major}.${minor + 1}.0`
    break
  case 'patch':
  default:
    newVersion = `${major}.${minor}.${patch + 1}`
    break
}

// --- 3. Update package.json ---
pkg.version = newVersion
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
console.log(`📦 package.json: ${currentVersion} → ${newVersion}`)

// --- 4. Update vercel.json rewrite ---
const vercelPath = resolve(projectDir, 'vercel.json')
try {
  const vercelConfig = JSON.parse(readFileSync(vercelPath, 'utf-8'))

  if (vercelConfig.rewrites) {
    for (const rewrite of vercelConfig.rewrites) {
      if (rewrite.source?.includes('/latest/')) {
        const oldDest = rewrite.destination
        rewrite.destination = `/v${newVersion}/$1`
        console.log(`🔄 vercel.json rewrite: ${oldDest} → ${rewrite.destination}`)
      }
    }
    writeFileSync(vercelPath, JSON.stringify(vercelConfig, null, 2) + '\n')
  }
} catch {
  console.warn('⚠️  No vercel.json found, skipping rewrite update')
}

console.log(`\n✅ Done! Version bumped to v${newVersion}`)
console.log(`\nNext steps:`)
console.log(`  1. git add package.json vercel.json`)
console.log(`  2. git commit -m "chore: bump to v${newVersion}"`)
console.log(`  3. git push → CI/CD will deploy automatically`)
