import type { Metadata } from 'next';
import { Inter, Playfair_Display, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'HG Imports - Catálogo Digital de Perfumes Premium',
  description: 'Descubra nossa coleção premium de perfumes e produtos importados. Catálogo elegante, responsivo e compartilhável.',
  keywords: ['perfumes', 'importados', 'fragrâncias', 'luxo', 'HG Imports'],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://hgimports.com.br',
    siteName: 'HG Imports',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${playfair.variable}`}>
      <body className={`${poppins.className} bg-hg-cream`}>
        <Header wishlistCount={0} />
        <main>{children}</main>
        <Footer whatsappNumber="5500000000" />
      </body>
    </html>
  );
}
