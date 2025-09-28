// codeGenerator.js
import crypto from 'node:crypto'

export function generateSecureCode(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const bytes = crypto.randomBytes(length)
  return Array.from(bytes, b => chars[b % chars.length]).join('')
}

const code = generateSecureCode(16)
console.log(code)
