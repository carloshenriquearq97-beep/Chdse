'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
  whatsappNumber?: string;
}

export const Footer: React.FC<FooterProps> = ({ whatsappNumber = '5500000000' }) => {
  return (
    <footer className="bg-gradient-luxury text-hg-cream border-t border-hg-gold mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Sobre */}
          <div>
            <h3 className="text-hg-gold font-serif text-xl mb-4">HG Imports</h3>
            <p className="text-sm text-hg-cream/80">
              Catálogo premium de perfumes e produtos importados. Qualidade e elegância em cada fragrância.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-hg-gold font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-hg-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-hg-gold transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-hg-gold transition-colors">
                  Favoritos
                </Link>
              </li>
            </ul>
          </div>

          {/* Política */}
          <div>
            <h4 className="text-hg-gold font-semibold mb-4">Informações</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-hg-gold transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-hg-gold transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-hg-gold transition-colors">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-hg-gold font-semibold mb-4">Contato</h4>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-hg-gold text-hg-black px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all font-semibold w-fit"
            >
              <MessageCircle size={20} />
              Fale Conosco
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-hg-gold pt-6 text-center text-sm text-hg-cream/70">
          <p>&copy; 2024 HG Imports. Todos os direitos reservados.</p>
          <p>Desenvolvido com ♡ por Copilot</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
