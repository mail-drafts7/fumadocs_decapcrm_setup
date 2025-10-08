import type { Metadata } from 'next'
import { DocsPage, DocsBody } from 'fumadocs-ui/page'
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

export const metadata: Metadata = {
  title: 'Testing',
  description: 'Comprehensive testing guide for Knowledge Pack - unit tests, integration tests, and end-to-end testing strategies',
}

export default function TestingPage() {
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
        active: true
      },
      {
        type: 'page' as const,
        name: 'Api Contract',
        url: '/api-contract',
      },
    ]
  };

  // Generate Table of Contents
  const toc = [
    { title: 'Testing Philosophy', url: '#testing-philosophy', depth: 2 },
    { title: 'Why Test Your Documentation?', url: '#why-test-your-documentation', depth: 3 },
    { title: 'Testing Pyramid', url: '#testing-pyramid', depth: 3 },
    { title: 'Testing Stack', url: '#testing-stack', depth: 2 },
    { title: 'Unit Testing', url: '#unit-testing', depth: 2 },
    { title: 'Integration Testing', url: '#integration-testing', depth: 2 },
    { title: 'End-to-End Testing', url: '#end-to-end-testing', depth: 2 },
    { title: 'Accessibility Testing', url: '#accessibility-testing', depth: 2 },
    { title: 'Performance Testing', url: '#performance-testing', depth: 2 },
    { title: 'Testing Best Practices', url: '#testing-best-practices', depth: 2 },
    { title: 'Running Tests', url: '#running-tests', depth: 2 },
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
          <h1>Testing</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Comprehensive testing guide for Knowledge Pack - unit tests, integration tests, and end-to-end testing strategies
          </p>
          
          <div className="prose prose-neutral dark:prose-invert max-w-3xl mx-auto">
            <p>Testing is a crucial part of maintaining high-quality documentation and ensuring your Knowledge Pack setup works reliably. This comprehensive guide covers all aspects of testing, from basic unit tests to advanced end-to-end testing scenarios.</p>

            <h2 id="testing-philosophy">Testing Philosophy</h2>

            <h3 id="why-test-your-documentation">Why Test Your Documentation?</h3>
            <p>Documentation testing ensures that:</p>
            <ul>
              <li><strong>Content Accuracy</strong>: All code examples and tutorials actually work</li>
              <li><strong>Link Validity</strong>: Internal and external links function correctly</li>
              <li><strong>Performance</strong>: Pages load quickly and efficiently</li>
              <li><strong>Accessibility</strong>: Content is accessible to all users</li>
              <li><strong>Cross-platform Compatibility</strong>: Documentation works across different devices and browsers</li>
            </ul>

            <h3 id="testing-pyramid">Testing Pyramid</h3>
            <p>Knowledge Pack follows the testing pyramid approach:</p>
            <pre><code>{`    /\\     E2E Tests (Few)
   /  \\    - User workflows
  /____\\   - Critical paths
 /      \\  
/________\\  Integration Tests (Some)
           - Component interactions
           - API integrations

/__________\\ Unit Tests (Many)
             - Individual functions
             - Component logic
             - Utilities`}</code></pre>

            <h2 id="testing-stack">Testing Stack</h2>

            <h3>Core Testing Tools</h3>
            <ul>
              <li><strong>Jest</strong> - JavaScript testing framework</li>
              <li><strong>React Testing Library</strong> - Component testing utilities</li>
              <li><strong>Playwright</strong> - End-to-end testing</li>
              <li><strong>MSW (Mock Service Worker)</strong> - API mocking</li>
              <li><strong>Testing Library Jest DOM</strong> - Custom matchers</li>
            </ul>

            <h3>Additional Tools</h3>
            <ul>
              <li><strong>Storybook</strong> - Component documentation and testing</li>
              <li><strong>Chromatic</strong> - Visual regression testing</li>
              <li><strong>Axe</strong> - Accessibility testing</li>
              <li><strong>Lighthouse CI</strong> - Performance testing</li>
            </ul>

            <h2 id="unit-testing">Unit Testing</h2>

            <h3>Setting Up Jest</h3>
            <p>Install the required testing dependencies:</p>
            <pre><code className="language-bash">npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom</code></pre>

            <p>Create <code>jest.config.js</code>:</p>
            <pre><code className="language-javascript">{`/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

module.exports = config;`}</code></pre>

            <h3>Testing Components</h3>
            <p>Basic component test example:</p>
            <pre><code className="language-javascript">{`// __tests__/components/SearchBox.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '@/components/SearchBox';

describe('SearchBox', () => {
  it('renders search input', () => {
    render(<SearchBox />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('calls onSearch when typing', async () => {
    const user = userEvent.setup();
    const mockOnSearch = jest.fn();
    
    render(<SearchBox onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/search/i);
    await user.type(input, 'test query');
    
    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });
});`}</code></pre>

            <h2 id="integration-testing">Integration Testing</h2>

            <h3>Testing Page Components</h3>
            <p>Integration tests verify how different parts work together:</p>
            <pre><code className="language-javascript">{`// __tests__/pages/docs.test.jsx
import { render, screen } from '@testing-library/react';
import DocsPage from '@/app/docs/[...slug]/page';

describe('DocsPage', () => {
  it('renders page content', () => {
    render(<DocsPage params={{ slug: ['getting-started'] }} />);
    
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders table of contents', () => {
    render(<DocsPage params={{ slug: ['getting-started'] }} />);
    
    expect(screen.getByText('Section 1')).toBeInTheDocument();
  });
});`}</code></pre>

            <h2 id="end-to-end-testing">End-to-End Testing</h2>

            <h3>Playwright Setup</h3>
            <p>Install Playwright:</p>
            <pre><code className="language-bash">{`npm install --save-dev @playwright/test
npx playwright install`}</code></pre>

            <p>Create <code>playwright.config.ts</code>:</p>
            <pre><code className="language-typescript">{`import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});`}</code></pre>

            <h3>E2E Test Examples</h3>
            <pre><code className="language-typescript">{`// e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('navigates between pages', async ({ page }) => {
    await page.goto('/');
    
    // Click getting started link
    await page.getByText('Getting Started').click();
    await expect(page).toHaveURL('/getting-started');
    await expect(page.getByRole('heading', { name: 'Getting Started' })).toBeVisible();
    
    // Navigate to testing page
    await page.getByText('Testing').click();
    await expect(page).toHaveURL('/testing');
    await expect(page.getByRole('heading', { name: 'Testing' })).toBeVisible();
  });
});`}</code></pre>

            <h2 id="accessibility-testing">Accessibility Testing</h2>

            <h3>Automated Accessibility Tests</h3>
            <pre><code className="language-javascript">{`// __tests__/accessibility.test.js
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import HomePage from '@/app/page';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('has no accessibility violations on homepage', async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});`}</code></pre>

            <h2 id="performance-testing">Performance Testing</h2>

            <h3>Lighthouse CI</h3>
            <p>Create <code>.lighthouserc.js</code>:</p>
            <pre><code className="language-javascript">{`module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/', 'http://localhost:3000/getting-started'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};`}</code></pre>

            <h2 id="testing-best-practices">Testing Best Practices</h2>

            <h3>1. Test Organization</h3>
            <pre><code>{`__tests__/
├── components/          # Component tests
├── hooks/              # Custom hook tests
├── lib/                # Utility function tests
├── pages/              # Page component tests
└── __mocks__/          # Mock implementations

e2e/
├── fixtures/           # Test data
├── page-objects/       # Page object models
└── specs/             # Test specifications`}</code></pre>

            <h3>2. Writing Maintainable Tests</h3>
            <ul>
              <li><strong>Use descriptive test names</strong>: <code>should display error message when API fails</code></li>
              <li><strong>Follow AAA pattern</strong>: Arrange, Act, Assert</li>
              <li><strong>Keep tests independent</strong>: Each test should run in isolation</li>
              <li><strong>Use page object pattern</strong> for E2E tests</li>
              <li><strong>Mock external dependencies</strong>: APIs, third-party services</li>
            </ul>

            <h3>3. Continuous Integration</h3>
            <pre><code className="language-yaml">{`# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - run: npm ci
      - run: npm run test
      - run: npm run test:e2e
      - run: npm run lighthouse
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3`}</code></pre>

            <h2 id="running-tests">Running Tests</h2>

            <h3>Development Commands</h3>
            <pre><code className="language-bash">{`# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests in headed mode
npm run test:e2e:headed

# Run specific test file
npm run test SearchBox.test.jsx

# Run accessibility tests
npm run test:a11y

# Run performance tests
npm run test:performance`}</code></pre>

            <h3>CI/CD Commands</h3>
            <pre><code className="language-bash">{`# Run all tests for CI
npm run test:ci

# Generate test reports
npm run test:report

# Run security audit
npm audit

# Check bundle size
npm run analyze`}</code></pre>

            <h2>Conclusion</h2>
            <p>Testing is essential for maintaining high-quality documentation. By implementing comprehensive testing strategies including unit tests, integration tests, E2E tests, accessibility testing, and performance testing, you ensure that your Knowledge Pack documentation remains reliable and user-friendly.</p>

            <p>Remember to:</p>
            <ul>
              <li><strong>Start with unit tests</strong> for core functionality</li>
              <li><strong>Add integration tests</strong> for component interactions</li>
              <li><strong>Use E2E tests</strong> for critical user workflows</li>
              <li><strong>Include accessibility testing</strong> for inclusive design</li>
              <li><strong>Monitor performance</strong> regularly</li>
              <li><strong>Automate testing</strong> in your CI/CD pipeline</li>
            </ul>

            <p>For more advanced testing scenarios and troubleshooting, refer to our advanced testing guide or reach out to the community.</p>
          </div>
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  )
}
