import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  // Get query parameters
  const query = getQuery(event)
  const token = query.token as string
  const filename = query.file as string

  if (!token || !filename) {
    return { error: 'Both token and filename are required' }
  }

  // Store token in cookie with name = filename
  setCookie(event, filename, token, {
    httpOnly: false, // set true if you don't want JS access
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })

  return sendRedirect(event, `/?highlight=${filename}`)
})

// http://localhost:3000/api/verify?file=silly-billy-theme.webm&token=ULvT0SJFUKRbUEEO
// localhost:3000/api/verify?file=braun.png&token=KSYb1YF0TVpGbU96
