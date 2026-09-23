import type { Metadata, Viewport } from 'next';
import { Lilita_One, Nunito, Press_Start_2P } from 'next/font/google';
import { EVENT } from '@/content/event';
import ClientLayout from './ClientLayout';
import './globals.css';

const display = Lilita_One({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const body = Nunito({ subsets: ['latin'], variable: '--font-body' });
const pixel = Press_Start_2P({ subsets: ['latin'], weight: '400', variable: '--font-pixel' });

export const metadata: Metadata = {
  title: `${EVENT.name} — ¿Qué piloto eres?`,
  description: `${EVENT.tagline}. Kruger Tech + Microsoft.`,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A6CE0',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} ${pixel.variable}`}>
      <body className="min-h-dvh antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
