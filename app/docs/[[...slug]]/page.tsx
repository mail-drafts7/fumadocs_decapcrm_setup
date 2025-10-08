import type { Metadata } from 'next'
import { DocsPage, DocsBody } from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import { docs } from '@/source.config'

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const pageSlug = slug?.join('/') || 'getting-started'
  
  // Find the page in the docs collection
  const allPages = Array.from(docs as any)
  const page = allPages.find((p: any) => p.slugs.join('/') === pageSlug)

  if (!page) {
    notFound()
  }

  const MDXContent = (page as any).data.body

  return (
    <DocsPage toc={(page as any).data.toc}>
      <DocsBody>
        <h1>{(page as any).data.title}</h1>
        {(page as any).data.description && (
          <p className="text-lg text-muted-foreground mb-4">
            {(page as any).data.description}
          </p>
        )}
        <MDXContent />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const pageSlug = slug?.join('/') || 'getting-started'
  
  const allPages = Array.from(docs as any)
  const page = allPages.find((p: any) => p.slugs.join('/') === pageSlug)

  if (!page) notFound()

  return {
    title: (page as any).data.title,
    description: (page as any).data.description,
  }
}

export function generateStaticParams() {
  // Use type assertion to work around TypeScript issues with DocCollection
  const pages = (docs as any).pages || []
  return pages.map((page: any) => ({
    slug: page.slugs,
  }))
}
