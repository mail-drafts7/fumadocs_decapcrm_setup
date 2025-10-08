'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface DocFile {
  name: string
  path: string
  content?: string
  lastModified?: string
}

export default function CollectionsDocsPage() {
  const [docFiles, setDocFiles] = useState<DocFile[]>([])
  const [selectedFile, setSelectedFile] = useState<DocFile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const authData = localStorage.getItem('decap-cms-auth')
    if (authData) {
      setIsAuthenticated(true)
      loadDocFiles()
    } else {
      setIsAuthenticated(false)
    }
    setLoading(false)
  }, [])

  const loadDocFiles = async () => {
    try {
      // Load the existing doc files
      const files: DocFile[] = [
        { name: 'API Contract', path: 'content/docs/api-contract.mdx' },
        { name: 'Getting Started', path: 'content/docs/getting-started.mdx' },
        { name: 'Testing', path: 'content/docs/testing.mdx' }
      ]
      setDocFiles(files)
    } catch (error) {
      console.error('Error loading doc files:', error)
    }
  }

  const loadFileContent = async (file: DocFile) => {
    try {
      const response = await fetch(`/api/docs/content?path=${encodeURIComponent(file.path)}`)
      if (response.ok) {
        const content = await response.text()
        const updatedFile = { ...file, content }
        setSelectedFile(updatedFile)
        setEditContent(content)
      }
    } catch (error) {
      console.error('Error loading file content:', error)
    }
  }

  const saveFileContent = async () => {
    if (!selectedFile) return

    try {
      const response = await fetch('/api/docs/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: selectedFile.path,
          content: editContent
        })
      })

      if (response.ok) {
        setSelectedFile({ ...selectedFile, content: editContent })
        setIsEditing(false)
        alert('File saved successfully!')
      } else {
        alert('Error saving file')
      }
    } catch (error) {
      console.error('Error saving file:', error)
      alert('Error saving file')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">
            You need to be authenticated to access the documentation CRM.
          </p>
          <Link 
            href="/api/auth"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Login with GitHub
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Documentation CRM</h1>
              <span className="ml-3 text-sm text-gray-500">Collections / Docs</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                CMS Admin
              </Link>
              <Link 
                href="/" 
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* File List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Documentation Files</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {docFiles.map((file, index) => (
                  <button
                    key={index}
                    onClick={() => loadFileContent(file)}
                    className={`w-full px-6 py-4 text-left hover:bg-gray-50 transition duration-150 ease-in-out ${
                      selectedFile?.path === file.path ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{file.name}</h3>
                        <p className="text-xs text-gray-500">{file.path}</p>
                      </div>
                      <div className="text-xs text-gray-400">
                        📄
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* File Content Viewer/Editor */}
          <div className="lg:col-span-2">
            {selectedFile ? (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{selectedFile.name}</h2>
                    <p className="text-sm text-gray-500">{selectedFile.path}</p>
                  </div>
                  <div className="flex space-x-2">
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                      >
                        Edit
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={saveFileContent}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false)
                            setEditContent(selectedFile.content || '')
                          }}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  {isEditing ? (
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full h-96 p-4 border border-gray-300 rounded-md font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Edit your content here..."
                    />
                  ) : (
                    <div className="prose max-w-none">
                      {selectedFile.content ? (
                        <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-md overflow-x-auto">
                          {selectedFile.content}
                        </pre>
                      ) : (
                        <div className="text-center text-gray-500 py-8">
                          <div className="text-4xl mb-4">📄</div>
                          <p>Loading file content...</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-16 text-center">
                  <div className="text-6xl mb-4">📚</div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Select a Documentation File</h2>
                  <p className="text-gray-600">
                    Choose a file from the list on the left to view and edit its content.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
