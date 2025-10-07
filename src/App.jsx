import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function App({ isDarkMode, toggleTheme, currentPage = 'getting-started' }) {
  const navigate = useNavigate()
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [activeSection, setActiveSection] = useState('')
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const goToAdmin = () => {
    navigate('/admin')
  }

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }

  const handleNavClick = (page) => {
    switch(page) {
      case 'getting-started':
        navigate('/gettingstarted')
        break
      case 'testing':
        navigate('/testing')
        break
      case 'api-contract':
        navigate('/apicontract')
        break
      default:
        navigate('/')
    }
  }

  const handleTocClick = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(sectionId)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('h2[id], h3[id]')
      let currentSection = ''

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100) {
          currentSection = section.id
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    // Set initial active section
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentPage])

  // Reset active section when page changes
  useEffect(() => {
    const firstSection = document.querySelector('h2[id]')
    if (firstSection) {
      setActiveSection(firstSection.id)
    }
  }, [currentPage])

  // Search functionality
  const toggleSearch = () => {
    setSearchVisible(!searchVisible)
    if (!searchVisible) {
      setSearchQuery('')
      setSearchResults([])
    }
  }

  const handleSearchInput = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (query.trim()) {
      performSearch(query)
    } else {
      setSearchResults([])
    }
  }

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      setSearchVisible(false)
      setSearchQuery('')
      setSearchResults([])
    }
  }

  const performSearch = (query) => {
    // Mock search results based on current page content
    const allContent = {
      'getting-started': [
        { title: 'Getting Started', content: 'Knowledge Pack provides a comprehensive documentation platform', section: 'introduction' },
        { title: 'Quick Setup', content: 'Follow these steps to get started', section: 'quick-setup' },
        { title: 'Prerequisites', content: 'Node.js 16+ installed, Basic knowledge of React', section: 'prerequisites' },
        { title: 'Installation', content: 'npm install @knowledgepack/core', section: 'installation' },
        { title: 'Configuration', content: 'Configure your Knowledge Pack settings', section: 'configuration' }
      ],
      'testing': [
        { title: 'Testing Framework Overview', content: 'Testing framework overview and strategies', section: 'testing-framework' },
        { title: 'Testing Types', content: 'Unit testing, Integration testing, End-to-end testing', section: 'testing-types' },
        { title: 'Unit Testing', content: 'Test individual components and functions in isolation', section: 'unit-testing' },
        { title: 'Integration Testing', content: 'Verify how different parts work together', section: 'integration-testing' },
        { title: 'End-to-End Testing', content: 'Test complete user workflows using Playwright or Cypress', section: 'e2e-testing' },
        { title: 'Testing Tools & Setup', content: 'Jest, React Testing Library, Playwright, MSW', section: 'testing-tools' },
        { title: 'Performance Testing', content: 'Lighthouse CI, Bundle size analysis, Core Web Vitals', section: 'performance-testing' },
        { title: 'Best Practices', content: 'Test-Driven Development, Descriptive Names, Isolated Tests', section: 'best-practices' }
      ],
      'api-contract': [
        { title: 'API Overview', content: 'RESTful API for documentation management', section: 'api-overview' },
        { title: 'Authentication', content: 'Bearer tokens for API authentication', section: 'authentication' },
        { title: 'Response Format', content: 'Consistent JSON structure for responses', section: 'response-format' },
        { title: 'Core Endpoints', content: 'Documents API, Search API endpoints', section: 'core-endpoints' },
        { title: 'Documents API', content: 'CRUD operations for documents', section: 'documents-api' },
        { title: 'Search API', content: 'Search functionality with filtering', section: 'search-api' },
        { title: 'Error Codes', content: 'HTTP status codes and error handling', section: 'error-codes' },
        { title: 'Webhooks', content: 'Real-time events and notifications', section: 'webhooks' },
        { title: 'SDK & Libraries', content: 'Official SDKs for popular languages', section: 'sdk-libraries' },
        { title: 'Example Integration', content: 'JavaScript integration examples', section: 'example-integration' }
      ]
    }

    const searchInAllPages = Object.values(allContent).flat()
    const results = searchInAllPages.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase())
    )
    
    setSearchResults(results)
  }

  const handleSearchResultClick = (result) => {
    // Navigate to page and section if needed
    setSearchVisible(false)
    setSearchQuery('')
    setSearchResults([])
    
    // Scroll to section if on same page, otherwise navigate
    const element = document.getElementById(result.section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(result.section)
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggleSearch()
      }
      
      // Escape to close search
      if (e.key === 'Escape' && searchVisible) {
        setSearchVisible(false)
        setSearchQuery('')
        setSearchResults([])
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [searchVisible])

  const renderContent = () => {
    switch(currentPage) {
      case 'getting-started':
        return (
          <div>
            <h1 className="article-title">Getting Started</h1>
            <p className="article-subtitle">Welcome to Knowledge Pack</p>
            <div className="content-body">
              <h2 id="quick-setup">Quick Setup</h2>
              <p>Knowledge Pack provides a comprehensive documentation platform for your projects. Follow these steps to get started:</p>
              <ol>
                <li>Install the required dependencies</li>
                <li>Configure your project settings</li>
                <li>Start writing your documentation</li>
              </ol>
              <h2 id="prerequisites">Prerequisites</h2>
              <ul>
                <li>Node.js 16+ installed</li>
                <li>Basic knowledge of React</li>
                <li>Text editor of your choice</li>
              </ul>
              <h2 id="installation">Installation</h2>
              <p>Run the following command to install Knowledge Pack:</p>
              <pre><code>npm install @knowledgepack/core</code></pre>
              <h2 id="configuration">Configuration</h2>
              <p>Configure your Knowledge Pack settings in the config file.</p>
            </div>
          </div>
        )
      case 'testing':
        return (
          <div>
            <h1 className="article-title">Testing</h1>
            <p className="article-subtitle">Comprehensive testing strategies for your Knowledge Pack implementation</p>
            <div className="content-body">
              <h2 id="testing-framework">🧪 Testing Framework Overview</h2>
              <p>Knowledge Pack integrates seamlessly with modern testing frameworks to ensure your documentation platform is robust, reliable, and user-friendly. Our testing approach covers all aspects from component-level validation to full user journey testing.</p>
              
              <h2 id="testing-types">📋 Testing Types</h2>
              
              <h3 id="unit-testing">Unit Testing</h3>
              <p>Test individual components and functions in isolation:</p>
              <pre><code>{`// Example: Testing navigation component
import { render, screen, fireEvent } from '@testing-library/react'
import { NavigationMenu } from './NavigationMenu'

test('should navigate to correct page when menu item clicked', () => {
  const mockNavigate = jest.fn()
  render(<NavigationMenu onNavigate={mockNavigate} />)
  
  fireEvent.click(screen.getByText('API Contract'))
  expect(mockNavigate).toHaveBeenCalledWith('/apicontract')
})`}</code></pre>
              
              <h3 id="integration-testing">Integration Testing</h3>
              <p>Verify how different parts of your documentation system work together:</p>
              <ul>
                <li>Search functionality with content indexing</li>
                <li>Theme switching across components</li>
                <li>Navigation state management</li>
                <li>Content rendering with markdown processing</li>
              </ul>
              
              <h3 id="e2e-testing">End-to-End Testing</h3>
              <p>Test complete user workflows using tools like Playwright or Cypress:</p>
              <pre><code>{`// Example E2E test
test('complete documentation browsing flow', async ({ page }) => {
  await page.goto('/')
  await page.click('[data-testid="sidebar-toggle"]')
  await page.click('text=Testing')
  await expect(page).toHaveURL('/testing')
  await expect(page.locator('h1')).toContainText('Testing')
})`}</code></pre>
              
              <h2 id="testing-tools">🔧 Testing Tools & Setup</h2>
              <div className="content-highlight info">
                <h4>Recommended Testing Stack:</h4>
                <ul>
                  <li><strong>Jest</strong> - JavaScript testing framework</li>
                  <li><strong>React Testing Library</strong> - Component testing utilities</li>
                  <li><strong>Playwright</strong> - End-to-end testing</li>
                  <li><strong>MSW</strong> - API mocking for tests</li>
                </ul>
              </div>
              
              <h2 id="performance-testing">📈 Performance Testing</h2>
              <p>Ensure your documentation loads quickly and performs well:</p>
              <ul>
                <li>Lighthouse CI for performance metrics</li>
                <li>Bundle size analysis</li>
                <li>Core Web Vitals monitoring</li>
                <li>Accessibility testing with axe-core</li>
              </ul>
              
              <h2 id="best-practices">✅ Best Practices</h2>
              <div className="content-highlight success">
                <ul>
                  <li><strong>Test-Driven Development:</strong> Write tests before implementing features</li>
                  <li><strong>Descriptive Names:</strong> Use clear, descriptive test names that explain the expected behavior</li>
                  <li><strong>Isolated Tests:</strong> Each test should be independent and not rely on others</li>
                  <li><strong>Mock External Dependencies:</strong> Use mocks for API calls and external services</li>
                  <li><strong>Regular Test Reviews:</strong> Periodically review and update test coverage</li>
                </ul>
              </div>
            </div>
          </div>
        )
      case 'api-contract':
        return (
          <div>
            <h1 className="article-title">API Contract</h1>
            <p className="article-subtitle">Comprehensive API specifications and integration guidelines</p>
            <div className="content-body">
              <h2 id="api-overview">📋 API Overview</h2>
              <p>Knowledge Pack provides a robust RESTful API that enables seamless integration with your applications. Our API follows industry standards and provides comprehensive documentation management capabilities.</p>
              
              <div className="content-highlight info">
                <strong>Base URL:</strong> <code>https://api.knowledgepack.com/v1</code><br/>
                <strong>Content-Type:</strong> <code>application/json</code><br/>
                <strong>Rate Limit:</strong> 1000 requests per hour
              </div>
              
              <h2 id="authentication">🔐 Authentication</h2>
              <p>All API endpoints require authentication using Bearer tokens. Include your API key in the Authorization header:</p>
              <pre><code>{`Authorization: Bearer YOUR_API_KEY

// Example request
curl -H "Authorization: Bearer sk-1234567890abcdef" \\
     -H "Content-Type: application/json" \\
     https://api.knowledgepack.com/v1/documents`}</code></pre>
              
              <h2 id="response-format">📊 Response Format</h2>
              <p>All API responses follow a consistent JSON structure for predictable integration:</p>
              
              <h3>Successful Response</h3>
              <pre><code>{`{
  "success": true,
  "data": {
    "id": "doc_123456",
    "title": "Getting Started Guide",
    "content": "...",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T14:22:00Z"
  },
  "meta": {
    "total_count": 1,
    "page": 1,
    "per_page": 20
  }
}`}</code></pre>
              
              <h3>Error Response</h3>
              <pre><code>{`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "title",
        "message": "Title is required"
      }
    ]
  }
}`}</code></pre>
              
              <h2 id="core-endpoints">🚀 Core Endpoints</h2>
              
              <h3 id="documents-api">Documents API</h3>
              <div className="content-highlight">
                <p><strong>GET</strong> <code>/documents</code> - List all documents</p>
                <p><strong>GET</strong> <code>/documents/&#123;id&#125;</code> - Get a specific document</p>
                <p><strong>POST</strong> <code>/documents</code> - Create a new document</p>
                <p><strong>PUT</strong> <code>/documents/&#123;id&#125;</code> - Update a document</p>
                <p><strong>DELETE</strong> <code>/documents/&#123;id&#125;</code> - Delete a document</p>
              </div>
              
              <h3 id="search-api">Search API</h3>
              <pre><code>{`GET /search?q={query}&type={document_type}&limit={limit}

// Example response
{
  "success": true,
  "data": {
    "results": [
      {
        "id": "doc_123",
        "title": "API Testing Guide",
        "snippet": "Learn how to test APIs effectively...",
        "relevance_score": 0.95,
        "type": "documentation"
      }
    ],
    "total_results": 42,
    "search_time": "0.023s"
  }
}`}</code></pre>
              
              <h2 id="error-codes">⚠️ Error Codes & Status Codes</h2>
              <div className="content-highlight error">
                <h4>HTTP Status Codes:</h4>
                <ul>
                  <li><strong>200 OK</strong> - Request successful</li>
                  <li><strong>201 Created</strong> - Resource created successfully</li>
                  <li><strong>400 Bad Request</strong> - Invalid request parameters</li>
                  <li><strong>401 Unauthorized</strong> - Invalid or missing API key</li>
                  <li><strong>403 Forbidden</strong> - Insufficient permissions</li>
                  <li><strong>404 Not Found</strong> - Resource not found</li>
                  <li><strong>429 Too Many Requests</strong> - Rate limit exceeded</li>
                  <li><strong>500 Internal Server Error</strong> - Server error</li>
                </ul>
              </div>
              
              <h2 id="webhooks">🔄 Webhooks</h2>
              <p>Subscribe to real-time events in your Knowledge Pack:</p>
              <pre><code>{`// Webhook payload example
{
  "event": "document.updated",
  "timestamp": "2024-01-15T14:22:00Z",
  "data": {
    "document_id": "doc_123456",
    "title": "Updated Document Title",
    "updated_by": "user_789"
  }
}`}</code></pre>
              
              <h2 id="sdk-libraries">📚 SDK & Libraries</h2>
              <div className="content-highlight success">
                <p>Official SDKs available for popular programming languages:</p>
                <ul>
                  <li><strong>JavaScript/Node.js:</strong> <code>npm install @knowledgepack/api</code></li>
                  <li><strong>Python:</strong> <code>pip install knowledgepack</code></li>
                  <li><strong>PHP:</strong> <code>composer require knowledgepack/php-sdk</code></li>
                  <li><strong>Ruby:</strong> <code>gem install knowledgepack</code></li>
                </ul>
              </div>
              
              <h2 id="example-integration">🔧 Example Integration</h2>
              <pre><code>{`// JavaScript example
import { KnowledgePack } from '@knowledgepack/api'

const kp = new KnowledgePack('your-api-key')

// Create a new document
const document = await kp.documents.create({
  title: 'My New Guide',
  content: '# Welcome to my guide...',
  category: 'tutorials'
})

// Search documents
const results = await kp.search('API testing', {
  type: 'documentation',
  limit: 10
})

console.log('Found ' + results.total_results + ' results')`}</code></pre>
            </div>
          </div>
        )
      default:
        return (
          <div>
            <h1 className="article-title">Getting Started</h1>
            <p className="article-subtitle">Welcome to Knowledge Pack</p>
          </div>
        )
    }
  }

  return (
    <div className={`fumadocs-layout ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Floating Controls (when sidebar is hidden) */}
      {!sidebarVisible && (
        <div className="floating-controls">
          <button className="floating-btn" onClick={toggleSidebar}>
            ☰
          </button>
          <button className="floating-btn search-btn">
            🔍
          </button>
        </div>
      )}

      {/* Left Sidebar */}
      {sidebarVisible && (
        <div className="sidebar sidebar-visible">
          <div className="sidebar-header">
            <div className="logo-section">
              <span className="logo-text">Knowledge Pack</span>
            </div>
            <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
              📑
            </button>
          </div>
          
          <div className="search-container">
            <div className="search-wrapper" onClick={toggleSearch}>
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search"
                readOnly
              />
              <span className="search-shortcut">⌘ K</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section">
              <div className="nav-item expandable">
                <span className="nav-text">Introduction</span>
                <span className="expand-icon">▽</span>
              </div>
              
              <div className="nav-group">
                <div 
                  className={`nav-item ${currentPage === 'getting-started' ? 'active' : ''}`}
                  onClick={() => handleNavClick('getting-started')}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="nav-icon">🚀</span>
                  <span className="nav-text">Getting Started</span>
                </div>
                <div 
                  className={`nav-item ${currentPage === 'testing' ? 'active' : ''}`}
                  onClick={() => handleNavClick('testing')}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="nav-icon">🧪</span>
                  <span className="nav-text">Testing</span>
                </div>
                <div 
                  className={`nav-item ${currentPage === 'api-contract' ? 'active' : ''}`}
                  onClick={() => handleNavClick('api-contract')}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="nav-icon">📋</span>
                  <span className="nav-text">API Contract</span>
                </div>
              </div>
            </div>

            <div className="nav-section">
              <div className="nav-section-title">Writing</div>
              <div className="nav-item">
                <span className="nav-icon">🌲</span>
                <span className="nav-text">Page Slugs & Page Tree</span>
              </div>
              <div className="nav-item expandable">
                <span className="nav-icon">📝</span>
                <span className="nav-text">Markdown</span>
                <span className="expand-icon">▶</span>
              </div>
              <div className="nav-item">
                <span className="nav-icon">📄</span>
                <span className="nav-text">Content Management</span>
              </div>
              <div className="nav-item">
                <span className="nav-icon">🎨</span>
                <span className="nav-text">Styling Guide</span>
              </div>
            </div>
          </nav>
          
          <div className="sidebar-footer">
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button className="login-button" onClick={goToAdmin}>
              👤
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={`main-content ${sidebarVisible ? 'with-sidebar' : 'full-width'}`}>

        <article className="article-content">
          {renderContent()}
        </article>
      </main>

      {/* Right TOC */}
      {sidebarVisible && (
        <div className="toc-sidebar">
          <div className="toc-header">
            <span className="toc-icon">☰</span>
            <span className="toc-title">On this page</span>
          </div>
          <nav className="toc-nav">
            {currentPage === 'getting-started' && (
              <>
                <button 
                  onClick={() => handleTocClick('quick-setup')} 
                  className={`toc-link ${activeSection === 'quick-setup' ? 'active' : ''}`}
                >
                  Quick Setup
                </button>
                <button 
                  onClick={() => handleTocClick('prerequisites')} 
                  className={`toc-link ${activeSection === 'prerequisites' ? 'active' : ''}`}
                >
                  Prerequisites
                </button>
                <button 
                  onClick={() => handleTocClick('installation')} 
                  className={`toc-link ${activeSection === 'installation' ? 'active' : ''}`}
                >
                  Installation
                </button>
                <button 
                  onClick={() => handleTocClick('configuration')} 
                  className={`toc-link ${activeSection === 'configuration' ? 'active' : ''}`}
                >
                  Configuration
                </button>
              </>
            )}
            {currentPage === 'testing' && (
              <>
                <button 
                  onClick={() => handleTocClick('testing-framework')} 
                  className={`toc-link ${activeSection === 'testing-framework' ? 'active' : ''}`}
                >
                  Testing Framework Overview
                </button>
                <button 
                  onClick={() => handleTocClick('testing-types')} 
                  className={`toc-link ${activeSection === 'testing-types' ? 'active' : ''}`}
                >
                  Testing Types
                </button>
                <button 
                  onClick={() => handleTocClick('unit-testing')} 
                  className={`toc-link ${activeSection === 'unit-testing' ? 'active' : ''}`}
                >
                  Unit Testing
                </button>
                <button 
                  onClick={() => handleTocClick('integration-testing')} 
                  className={`toc-link ${activeSection === 'integration-testing' ? 'active' : ''}`}
                >
                  Integration Testing
                </button>
                <button 
                  onClick={() => handleTocClick('e2e-testing')} 
                  className={`toc-link ${activeSection === 'e2e-testing' ? 'active' : ''}`}
                >
                  End-to-End Testing
                </button>
                <button 
                  onClick={() => handleTocClick('testing-tools')} 
                  className={`toc-link ${activeSection === 'testing-tools' ? 'active' : ''}`}
                >
                  Testing Tools & Setup
                </button>
                <button 
                  onClick={() => handleTocClick('performance-testing')} 
                  className={`toc-link ${activeSection === 'performance-testing' ? 'active' : ''}`}
                >
                  Performance Testing
                </button>
                <button 
                  onClick={() => handleTocClick('best-practices')} 
                  className={`toc-link ${activeSection === 'best-practices' ? 'active' : ''}`}
                >
                  Best Practices
                </button>
              </>
            )}
            {currentPage === 'api-contract' && (
              <>
                <button 
                  onClick={() => handleTocClick('api-overview')} 
                  className={`toc-link ${activeSection === 'api-overview' ? 'active' : ''}`}
                >
                  API Overview
                </button>
                <button 
                  onClick={() => handleTocClick('authentication')} 
                  className={`toc-link ${activeSection === 'authentication' ? 'active' : ''}`}
                >
                  Authentication
                </button>
                <button 
                  onClick={() => handleTocClick('response-format')} 
                  className={`toc-link ${activeSection === 'response-format' ? 'active' : ''}`}
                >
                  Response Format
                </button>
                <button 
                  onClick={() => handleTocClick('core-endpoints')} 
                  className={`toc-link ${activeSection === 'core-endpoints' ? 'active' : ''}`}
                >
                  Core Endpoints
                </button>
                <button 
                  onClick={() => handleTocClick('documents-api')} 
                  className={`toc-link ${activeSection === 'documents-api' ? 'active' : ''}`}
                >
                  Documents API
                </button>
                <button 
                  onClick={() => handleTocClick('search-api')} 
                  className={`toc-link ${activeSection === 'search-api' ? 'active' : ''}`}
                >
                  Search API
                </button>
                <button 
                  onClick={() => handleTocClick('error-codes')} 
                  className={`toc-link ${activeSection === 'error-codes' ? 'active' : ''}`}
                >
                  Error Codes & Status
                </button>
                <button 
                  onClick={() => handleTocClick('webhooks')} 
                  className={`toc-link ${activeSection === 'webhooks' ? 'active' : ''}`}
                >
                  Webhooks
                </button>
                <button 
                  onClick={() => handleTocClick('sdk-libraries')} 
                  className={`toc-link ${activeSection === 'sdk-libraries' ? 'active' : ''}`}
                >
                  SDK & Libraries
                </button>
                <button 
                  onClick={() => handleTocClick('example-integration')} 
                  className={`toc-link ${activeSection === 'example-integration' ? 'active' : ''}`}
                >
                  Example Integration
                </button>
              </>
            )}
          </nav>
        </div>
      )}

      {/* Search Modal */}
      {searchVisible && (
        <div className="search-modal-overlay" onClick={() => setSearchVisible(false)}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="search-modal-header">
              <div className="search-modal-input-wrapper">
                <span className="search-modal-icon">🔍</span>
                <input
                  type="text"
                  className="search-modal-input"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={handleSearchInput}
                  onKeyDown={handleSearchKeyDown}
                  autoFocus
                />
                <span className="search-modal-shortcut">ESC</span>
              </div>
            </div>
            
            <div className="search-modal-results">
              {searchResults.length > 0 ? (
                <>
                  <div className="search-modal-section-title">
                    {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                  </div>
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="search-result-item"
                      onClick={() => handleSearchResultClick(result)}
                    >
                      <div className="search-result-title">{result.title}</div>
                      <div className="search-result-content">{result.content}</div>
                    </div>
                  ))}
                </>
              ) : searchQuery.trim() ? (
                <div className="search-no-results">
                  <span className="search-no-results-icon">🔍</span>
                  <div className="search-no-results-text">No results found for "{searchQuery}"</div>
                </div>
              ) : (
                <div className="search-suggestions">
                  <div className="search-modal-section-title">Popular sections</div>
                  <div className="search-suggestion-item" onClick={() => handleSearchResultClick({section: 'quick-setup'})}>
                    <span className="search-suggestion-icon">🚀</span>
                    Quick Setup
                  </div>
                  <div className="search-suggestion-item" onClick={() => handleSearchResultClick({section: 'testing-framework'})}>
                    <span className="search-suggestion-icon">🧪</span>
                    Testing Framework
                  </div>
                  <div className="search-suggestion-item" onClick={() => handleSearchResultClick({section: 'api-overview'})}>
                    <span className="search-suggestion-icon">📋</span>
                    API Overview
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
