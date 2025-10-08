import { NextResponse } from 'next/server'

export async function GET() {
  const config = {
    backend: {
      name: 'github',
      repo: 'mail-drafts7/fumadocs_decapcrm_setup',
      branch: 'main',
      client_id: process.env.GITHUB_CLIENT_ID,
    },
    site_url: process.env.DECAP_SITE_URL || 'http://localhost:3001',
    display_url: process.env.DECAP_DISPLAY_URL || 'http://localhost:3001',
    name: 'decap-cms',
    logo_url: 'https://decapcms.org/img/decap-logo.svg',
    media_folder: 'public/images',
    public_folder: '/images',
    collections: [
      {
        name: 'docs',
        label: 'Documentation',
        folder: 'content/docs',
        create: true,
        slug: '{{slug}}',
        fields: [
          { label: 'Title', name: 'title', widget: 'string' },
          { label: 'Description', name: 'description', widget: 'string', required: false },
          { label: 'Body', name: 'body', widget: 'markdown' },
          { label: 'Order', name: 'order', widget: 'number', required: false }
        ]
      }
    ]
  }

  return NextResponse.json(config)
}
