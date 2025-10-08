import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { docs } from '@/source.config';
import Link from 'next/link';

export default function HomePage() {
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
      },
    ]
  };

  return (
    <DocsLayout 
      tree={pageTree}
      nav={{
        title: 'Knowledge Pack',
        transparentMode: 'top',
      }}
      sidebar={{
        defaultOpenLevel: 1,
        collapsible: true,
        footer: (
          <div className="p-4 border-t">
            <Link 
              href="/admin" 
              className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
              title="Admin Login"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
            </Link>
          </div>
        )
      }}
    >
      <div className="flex flex-col gap-8 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome to Knowledge Pack</h1>
          <p className="text-xl text-muted-foreground">
            Your comprehensive guide to getting started with our platform
          </p>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a 
            href="/getting-started" 
            className="group p-6 border rounded-lg hover:shadow-lg transition-all duration-200 bg-card hover:border-primary/50"
          >
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">Getting Started</h3>
            <p className="text-sm text-muted-foreground">
              Learn the basics and get up and running with our platform quickly.
            </p>
          </a>

          <a 
            href="/testing" 
            className="group p-6 border rounded-lg hover:shadow-lg transition-all duration-200 bg-card hover:border-primary/50"
          >
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">Testing</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive testing strategies and best practices for quality assurance.
            </p>
          </a>

          <a 
            href="/api-contract" 
            className="group p-6 border rounded-lg hover:shadow-lg transition-all duration-200 bg-card hover:border-primary/50"
          >
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">Api Contract</h3>
            <p className="text-sm text-muted-foreground">
              Detailed API documentation and contract specifications.
            </p>
          </a>
        </div>

        {/* Info Section */}
        <div className="flex items-start gap-3 p-4 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <div className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-blue-800 dark:text-blue-200 font-medium">
              Ready to explore?
            </p>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Use the sidebar navigation to browse through all available documentation sections, or click on the cards above to jump directly to a specific topic.
            </p>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
