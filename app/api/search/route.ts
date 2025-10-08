import { createSearchAPI } from 'fumadocs-core/search/server'
import { docs } from '@/source.config'

export const { GET } = createSearchAPI('simple', {
  indexes: docs.files?.map((page: any) => ({
    title: page.data.title,
    content: page.data.description || '',
    structuredData: page.data,
    id: page.url,
    url: page.url,
  })) || [],
})
