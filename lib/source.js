import { docs } from '../source.config'
import { loader } from 'fumadocs-core/source'

export const { getPage, getPages, pageTree } = loader({
  baseUrl: '/',
  source: docs
})
