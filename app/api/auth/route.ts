import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const provider = searchParams.get('provider')
  
  if (provider !== 'github') {
    return NextResponse.json({ error: 'Only GitHub provider is supported' }, { status: 400 })
  }

  // GitHub OAuth URL
  const clientId = process.env.GITHUB_CLIENT_ID
  const redirectUri = `http://localhost:3001/api/auth/callback`
  const scope = 'repo,user'
  const state = Math.random().toString(36).substring(7)
  
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${state}`
  
  // Redirect to GitHub OAuth
  return NextResponse.redirect(authUrl)
}
