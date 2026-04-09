import type { Metadata } from 'next';
import { Inter, Outfit, Space_Grotesk } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { AnimatedBackground } from '@/components/ui/animated-background';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-ui',
});

export const metadata: Metadata = {
  title: "Siva Sudhamsh Gandikota | AI/ML Engineer & Full-Stack Developer",
  description: "AI Engineer specializing in machine learning, scalable backend systems, and full-stack development. 92% ML accuracy, 99.8% uptime, 500+ users served.",
  keywords: "AI Engineer, Machine Learning, Full-Stack Developer, React, FastAPI, YOLO, Computer Vision, Python, Node.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${outfit.variable} font-body antialiased selection:bg-primary/20`}>
        <AnimatedBackground />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
