import type { Metadata } from 'next'
import { DocsPage, DocsBody } from 'fumadocs-ui/page'
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

export const metadata: Metadata = {
  title: 'API Contract',
  description: 'Complete API reference and contract specifications for Knowledge Pack - comprehensive endpoints, authentication, and integration guide',
}

export default function ApiContractPage() {
  // Custom navigation structure
  const pageTree = {
    name: 'Knowledge Pack',
    children: [
      {
        type: 'separator' as const,
        name: 'Introduction',
        className: 'text-sm font-medium text-muted-foreground uppercase tracking-wide'
      },
      {
        type: 'page' as const,
        name: 'Getting Started',
        url: '/getting-started',
      },
      {
        type: 'page' as const,
        name: 'Testing',
        url: '/testing',
      },
      {
        type: 'page' as const,
        name: 'Api Contract',
        url: '/api-contract',
        active: true
      },
    ]
  };

  // Generate Table of Contents
  const toc = [
    { title: 'API Overview', url: '#api-overview', depth: 2 },
    { title: 'Authentication', url: '#authentication', depth: 2 },
    { title: 'Core Endpoints', url: '#core-endpoints', depth: 2 },
    { title: 'Documents API', url: '#documents-api', depth: 3 },
    { title: 'Search API', url: '#search-api', depth: 3 },
    { title: 'Categories API', url: '#categories-api', depth: 3 },
    { title: 'Users API', url: '#users-api', depth: 3 },
    { title: 'Analytics API', url: '#analytics-api', depth: 3 },
    { title: 'Advanced Features', url: '#advanced-features', depth: 2 },
    { title: 'SDKs and Libraries', url: '#sdks-and-libraries', depth: 2 },
    { title: 'Status Codes', url: '#status-codes', depth: 2 },
    { title: 'Rate Limiting', url: '#rate-limiting', depth: 2 },
    { title: 'Best Practices', url: '#best-practices', depth: 2 },
  ];

  return (
    <DocsLayout 
      tree={pageTree}
      nav={{
        title: 'Knowledge Pack',
        transparentMode: 'top',
      }}
      sidebar={{
        defaultOpenLevel: 0,
        collapsible: true
      }}
    >
      <DocsPage toc={toc}>
        <DocsBody>
          <h1>API Contract</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Complete API reference and contract specifications for Knowledge Pack - comprehensive endpoints, authentication, and integration guide
          </p>
          
          <div className="prose prose-neutral dark:prose-invert max-w-3xl mx-auto">
            <p>The Knowledge Pack API provides a comprehensive set of endpoints for managing documentation, search functionality, user management, and content operations. This guide covers all available endpoints, authentication methods, request/response formats, and integration examples.</p>

            <h2 id="api-overview">API Overview</h2>

            <h3>Base Information</h3>
            <ul>
              <li><strong>Base URL</strong>: <code>https://api.knowledgepack.com/v1</code></li>
              <li><strong>Protocol</strong>: HTTPS only</li>
              <li><strong>Content-Type</strong>: <code>application/json</code></li>
              <li><strong>Rate Limiting</strong>: 1000 requests per hour (authenticated), 100 requests per hour (anonymous)</li>
              <li><strong>API Version</strong>: v1 (current), v2 (beta)</li>
            </ul>

            <h3>Response Format</h3>
            <p>All API responses follow a consistent format:</p>
            <pre><code className="language-json">{`{
  "success": true,
  "data": {
    // Response data
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  },
  "meta": {
    "requestId": "req_1234567890",
    "timestamp": "2023-10-08T09:20:00Z",
    "version": "v1"
  }
}`}</code></pre>

            <h3>Error Format</h3>
            <p>Error responses include detailed information:</p>
            <pre><code className="language-json">{`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "title",
        "message": "Title is required",
        "code": "REQUIRED_FIELD"
      }
    ],
    "documentation": "https://docs.knowledgepack.com/api/errors#validation"
  },
  "meta": {
    "requestId": "req_1234567890",
    "timestamp": "2023-10-08T09:20:00Z"
  }
}`}</code></pre>

            <h2 id="authentication">Authentication</h2>

            <h3>API Keys</h3>
            <p>Generate API keys in your dashboard and include them in requests:</p>
            <pre><code className="language-bash">{`# Header-based authentication (recommended)
Authorization: Bearer YOUR_API_KEY

# Query parameter authentication (for webhooks only)
GET /api/v1/documents?api_key=YOUR_API_KEY`}</code></pre>

            <h3>JWT Tokens</h3>
            <p>For user-specific operations, use JWT tokens:</p>
            <pre><code className="language-bash">{`# Login to get JWT token
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

# Response
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here",
    "expiresIn": 3600
  }
}

# Use token in subsequent requests
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}</code></pre>

            <h3>OAuth 2.0</h3>
            <p>For third-party integrations:</p>
            <pre><code className="language-bash">{`# OAuth 2.0 flow
GET /oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=read:docs%20write:docs

# Exchange code for token
POST /oauth/token
{
  "grant_type": "authorization_code",
  "code": "AUTHORIZATION_CODE",
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "redirect_uri": "YOUR_REDIRECT_URI"
}`}</code></pre>

            <h2 id="core-endpoints">Core Endpoints</h2>

            <h3 id="documents-api">Documents API</h3>

            <h4>List Documents</h4>
            <pre><code className="language-http">GET /documents</code></pre>

            <p><strong>Parameters:</strong></p>
            <ul>
              <li><code>page</code> (optional): Page number (default: 1)</li>
              <li><code>limit</code> (optional): Items per page (default: 20, max: 100)</li>
              <li><code>category</code> (optional): Filter by category</li>
              <li><code>status</code> (optional): Filter by status (<code>draft</code>, <code>published</code>, <code>archived</code>)</li>
              <li><code>search</code> (optional): Search in title and content</li>
              <li><code>sort</code> (optional): Sort by (<code>created_at</code>, <code>updated_at</code>, <code>title</code>)</li>
              <li><code>order</code> (optional): Order (<code>asc</code>, <code>desc</code>)</li>
            </ul>

            <p><strong>Example Request:</strong></p>
            <pre><code className="language-bash">curl -X GET "https://api.knowledgepack.com/v1/documents?page=1&limit=10&category=guides&status=published" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"</code></pre>

            <h4>Get Single Document</h4>
            <pre><code className="language-http">GET /documents/{`{id}`}</code></pre>

            <p><strong>Parameters:</strong></p>
            <ul>
              <li><code>include</code> (optional): Include related data (<code>author</code>, <code>comments</code>, <code>analytics</code>)</li>
              <li><code>format</code> (optional): Response format (<code>json</code>, <code>markdown</code>, <code>html</code>)</li>
            </ul>

            <h4>Create Document</h4>
            <pre><code className="language-http">POST /documents</code></pre>

            <p><strong>Request Body:</strong></p>
            <pre><code className="language-json">{`{
  "title": "New Documentation Page",
  "slug": "new-documentation-page",
  "content": "# New Documentation\\n\\nThis is the content...",
  "excerpt": "Brief description of the document",
  "category": "guides",
  "status": "draft",
  "tags": ["new", "documentation"],
  "metadata": {
    "author": "user_123",
    "template": "guide",
    "seoTitle": "Custom SEO Title",
    "seoDescription": "Custom SEO description"
  },
  "publishAt": "2023-10-10T12:00:00Z"
}`}</code></pre>

            <h4>Update Document</h4>
            <pre><code className="language-http">PUT /documents/{`{id}`}
PATCH /documents/{`{id}`}</code></pre>

            <h4>Delete Document</h4>
            <pre><code className="language-http">DELETE /documents/{`{id}`}</code></pre>

            <p><strong>Parameters:</strong></p>
            <ul>
              <li><code>force</code> (optional): Permanently delete (default: false, moves to trash)</li>
            </ul>

            <h3 id="search-api">Search API</h3>

            <h4>Search Documents</h4>
            <pre><code className="language-http">GET /search</code></pre>

            <p><strong>Parameters:</strong></p>
            <ul>
              <li><code>q</code> (required): Search query</li>
              <li><code>limit</code> (optional): Number of results (default: 10, max: 50)</li>
              <li><code>offset</code> (optional): Pagination offset</li>
              <li><code>category</code> (optional): Filter by category</li>
              <li><code>type</code> (optional): Content type (<code>document</code>, <code>page</code>, <code>all</code>)</li>
              <li><code>highlight</code> (optional): Enable search term highlighting (default: true)</li>
            </ul>

            <p><strong>Example Request:</strong></p>
            <pre><code className="language-bash">curl -X GET "https://api.knowledgepack.com/v1/search?q=getting%20started&limit=10&highlight=true" \
  -H "Authorization: Bearer YOUR_API_KEY"</code></pre>

            <p><strong>Example Response:</strong></p>
            <pre><code className="language-json">{`{
  "success": true,
  "data": {
    "query": "getting started",
    "results": [
      {
        "id": "doc_1234567890",
        "title": "Getting Started Guide",
        "slug": "getting-started",
        "excerpt": "Learn how to get <mark>started</mark> with Knowledge Pack",
        "category": "guides",
        "score": 0.95,
        "highlights": [
          "Learn how to get <mark>started</mark> with Knowledge Pack",
          "<mark>Getting</mark> up and running is easy with our guide"
        ],
        "url": "/getting-started"
      }
    ],
    "totalResults": 15,
    "searchTime": 0.045,
    "suggestions": [
      "getting started guide",
      "start documentation"
    ]
  }
}`}</code></pre>

            <h3 id="categories-api">Categories API</h3>

            <h4>List Categories</h4>
            <pre><code className="language-http">GET /categories</code></pre>

            <h4>Create Category</h4>
            <pre><code className="language-http">POST /categories</code></pre>

            <p><strong>Request Body:</strong></p>
            <pre><code className="language-json">{`{
  "name": "New Category",
  "slug": "new-category",
  "description": "Description of the new category",
  "color": "#8b5cf6",
  "icon": "folder"
}`}</code></pre>

            <h3 id="users-api">Users API</h3>

            <h4>Get Current User</h4>
            <pre><code className="language-http">GET /users/me</code></pre>

            <p><strong>Example Response:</strong></p>
            <pre><code className="language-json">{`{
  "success": true,
  "data": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://cdn.example.com/avatars/john.jpg",
    "role": "editor",
    "permissions": [
      "read:documents",
      "write:documents",
      "delete:own_documents"
    ],
    "preferences": {
      "theme": "dark",
      "language": "en",
      "emailNotifications": true
    },
    "stats": {
      "documentsCreated": 15,
      "documentsEdited": 42,
      "lastActive": "2023-10-08T09:00:00Z"
    }
  }
}`}</code></pre>

            <h4>Update User Profile</h4>
            <pre><code className="language-http">PATCH /users/me</code></pre>

            <p><strong>Request Body:</strong></p>
            <pre><code className="language-json">{`{
  "name": "John Smith",
  "preferences": {
    "theme": "light",
    "emailNotifications": false
  }
}`}</code></pre>

            <h3 id="analytics-api">Analytics API</h3>

            <h4>Get Document Analytics</h4>
            <pre><code className="language-http">GET /analytics/documents/{`{id}`}</code></pre>

            <p><strong>Parameters:</strong></p>
            <ul>
              <li><code>period</code> (optional): Time period (<code>7d</code>, <code>30d</code>, <code>90d</code>, <code>1y</code>)</li>
              <li><code>metrics</code> (optional): Specific metrics (<code>views</code>, <code>time_spent</code>, <code>bounce_rate</code>)</li>
            </ul>

            <h2 id="advanced-features">Advanced Features</h2>

            <h3>Webhooks</h3>

            <h4>Register Webhook</h4>
            <pre><code className="language-http">POST /webhooks</code></pre>

            <p><strong>Request Body:</strong></p>
            <pre><code className="language-json">{`{
  "url": "https://your-app.com/webhook",
  "events": [
    "document.created",
    "document.updated",
    "document.published",
    "document.deleted"
  ],
  "secret": "your_webhook_secret",
  "active": true
}`}</code></pre>

            <h3>Bulk Operations</h3>

            <h4>Bulk Create Documents</h4>
            <pre><code className="language-http">POST /documents/bulk</code></pre>

            <h4>Bulk Update Documents</h4>
            <pre><code className="language-http">PATCH /documents/bulk</code></pre>

            <h3>File Upload API</h3>

            <h4>Upload File</h4>
            <pre><code className="language-http">POST /files</code></pre>

            <p><strong>Request (multipart/form-data):</strong></p>
            <pre><code className="language-bash">curl -X POST "https://api.knowledgepack.com/v1/files" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@/path/to/file.pdf" \
  -F "category=attachments" \
  -F "description=User manual PDF"</code></pre>

            <h2 id="sdks-and-libraries">SDKs and Libraries</h2>

            <h3>JavaScript/Node.js</h3>
            <pre><code className="language-bash">npm install @knowledgepack/api</code></pre>

            <pre><code className="language-javascript">{`import KnowledgePack from '@knowledgepack/api';

const kp = new KnowledgePack({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.knowledgepack.com/v1'
});

// Get documents
const documents = await kp.documents.list({
  category: 'guides',
  limit: 10
});

// Create document
const newDoc = await kp.documents.create({
  title: 'New Guide',
  content: '# New Guide\\n\\nContent here...',
  category: 'guides'
});

// Search
const results = await kp.search.query('getting started');`}</code></pre>

            <h3>Python</h3>
            <pre><code className="language-bash">pip install knowledgepack</code></pre>

            <pre><code className="language-python">{`from knowledgepack import KnowledgePackAPI

kp = KnowledgePackAPI(api_key='your-api-key')

# Get documents
documents = kp.documents.list(category='guides', limit=10)

# Create document
new_doc = kp.documents.create(
    title='New Guide',
    content='# New Guide\\n\\nContent here...',
    category='guides'
)

# Search
results = kp.search.query('getting started')`}</code></pre>

            <h3>cURL Examples</h3>

            <h4>Basic GET Request</h4>
            <pre><code className="language-bash">curl -X GET "https://api.knowledgepack.com/v1/documents" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"</code></pre>

            <h4>POST Request with JSON</h4>
            <pre><code className="language-bash">{`curl -X POST "https://api.knowledgepack.com/v1/documents" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "New Document",
    "content": "Document content here",
    "category": "guides"
  }'`}</code></pre>

            <h2 id="status-codes">Status Codes</h2>

            <h3>Success Codes</h3>
            <ul>
              <li><strong>200 OK</strong>: Request successful</li>
              <li><strong>201 Created</strong>: Resource created successfully</li>
              <li><strong>202 Accepted</strong>: Request accepted for processing</li>
              <li><strong>204 No Content</strong>: Request successful, no content returned</li>
            </ul>

            <h3>Client Error Codes</h3>
            <ul>
              <li><strong>400 Bad Request</strong>: Invalid request syntax or parameters</li>
              <li><strong>401 Unauthorized</strong>: Authentication required or invalid</li>
              <li><strong>403 Forbidden</strong>: Insufficient permissions</li>
              <li><strong>404 Not Found</strong>: Resource not found</li>
              <li><strong>409 Conflict</strong>: Resource conflict (duplicate, etc.)</li>
              <li><strong>422 Unprocessable Entity</strong>: Validation errors</li>
              <li><strong>429 Too Many Requests</strong>: Rate limit exceeded</li>
            </ul>

            <h3>Server Error Codes</h3>
            <ul>
              <li><strong>500 Internal Server Error</strong>: Server error</li>
              <li><strong>502 Bad Gateway</strong>: Gateway error</li>
              <li><strong>503 Service Unavailable</strong>: Service temporarily unavailable</li>
              <li><strong>504 Gateway Timeout</strong>: Gateway timeout</li>
            </ul>

            <h2 id="rate-limiting">Rate Limiting</h2>

            <h3>Rate Limit Headers</h3>
            <p>Every response includes rate limit information:</p>
            <pre><code className="language-http">{`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1696766400
X-RateLimit-Window: 3600`}</code></pre>

            <h3>Rate Limit Plans</h3>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Plan</th>
                    <th>Rate Limit</th>
                    <th>Burst Limit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Free</td>
                    <td>100/hour</td>
                    <td>10/minute</td>
                  </tr>
                  <tr>
                    <td>Pro</td>
                    <td>1,000/hour</td>
                    <td>100/minute</td>
                  </tr>
                  <tr>
                    <td>Enterprise</td>
                    <td>10,000/hour</td>
                    <td>1,000/minute</td>
                  </tr>
                  <tr>
                    <td>Custom</td>
                    <td>Negotiable</td>
                    <td>Negotiable</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Handling Rate Limits</h3>
            <pre><code className="language-javascript">{`try {
  const response = await fetch('/api/documents', {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  });
  
  if (response.status === 429) {
    const resetTime = response.headers.get('X-RateLimit-Reset');
    console.log(\`Rate limit exceeded. Reset at: \${new Date(resetTime * 1000)}\`);
    // Implement exponential backoff
  }
} catch (error) {
  console.error('API Error:', error);
}`}</code></pre>

            <h2 id="best-practices">Best Practices</h2>

            <h3>API Design Principles</h3>
            <ol>
              <li><strong>Idempotency</strong>: PUT and DELETE operations are idempotent</li>
              <li><strong>Versioning</strong>: API versioned through URL path (<code>/v1/</code>, <code>/v2/</code>)</li>
              <li><strong>Filtering</strong>: Use query parameters for filtering and searching</li>
              <li><strong>Pagination</strong>: Cursor-based pagination for large datasets</li>
              <li><strong>Caching</strong>: ETags and Last-Modified headers for caching</li>
            </ol>

            <h3>Security Best Practices</h3>
            <ol>
              <li><strong>Use HTTPS</strong>: All API calls must use HTTPS</li>
              <li><strong>Validate Input</strong>: Always validate and sanitize input data</li>
              <li><strong>Rate Limiting</strong>: Implement proper rate limiting</li>
              <li><strong>API Keys</strong>: Rotate API keys regularly</li>
              <li><strong>Webhook Security</strong>: Validate webhook signatures</li>
            </ol>

            <h3>Performance Optimization</h3>
            <ol>
              <li><strong>Pagination</strong>: Always paginate large result sets</li>
              <li><strong>Field Selection</strong>: Use <code>fields</code> parameter to limit returned data</li>
              <li><strong>Caching</strong>: Cache responses where appropriate</li>
              <li><strong>Batch Operations</strong>: Use bulk endpoints for multiple operations</li>
              <li><strong>Compression</strong>: Enable gzip compression</li>
            </ol>

            <h3>Error Handling</h3>
            <pre><code className="language-javascript">{`// Comprehensive error handling example
async function handleAPICall() {
  try {
    const response = await kp.documents.create({
      title: 'New Document',
      content: 'Content here'
    });
    
    return response;
  } catch (error) {
    if (error.code === 'VALIDATION_ERROR') {
      // Handle validation errors
      console.error('Validation failed:', error.details);
    } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
      // Handle rate limiting
      const retryAfter = error.retryAfter;
      console.log(\`Rate limited. Retry after \${retryAfter} seconds\`);
    } else if (error.status >= 500) {
      // Handle server errors
      console.error('Server error:', error.message);
    } else {
      // Handle other errors
      console.error('API error:', error.message);
    }
    
    throw error;
  }
}`}</code></pre>

            <h2>Support and Resources</h2>

            <h3>Getting Help</h3>
            <ul>
              <li><strong>Documentation</strong>: <a href="https://docs.knowledgepack.com/api">https://docs.knowledgepack.com/api</a></li>
              <li><strong>API Status</strong>: <a href="https://status.knowledgepack.com">https://status.knowledgepack.com</a></li>
              <li><strong>Community Forum</strong>: <a href="https://community.knowledgepack.com">https://community.knowledgepack.com</a></li>
              <li><strong>Support Email</strong>: <a href="mailto:api-support@knowledgepack.com">api-support@knowledgepack.com</a></li>
            </ul>

            <h3>Changelog</h3>
            <p>Stay updated with API changes:</p>
            <ul>
              <li><strong>Changelog</strong>: <a href="https://docs.knowledgepack.com/changelog">https://docs.knowledgepack.com/changelog</a></li>
              <li><strong>Breaking Changes</strong>: <a href="https://docs.knowledgepack.com/breaking-changes">https://docs.knowledgepack.com/breaking-changes</a></li>
              <li><strong>Migration Guides</strong>: <a href="https://docs.knowledgepack.com/migrations">https://docs.knowledgepack.com/migrations</a></li>
            </ul>

            <p>For detailed examples and advanced use cases, explore our API cookbook and integration guides.</p>
          </div>
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  )
}
