import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// GET - Read file content
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const filePath = searchParams.get('path')

  if (!filePath) {
    return NextResponse.json({ error: 'File path is required' }, { status: 400 })
  }

  try {
    // Security check - only allow files in content directory
    if (!filePath.startsWith('content/')) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const fullPath = path.join(process.cwd(), filePath)
    const content = await fs.readFile(fullPath, 'utf8')
    
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  } catch (error) {
    console.error('Error reading file:', error)
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Write file content
export async function POST(request: NextRequest) {
  try {
    const { path: filePath, content } = await request.json()

    if (!filePath || content === undefined) {
      return NextResponse.json({ error: 'Path and content are required' }, { status: 400 })
    }

    // Security check - only allow files in content directory
    if (!filePath.startsWith('content/')) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const fullPath = path.join(process.cwd(), filePath)
    
    // Ensure the directory exists
    const dir = path.dirname(fullPath)
    await fs.mkdir(dir, { recursive: true })
    
    // Write the file
    await fs.writeFile(fullPath, content, 'utf8')
    
    return NextResponse.json({ success: true, message: 'File saved successfully' })
  } catch (error) {
    console.error('Error writing file:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
