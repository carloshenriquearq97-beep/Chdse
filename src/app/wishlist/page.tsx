'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, ShoppingBag } from 'lucide-react';
import produtos from '@/data/produtos';
import { ProductCard } from '@/components/ProductCard';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [produtosFavoritos, setProdutosFavoritos] = useState<typeof produtos>([]);

  useEffect(() => {
    const saved = localStorage.getItem('hg-wishlist');
    if (saved) {
      const ids = JSON.parse(saved);
      setWishlist(ids);
      const favoritos = produtos.filter(p => ids.includes(p.id));
      setProdutosFavoritos(favoritos);
    }
  }, []);

  const removerDoWishlist = (produtoId: string) => {
    const novaWishlist = wishlist.filter(id => id !== produtoId);
    setWishlist(novaWishlist);
    localStorage.setItem('hg-wishlist', JSON.stringify(novaWishlist));
    setProdutosFavoritos(produtos.filter(p => novaWishlist.includes(p.id)));
  };

  const toggleWishlist = (produtoId: string) => {
    removerDoWishlist(produtoId);
  };

  return (
    <div className="min-h-screen bg-hg-cream">
      {/* Header */}
      <section className="bg-gradient-luxury py-12 px-4">
        <div className="container mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-hg-gold mb-4">Meus Favoritos</h1>
          <p className="text-hg-cream text-lg">
            {produtosFavoritos.length} produto{produtosFavoritos.length !== 1 ? 's' : ''} na sua lista de desejos
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 py-12">
        {produtosFavoritos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {produtosFavoritos.map(produto => (
                <div key={produto.id} className="relative">
                  <ProductCard
                    produto={produto}
                    onAddToWishlist={toggleWishlist}
                    isFavorito={true}
                  />
                  <button
                    onClick={() => removerDoWishlist(produto.id)}
                    className="absolute top-4 left-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors z-10"
                    title="Remover dos favoritos"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="bg-white rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold text-hg-black mb-4">Pronto para Comprar?</h2>
              <p className="text-hg-gray mb-6">
                Entre em contato conosco via WhatsApp para solicitar informações, orçamentos e efetuar sua compra.
              </p>
              <a
                href="https://wa.me/5500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2 justify-center"
              >
                <ShoppingBag size={20} />
                Fale Conosco no WhatsApp
              </a>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-semibold text-hg-black mb-4">Sua lista de favoritos está vazia</h2>
            <p className="text-hg-gray mb-8">
              Explore nosso catálogo e adicione perfumes aos seus favoritos!
            </p>
            <Link
              href="/catalogo"
              className="inline-block bg-hg-gold text-hg-black px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              Explorar Catálogo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
