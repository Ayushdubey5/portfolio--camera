import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  // ✅ Site title
  title: {
    default: 'Portfolio | The Integrty - Creative Content & Growth',
    template: '%s | The Integrty',
  },
  description:
    'Creative content, strategic growth, and real results. Explore our packages and portfolio.',
  keywords: [
    'portfolio',
    'social media',
    'content creation',
    'digital marketing',
    'pricing',
    'theintegrty',
  ],
  authors: [{ name: 'The Integrty' }],

  // ✅ Browser tab icon
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },

  // ✅ Canonical site URL
  metadataBase: new URL('https://portfolio.theintegrty.com'),

  // ✅ Open Graph (Facebook, WhatsApp, LinkedIn previews)
  openGraph: {
    title: 'Portfolio | The Integrty - Creative Content & Growth',
    description: 'Creative content, strategic growth, and real results.',
    url: 'https://portfolio.theintegrty.com',
    siteName: 'The Integrty',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'The Integrty Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // ✅ Twitter / X card
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | The Integrty',
    description: 'Creative content, strategic growth, and real results.',
    images: ['/logo.png'],
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-[#0a0a0a] text-white">
        
        {children}
      </body>
    </html>
  )
}