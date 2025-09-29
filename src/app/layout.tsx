import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/effects/ThemeProvider';
// TEMPORARILY DISABLED FOR DEBUGGING CLICK ISSUES
import { FocusManager } from '@/components/effects/FocusManager';
import { MicroInteractionProvider } from '@/components/effects/MicroInteractionProvider';
// import { ConsciousnessProvider } from '@/components/effects/ConsciousnessProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: {
    default: 'Nihar Sunkara — Product & New Media Designer',
    template: '%s | Nihar Sunkara',
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
  authors: [{ name: 'Nihar Sunkara' }],
  creator: 'Nihar Sunkara',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://niharsunkara.com',
    title: 'Nihar Sunkara — Product & New Media Designer',
    description: 'A living portfolio that breathes, remembers, and evolves with you.',
    siteName: 'Nihar Sunkara Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nihar Sunkara — Product & New Media Designer',
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          as="style"
          crossOrigin=""
        />
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body
        className={`
          ${inter.className}
          min-h-screen antialiased overflow-x-hidden
        `}
        style={{
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)',
        }}
        suppressHydrationWarning
      >
        <ThemeProvider defaultTheme="dark" attribute="data-theme">
          {/* TEMPORARILY DISABLED FOR DEBUGGING CLICK ISSUES */}
          {/* <ConsciousnessProvider> */}
            {/* Micro-interactions system */}
            <MicroInteractionProvider />

            {/* Enhanced focus management */}
            <FocusManager />

            {/* Main content */}
            {children}
          {/* </ConsciousnessProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}