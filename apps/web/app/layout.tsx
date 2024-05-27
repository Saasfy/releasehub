import './global.css';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata } from 'next';

import { Analytics } from '@vercel/analytics/react';

import { ThemeProvider } from '@releasehub/components';
import { Toaster } from '@releasehub/ui/toaster';

export const metadata: Metadata = {
  title: {
    default: 'ReleaseHub',
    template: `%s | ReleaseHub`,
  },
  description: 'ReleaseHub is a new way to show your software changelog.',
  applicationName: 'ReleaseHub',
  authors: {
    url: 'https://github.com/IKatsuba',
    name: 'Igor Katsuba',
  },
  creator: 'Igor Katsuba',
  keywords: ['saas', 'nextjs', 'typescript', 'changelog'],
  metadataBase: new URL('https://releasehub.dev'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
