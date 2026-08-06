'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import produtos from '@/data/produtos';
import { ProductCard } from '@/components/ProductCard';

export default function Home() {
  const [destaque, setDestaque] = useState<typeof produtos>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const produtosDestaque = produtos.filter(p => p.destaque).slice(0, 6);
    setDestaque(produtosDestaque);

    // Carrega wishlist do localStorage
    const saved = localStorage.getItem('hg-wishlist');
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  const toggleWishlist = (produtoId: string) => {
    const novaWishlist = wishlist.includes(produtoId)
      ? wishlist.filter(id => id !== produtoId)
      : [...wishlist, produtoId];
    setWishlist(novaWishlist);
    localStorage.setItem('hg-wishlist', JSON.stringify(novaWishlist));
  };

  return (
    <div>
      {/* Banner Principal */}
      <section className="relative h-[500px] md:h-[600px] bg-gradient-luxury overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1200&h=600&fit=crop"
          alt="Banner de Perfumes Premium"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-5xl md:text-7xl text-hg-gold mb-4 font-bold">
            HG Imports
          </h1>
          <p className="text-xl md:text-2xl text-hg-cream mb-8 max-w-2xl">
            Descubra a elegância em cada fragrância. Catálogo premium de perfumes importados.
          </p>
          <Link
            href="/catalogo"
            className="bg-hg-gold text-hg-black px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center gap-2 group"
          >
            Explorar Catálogo
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Apresentação */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-hg-gold" size={24} />
            <h2 className="font-serif text-4xl text-hg-black">Bem-vindo à HG Imports</h2>
            <Sparkles className="text-hg-gold" size={24} />
          </div>
          <p className="text-lg text-hg-gray mb-6">
            Somos especialistas em fragrâncias premium e produtos importados de qualidade. Cada perfume em nosso
            catálogo é cuidadosamente selecionado para oferecer o melhor em sofisticação e elegância.
          </p>
          <p className="text-hg-gray">
            Compartilhe nossos produtos com seus amigos através do WhatsApp, Instagram e Facebook. Cada
            fragrância possui sua própria página com descrição detalhada, notas olfativas e características
            especiais.
          </p>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-16 px-4 bg-hg-cream">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-hg-black mb-4">Destaques do Catálogo</h2>
            <p className="text-hg-gray max-w-2xl mx-auto">
              Conheça as fragrâncias mais procuradas e sofisticadas da nossa coleção premium.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destaque.map(produto => (
              <ProductCard
                key={produto.id}
                produto={produto}
                onAddToWishlist={toggleWishlist}
                isFavorito={wishlist.includes(produto.id)}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/catalogo"
              className="inline-block bg-hg-gold text-hg-black px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              Ver Todos os Produtos
            </Link>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="font-serif text-4xl text-hg-black text-center mb-12">Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                numero: '1',
                titulo: 'Explore',
                descricao: 'Navegue pelo nosso catálogo com filtros inteligentes para encontrar o perfume perfeito.',
              },
              {
                numero: '2',
                titulo: 'Compartilhe',
                descricao: 'Compartilhe produtos diretamente pelo WhatsApp, Instagram ou Facebook com um único clique.',
              },
              {
                numero: '3',
                titulo: 'Compre',
                descricao: 'Fale conosco via WhatsApp para solicitar informações, orçamentos e efetuar sua compra.',
              },
            ].map(item => (
              <div key={item.numero} className="bg-hg-cream rounded-lg p-8 text-center">
                <div className="w-12 h-12 bg-hg-gold text-hg-black rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {item.numero}
                </div>
                <h3 className="font-semibold text-hg-black mb-2 text-lg">{item.titulo}</h3>
                <p className="text-hg-gray">{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-luxury">
        <div className="container mx-auto text-center">
          <h2 className="font-serif text-4xl text-hg-gold mb-6">Pronto para Descobrir Sua Fragrância Perfeita?</h2>
          <p className="text-hg-cream text-lg mb-8 max-w-2xl mx-auto">
            Explore nosso catálogo completo e encontre o perfume que melhor representa seu estilo.
          </p>
          <Link
            href="/catalogo"
            className="inline-block bg-hg-gold text-hg-black px-10 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            Acessar Catálogo
          </Link>
        </div>
      </section>
    </div>
  );
}
