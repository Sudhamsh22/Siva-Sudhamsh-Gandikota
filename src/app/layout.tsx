import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/20">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
