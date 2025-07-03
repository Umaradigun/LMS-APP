import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/lib/theme-provider';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'EduFlow - Learning Management System',
  description: 'A comprehensive learning management system with multi-role support, payment integration, and course management capabilities.',
  keywords: ['education', 'learning', 'courses', 'LMS', 'online learning'],
  authors: [{ name: 'EduFlow Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          defaultTheme="light"
          storageKey="eduflow-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}