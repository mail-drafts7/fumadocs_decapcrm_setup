import type { Metadata } from 'next'
import { DocsPage, DocsBody } from 'fumadocs-ui/page'
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

export const metadata: Metadata = {
  title: 'Getting Started',
  description: 'Complete guide to get started with Knowledge Pack - from installation to deployment',
}

export default function GettingStartedPage() {
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
        active: true
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
      },
    ]
  };

  // Generate Table of Contents from the content
  const toc = [
    { title: 'What is Knowledge Pack?', url: '#what-is-knowledge-pack', depth: 2 },
    { title: 'Key Features', url: '#key-features', depth: 3 },
    { title: 'Prerequisites', url: '#prerequisites', depth: 2 },
    { title: 'Checking Your Environment', url: '#checking-your-environment', depth: 3 },
    { title: 'Quick Start', url: '#quick-start', depth: 2 },
    { title: '1. Installation', url: '#1-installation', depth: 3 },
    { title: '2. Project Structure', url: '#2-project-structure', depth: 3 },
    { title: '3. Configuration', url: '#3-configuration', depth: 3 },
    { title: 'Creating Your First Page', url: '#creating-your-first-page', depth: 2 },
    { title: 'Advanced Features', url: '#advanced-features', depth: 2 },
    { title: 'Development Workflow', url: '#development-workflow', depth: 2 },
    { title: 'Deployment Options', url: '#deployment-options', depth: 2 },
    { title: 'Next Steps', url: '#next-steps', depth: 2 },
    { title: 'Getting Help', url: '#getting-help', depth: 2 },
    { title: 'Troubleshooting', url: '#troubleshooting', depth: 2 },
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
          <h1>Getting Started</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Complete guide to get started with Knowledge Pack - from installation to deployment
          </p>
          
          <div className="prose prose-neutral dark:prose-invert max-w-3xl mx-auto">
            <p>Welcome to Knowledge Pack - a powerful documentation platform built for modern development teams. This comprehensive guide will walk you through everything you need to know to get started.</p>

            <h2 id="what-is-knowledge-pack">What is Knowledge Pack?</h2>
            <p>Knowledge Pack is a modern documentation platform that combines the simplicity of Markdown with the power of React components. It's designed to help teams create, maintain, and share beautiful documentation that scales with your project.</p>

            <h3 id="key-features">Key Features</h3>
            <ul>
              <li><strong>📝 Markdown-first</strong>: Write content in familiar Markdown syntax</li>
              <li><strong>⚡ Fast Performance</strong>: Built on Next.js for optimal performance</li>
              <li><strong>🎨 Customizable Design</strong>: Beautiful themes and custom styling options</li>
              <li><strong>🔍 Full-text Search</strong>: Powerful search capabilities out of the box</li>
              <li><strong>📱 Mobile Responsive</strong>: Works perfectly on all devices</li>
              <li><strong>🌙 Dark Mode Support</strong>: Automatic dark/light mode switching</li>
              <li><strong>🚀 Easy Deployment</strong>: Deploy anywhere with static site generation</li>
            </ul>

            <h2 id="prerequisites">Prerequisites</h2>
            <p>Before you begin, make sure you have the following installed on your system:</p>
            <ul>
              <li><strong>Node.js 18+</strong> - <a href="https://nodejs.org/">Download from nodejs.org</a></li>
              <li><strong>npm</strong> or <strong>yarn</strong> - Package manager (comes with Node.js)</li>
              <li><strong>Git</strong> - Version control system</li>
              <li><strong>Code Editor</strong> - VS Code, WebStorm, or your preferred editor</li>
            </ul>

            <h3 id="checking-your-environment">Checking Your Environment</h3>
            <p>Verify your installation by running these commands in your terminal:</p>
            <pre><code className="language-bash">node --version  # Should be 18.0.0 or higher
npm --version   # Should be 8.0.0 or higher  
git --version   # Any recent version</code></pre>

            <h2 id="quick-start">Quick Start</h2>

            <h3 id="1-installation">1. Installation</h3>
            <p>Create a new Knowledge Pack project using our CLI tool:</p>
            <pre><code className="language-bash"># Install the Knowledge Pack CLI
npm install -g @knowledgepack/cli

# Create a new project
npx create-knowledge-pack my-docs
cd my-docs

# Install dependencies
npm install</code></pre>

            <p>Or clone our starter template:</p>
            <pre><code className="language-bash"># Clone the starter template
git clone https://github.com/knowledgepack/starter-template.git my-docs
cd my-docs

# Install dependencies
npm install

# Start development server
npm run dev</code></pre>

            <h3 id="2-project-structure">2. Project Structure</h3>
            <p>After installation, your project structure will look like this:</p>
            <pre><code>my-docs/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── docs/              # Documentation pages
├── content/               # Markdown content
│   └── docs/              # Documentation files
│       ├── getting-started.mdx
│       ├── configuration.mdx
│       └── deployment.mdx
├── lib/                   # Utility functions
├── public/                # Static assets
├── package.json
└── knowledge.config.js    # Configuration file</code></pre>

            <h3 id="3-configuration">3. Configuration</h3>
            <p>Create or update your <code>knowledge.config.js</code> file:</p>
            <pre><code className="language-javascript">{`/** @type {import('@knowledgepack/core').Config} */
export default {
  // Site metadata
  title: 'My Documentation',
  description: 'Comprehensive documentation for my project',
  
  // Theme configuration
  theme: {
    primaryColor: '#3b82f6',
    accentColor: '#10b981',
    darkMode: 'auto', // 'light', 'dark', or 'auto'
  },
  
  // Navigation structure
  navigation: [
    { title: 'Getting Started', href: '/getting-started' },
    { title: 'API Reference', href: '/api' },
    { title: 'Examples', href: '/examples' },
  ],
  
  // Features
  features: {
    search: true,
    analytics: true,
    editLinks: true,
    feedback: true,
  },
  
  // Integrations
  integrations: {
    github: 'your-username/your-repo',
    discord: 'your-discord-invite',
  }
}`}</code></pre>

            <h2 id="creating-your-first-page">Creating Your First Page</h2>
            
            <h3>1. Add Content</h3>
            <p>Create a new Markdown file in the <code>content/docs/</code> directory with frontmatter and content.</p>

            <h3>2. Update Navigation</h3>
            <p>Add your new page to the navigation in <code>knowledge.config.js</code>.</p>

            <h2 id="advanced-features">Advanced Features</h2>
            <p>Knowledge Pack supports custom React components, search configuration, and SEO optimization.</p>

            <h2 id="development-workflow">Development Workflow</h2>
            <h3>Local Development</h3>
            <p>Start the development server:</p>
            <pre><code className="language-bash"># Start development server
npm run dev

# Open in browser
open http://localhost:3000</code></pre>

            <h3>Building for Production</h3>
            <pre><code className="language-bash"># Build the project
npm run build

# Preview the build  
npm run preview</code></pre>

            <h2 id="deployment-options">Deployment Options</h2>
            
            <h3>Vercel (Recommended)</h3>
            <pre><code className="language-bash"># Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel</code></pre>


            <h2 id="next-steps">Next Steps</h2>
            <p>Now that you have Knowledge Pack set up, here are some recommended next steps:</p>
            <ol>
              <li><strong>📖 Explore Documentation</strong>: Read through all available guides and tutorials</li>
              <li><strong>🎨 Customize Design</strong>: Modify themes, colors, and layouts to match your brand</li>
              <li><strong>🔌 Add Integrations</strong>: Connect with GitHub, Discord, analytics tools</li>
              <li><strong>📝 Create Content</strong>: Start writing your documentation pages</li>
              <li><strong>🚀 Deploy</strong>: Share your documentation with the world</li>
            </ol>

            <h2 id="getting-help">Getting Help</h2>
            <p>If you need assistance or have questions:</p>
            <ul>
              <li><strong>📚 Documentation</strong>: Browse our complete documentation</li>
              <li><strong>💬 Community</strong>: Join our Discord community for support</li>
              <li><strong>🐛 Issues</strong>: Report bugs on our GitHub repository</li>
              <li><strong>💡 Feature Requests</strong>: Suggest new features and improvements</li>
            </ul>

            <h2 id="troubleshooting">Troubleshooting</h2>
            
            <h3>Common Issues</h3>
            
            <p><strong>Node.js Version Error</strong></p>
            <pre><code className="language-bash"># Update Node.js to version 18 or higher
nvm install 18
nvm use 18</code></pre>

            <p><strong>Build Errors</strong></p>
            <pre><code className="language-bash"># Clear cache and reinstall dependencies
rm -rf node_modules package-lock.json
npm install</code></pre>

            <p><strong>Port Already in Use</strong></p>
            <pre><code className="language-bash"># Use a different port
npm run dev -- --port 3001</code></pre>

            <p>For more help, check our troubleshooting guide or reach out to our community.</p>
          </div>
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  )
}
