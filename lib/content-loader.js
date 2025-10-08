// Simple content loader that reads our MDX files and extracts content
const contentData = {
  'getting-started': {
    title: 'Getting Started',
    description: 'Welcome to Knowledge Pack',
    sections: [
      { id: 'quick-setup', title: 'Quick Setup' },
      { id: 'prerequisites', title: 'Prerequisites' },
      { id: 'installation', title: 'Installation' },
      { id: 'configuration', title: 'Configuration' }
    ],
    searchableContent: [
      { title: 'Getting Started', content: 'Knowledge Pack provides a comprehensive documentation platform', section: 'quick-setup' },
      { title: 'Quick Setup', content: 'Follow these steps to get started', section: 'quick-setup' },
      { title: 'Prerequisites', content: 'Node.js 16+ installed, Basic knowledge of React', section: 'prerequisites' },
      { title: 'Installation', content: 'npm install @knowledgepack/core', section: 'installation' },
      { title: 'Configuration', content: 'Configure your Knowledge Pack settings', section: 'configuration' }
    ]
  },
  'testing': {
    title: 'Testing',
    description: 'Comprehensive testing strategies for your Knowledge Pack implementation',
    sections: [
      { id: 'testing-framework', title: '🧪 Testing Framework Overview' },
      { id: 'testing-types', title: '📋 Testing Types' },
      { id: 'unit-testing', title: 'Unit Testing' },
      { id: 'integration-testing', title: 'Integration Testing' },
      { id: 'e2e-testing', title: 'End-to-End Testing' },
      { id: 'testing-tools', title: '🔧 Testing Tools & Setup' },
      { id: 'performance-testing', title: '📈 Performance Testing' },
      { id: 'best-practices', title: '✅ Best Practices' }
    ],
    searchableContent: [
      { title: 'Testing Framework Overview', content: 'Testing framework overview and strategies', section: 'testing-framework' },
      { title: 'Testing Types', content: 'Unit testing, Integration testing, End-to-end testing', section: 'testing-types' },
      { title: 'Unit Testing', content: 'Test individual components and functions in isolation', section: 'unit-testing' },
      { title: 'Integration Testing', content: 'Verify how different parts work together', section: 'integration-testing' },
      { title: 'End-to-End Testing', content: 'Test complete user workflows using Playwright or Cypress', section: 'e2e-testing' },
      { title: 'Testing Tools & Setup', content: 'Jest, React Testing Library, Playwright, MSW', section: 'testing-tools' },
      { title: 'Performance Testing', content: 'Lighthouse CI, Bundle size analysis, Core Web Vitals', section: 'performance-testing' },
      { title: 'Best Practices', content: 'Test-Driven Development, Descriptive Names, Isolated Tests', section: 'best-practices' }
    ]
  },
  'api-contract': {
    title: 'API Contract',
    description: 'Comprehensive API specifications and integration guidelines',
    sections: [
      { id: 'api-overview', title: '📋 API Overview' },
      { id: 'authentication', title: '🔐 Authentication' },
      { id: 'response-format', title: '📊 Response Format' },
      { id: 'core-endpoints', title: '🚀 Core Endpoints' },
      { id: 'documents-api', title: 'Documents API' },
      { id: 'search-api', title: 'Search API' },
      { id: 'error-codes', title: '⚠️ Error Codes & Status Codes' },
      { id: 'webhooks', title: '🔄 Webhooks' },
      { id: 'sdk-libraries', title: '📚 SDK & Libraries' },
      { id: 'example-integration', title: '🔧 Example Integration' }
    ],
    searchableContent: [
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
}

// Export functions to get content data
export const getPageData = (pageId) => {
  return contentData[pageId] || null
}

export const getAllSearchableContent = () => {
  return Object.values(contentData).reduce((acc, page) => {
    return acc.concat(page.searchableContent)
  }, [])
}

export const getPageSections = (pageId) => {
  const page = contentData[pageId]
  return page ? page.sections : []
}

export const searchContent = (query) => {
  const allContent = getAllSearchableContent()
  return allContent.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.content.toLowerCase().includes(query.toLowerCase())
  )
}
