'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Search, Menu } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  cartCount?: number;
  wishlistCount?: number;
  onSearchChange?: (termo: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount = 0,
  wishlistCount = 0,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <header className="bg-gradient-luxury text-hg-cream sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          {/* Logo */}
          <Link href="/" className="flex-1">
            <div className="font-serif text-3xl font-bold text-hg-gold hover:opacity-80 transition-opacity">
              HG Imports
            </div>
          </Link>

          {/* Menu Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-hg-gold hover:text-white transition-colors"
          >
            <Menu size={24} />
          </button>

          {/* Ícones Direita */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/catalogo" className="hover:text-hg-gold transition-colors">
              Catálogo
            </Link>
            <Link href="/wishlist" className="flex items-center gap-2 hover:text-hg-gold transition-colors">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="bg-hg-gold text-hg-black text-xs font-bold px-2 py-1 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Barra de Busca */}
        <div className="flex items-center bg-hg-cream rounded-lg px-4 py-2">
          <Search size={20} className="text-hg-gray" />
          <input
            type="text"
            placeholder="Buscar perfume, marca..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearchChange?.(e.target.value);
            }}
            className="flex-1 bg-transparent ml-3 text-hg-black placeholder-hg-gray outline-none"
          />
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 border-t border-hg-black pt-4">
            <Link href="/catalogo" className="block hover:text-hg-gold transition-colors">
              Catálogo
            </Link>
            <Link href="/wishlist" className="block hover:text-hg-gold transition-colors">
              Favoritos ({wishlistCount})
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
