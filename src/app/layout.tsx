import type { Metadata } from 'next';
import { Space_Grotesk, DM_Sans, Fraunces, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/effects/ThemeProvider';
import { SmoothScrollProvider } from '@/components/effects/SmoothScrollProvider';
import { FocusManager } from '@/components/effects/FocusManager';
import { PersonalizationProvider } from '@/hooks/usePersonalization';
import { BehaviorTracker } from '@/components/effects/BehaviorTracker';
import dynamic from 'next/dynamic';

// Lazy load MicroInteractionProvider for better initial load
const MicroInteractionProvider = dynamic(
  () => import('@/components/effects/MicroInteractionProvider').then(mod => ({ default: mod.MicroInteractionProvider }))
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

export const metadata: Metadata = {
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Krishna Nihar — Product & New Media Designer',
    description: 'A living portfolio that breathes, remembers, and evolves with you.',
    creator: '@niharsunkara',
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
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} ${fraunces.variable} ${manrope.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* next/font/google automatically handles font optimization and preloading */}
      </head>
      <body
        className={`
          ${dmSans.className}
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

              {/* Micro-interactions system */}
              <MicroInteractionProvider />

              {/* Enhanced focus management */}
              <FocusManager />

              {/* Main content */}
              {children}
            </PersonalizationProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}