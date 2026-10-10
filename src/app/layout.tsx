import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

import { AnimatedBackground } from '@/components/ui/animated-background';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0b1324',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://sivasudhamsh.dev'),
  title: 'Siva Sudhamsh Gandikota | AI/ML Engineer & Full-Stack Developer',
  description: 'AI/ML Engineer and Full-Stack Developer specializing in computer vision, scalable backend architectures, and intelligent web applications.',
  keywords: [
    'Siva Sudhamsh Gandikota',
    'AI Engineer',
    'Machine Learning',
    'Full-Stack Developer',
    'FastAPI',
    'Next.js',
    'Python',
    'Computer Vision',
    'YOLO',
  ],
  authors: [{ name: 'Siva Sudhamsh Gandikota' }],
  creator: 'Siva Sudhamsh Gandikota',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sivasudhamsh.dev',
    title: 'Siva Sudhamsh Gandikota | AI/ML Engineer & Full-Stack Developer',
    description: 'AI/ML Engineer and Full-Stack Developer specializing in computer vision, scalable backend architectures, and intelligent web applications.',
    siteName: 'Siva Sudhamsh Portfolio',
    images: [
      {
        url: '/icon.png',
        width: 1200,
        height: 630,
        alt: 'Siva Sudhamsh Gandikota - Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siva Sudhamsh Gandikota | AI/ML Engineer & Full-Stack Developer',
    description: 'AI/ML Engineer and Full-Stack Developer specializing in computer vision, scalable backend architectures, and intelligent web applications.',
    images: ['/icon.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icon.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Siva Sudhamsh Gandikota',
  jobTitle: 'AI/ML Engineer & Full-Stack Developer',
  url: 'https://sivasudhamsh.dev',
  sameAs: [
    'https://github.com/Sudhamsh22',
    'https://linkedin.com/in/sivasudhamsh',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Gokaraju Rangaraju Institute of Engineering and Technology',
  },
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'Computer Vision',
    'FastAPI',
    'Next.js',
    'Python',
    'Full-Stack Web Development',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans bg-background text-foreground antialiased selection:bg-primary/25 selection:text-foreground`}
      >
        {/* Skip to Content for screen reader & keyboard accessibility (Part 6.17) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-xl focus:shadow-lg focus:outline-none"
        >
          Skip to content
        </a>
        <LoadingScreen />
        <AnimatedBackground />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
