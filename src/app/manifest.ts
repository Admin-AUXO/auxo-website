import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AUXO Data Co. - Strategic Data Intelligence',
    short_name: 'AUXO Data',
    description: 'Transform data chaos into strategic dominance',
    start_url: '/',
    display: 'standalone',
    background_color: '#1A1A1A',
    theme_color: '#9ACD32',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}