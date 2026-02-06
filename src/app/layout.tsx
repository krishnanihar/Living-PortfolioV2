import type { Metadata } from 'next';
import { Space_Grotesk, DM_Sans, Newsreader, Urbanist, Fraunces, Manrope, JetBrains_Mono, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/effects/ThemeProvider';
import { SmoothScrollProvider } from '@/components/effects/SmoothScrollProvider';
import { FocusManager } from '@/components/effects/FocusManager';
import { PersonalizationProvider } from '@/hooks/usePersonalization';
import { BehaviorTracker } from '@/components/effects/BehaviorTracker';
import { ChatProvider } from '@/contexts/ChatContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import dynamic from 'next/dynamic';

// Lazy load MicroInteractionProvider for better initial load
const MicroInteractionProvider = dynamic(
  () => import('@/components/effects/MicroInteractionProvider').then(mod => ({ default: mod.MicroInteractionProvider }))
);

// Lazy load GlobalChatbot for performance
const GlobalChatbot = dynamic(
  () => import('@/components/GlobalChatbot').then(mod => ({ default: mod.GlobalChatbot }))
);

// Lazy load Konami code easter egg
const KonamiCodeListener = dynamic(
  () => import('@/hooks/useKonamiCode').then(mod => ({ default: mod.KonamiCodeListener }))
);

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '500', '600', '700'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600'],
});

// New primary fonts
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
  axes: ['opsz'],
});

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  display: 'swap',
  style: ['normal', 'italic'],
});

// Journey Timeline fonts
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'], // Enable optical sizing and soft axes
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

// Cleara case study - Serif font for poetic typography
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://knihar.io'),
  title: {
    default: 'Krishna Nihar — Product & New Media Designer',
    template: '%s | Krishna Nihar',
  },
  description: 'A living portfolio that breathes, remembers, and evolves with you. Product & New Media Designer specializing in design systems, aviation UX, and consciousness-aware interfaces.',
  keywords: [
    'Product Designer',
    'New Media Designer',
    'Design Systems',
    'Aviation UX',
    'Air India',
    'Portfolio',
    'UI/UX Design',
    'Design Leadership',
  ],
  authors: [{ name: 'Krishna Nihar' }],
  creator: 'Krishna Nihar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://niharsunkara.com',
    title: 'Krishna Nihar — Product & New Media Designer',
    description: 'A living portfolio that breathes, remembers, and evolves with you.',
    siteName: 'Krishna Nihar Portfolio',
    images: [{
      url: '/images/og.jpeg',
      width: 1200,
      height: 630,
      alt: 'Krishna Nihar - Product & New Media Designer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Krishna Nihar — Product & New Media Designer',
    description: 'A living portfolio that breathes, remembers, and evolves with you.',
    creator: '@niharsunkara',
    images: ['/images/og.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${urbanist.variable} ${spaceGrotesk.variable} ${dmSans.variable} ${fraunces.variable} ${manrope.variable} ${jetbrainsMono.variable} ${cormorantGaramond.variable}`} suppressHydrationWarning>
      <head>
        {/* next/font/google automatically handles font optimization and preloading */}

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Person',
                  '@id': 'https://knihar.io/#person',
                  name: 'Krishna Nihar',
                  jobTitle: 'Product & New Media Designer',
                  url: 'https://knihar.io',
                  description: 'Product & New Media Designer specializing in design systems, aviation UX, and consciousness-aware interfaces.',
                  sameAs: [
                    'https://twitter.com/niharsunkara',
                    'https://linkedin.com/in/niharsunkara',
                    'https://github.com/krishnanihar',
                  ],
                  knowsAbout: [
                    'Product Design',
                    'Design Systems',
                    'Aviation UX',
                    'User Experience',
                    'New Media Art',
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://knihar.io/#website',
                  url: 'https://knihar.io',
                  name: 'Krishna Nihar Portfolio',
                  description: 'A living portfolio that breathes, remembers, and evolves with you.',
                  publisher: {
                    '@id': 'https://knihar.io/#person',
                  },
                  inLanguage: 'en-US',
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`
          ${urbanist.className}
          min-h-screen antialiased overflow-x-hidden
        `}
        style={{
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)',
        }}
        suppressHydrationWarning
      >
        <ThemeProvider defaultTheme="dark" attribute="data-theme">
          {/* Smooth scrolling with Lenis */}
          <SmoothScrollProvider>
            {/* Personalization system */}
            <PersonalizationProvider>
              {/* Behavioral tracking (invisible) */}
              <BehaviorTracker />

              {/* Konami code easter egg (invisible) */}
              <KonamiCodeListener />

              {/* Micro-interactions system */}
              <MicroInteractionProvider />

              {/* Enhanced focus management */}
              <FocusManager />

              {/* Chat context for mobile integration */}
              <ChatProvider>
                {/* Main content */}
                {children}

                {/* Global context-aware chatbot */}
                <GlobalChatbot />
              </ChatProvider>
            </PersonalizationProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}