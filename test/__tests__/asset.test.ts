import { readFileSync } from 'fs'
import { join } from 'path'

test('loads svg asset', () => {
  const file = join(process.cwd(), 'apps/web/public/vercel.svg')
  const contents = readFileSync(file, 'utf8')
  expect(contents.startsWith('<svg')).toBe(true)
})
