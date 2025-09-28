import crypto from 'node:crypto'
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  const { filename } = event.context.params as { filename: string }

  // 🚨 Basic filename validation
  if (!filename || filename.includes('..') || filename.includes('/')) {
    return createError({ statusCode: 400, statusMessage: 'Invalid filename' })
  }

  const filePath = join(process.env.ARCHIVE_PATH ? process.env.ARCHIVE_PATH : 'app/files', filename)
  const tokenPath = `${filePath}.token`

  try {
    const stats = statSync(filePath)
    if (!stats.isFile())
      throw new Error('Not a file')

    // Check if token file exists
    if (existsSync(tokenPath)) {
      const expectedToken = readFileSync(tokenPath, 'utf-8').trim()
      const providedToken = getCookie(event, filename)

      if (!providedToken || providedToken !== expectedToken) {
        return createError({ statusCode: 403, statusMessage: 'Invalid or missing token' })
      }
    }

    // Generate ETag
    const etag = crypto
      .createHash('md5')
      .update(`${stats.mtimeMs}-${stats.size}`)
      .digest('hex')

    // Handle If-None-Match
    const ifNoneMatch = getHeader(event, 'if-none-match')
    if (ifNoneMatch === etag) {
      event.node.res.statusCode = 304
      return
    }

    // Set headers
    setHeader(event, 'Cache-Control', 'public, max-age=3600')
    setHeader(event, 'ETag', etag)
    setHeader(event, 'Content-Type', getMimeType(filename))

    return createReadStream(filePath)
  } catch (err) {
    return createError({ statusCode: 404, statusMessage: 'File not found' })
  }
})

// Simple MIME helper
function getMimeType(name: string) {
  if (name.endsWith('.txt'))
    return 'text/plain'
  if (name.endsWith('.jpg'))
    return 'image/jpeg'
  if (name.endsWith('.png'))
    return 'image/png'
  if (name.endsWith('.json'))
    return 'application/json'
  return 'application/octet-stream'
}
