import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { AppShell } from '@/components/layout/AppShell';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'DATA VERACE | Evidence-Driven Dataset Analysis',
  description:
    'Scientific dataset analysis platform for identifying integrity defects, statistical anomalies, synthetic-data indicators, and potential manipulation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-canvas-base text-text-primary min-h-screen`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
