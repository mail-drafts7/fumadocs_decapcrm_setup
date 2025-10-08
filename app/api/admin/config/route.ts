import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(request: NextRequest) {
  try {
    const configPath = join(process.cwd(), 'public', 'admin', 'config.yml')
    const configContent = await readFile(configPath, 'utf-8')
    
    return new NextResponse(configContent, {
      headers: {
        'Content-Type': 'text/yaml',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('Error loading config.yml:', error)
    return NextResponse.json({ error: 'Config file not found' }, { status: 404 })
  }
}
