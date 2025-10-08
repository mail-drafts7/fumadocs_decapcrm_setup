import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { RootToggle } from 'fumadocs-ui/components/layout/root-toggle';
import type { ReactNode } from 'react';
import { docs } from '@/source.config';
import Link from 'next/link';

function LoginIcon() {
  return (
    <Link 
      href="/admin" 
      className="flex items-center justify-center w-9 h-9 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
      title="Admin Login"
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
        />
      </svg>
    </Link>
  );
}

export default function RootDocsLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Create a simple tree structure
  const pageTree = {
    name: 'Knowledge Pack',
    children: [
      {
        type: 'page' as const,
        name: 'Getting Started',
        url: '/docs/getting-started',
      },
      {
        type: 'page' as const,
        name: 'Testing',
        url: '/docs/testing',
      },
      {
        type: 'page' as const,
        name: 'API Contract',
        url: '/docs/api-contract',
      }
    ]
  };

  return (
    <DocsLayout 
      tree={pageTree} 
      nav={{
        title: 'Knowledge Pack',
        transparentMode: 'top',
        children: <LoginIcon />,
      }}
      sidebar={{
        banner: (
          <div className="flex flex-col gap-3 p-4 border-b">
            <h2 className="font-semibold text-lg text-foreground">Knowledge Pack</h2>
          </div>
        ),
        defaultOpenLevel: 0,
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
      {children}
    </DocsLayout>
  );
}
