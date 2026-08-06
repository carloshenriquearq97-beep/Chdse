'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { Product } from '@/types';
import { formatarPreco, obterPrecoMenor } from '@/lib/filters';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  produto: Product;
  onAddToWishlist?: (produtoId: string) => void;
  isFavorito?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  produto,
  onAddToWishlist,
  isFavorito = false,
}) => {
  const precoMenor = obterPrecoMenor(produto.precos);
  const precoComDesconto = produto.promocao
    ? precoMenor - (precoMenor * produto.promocao.percentual) / 100
    : precoMenor;

  return (
    <Link href={`/produto/${produto.slug}`}>
      <div className="group cursor-pointer rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 h-full">
        {/* Imagem do Produto */}
        <div className="relative h-64 bg-hg-cream overflow-hidden">
          <Image
            src={produto.fotoUrl}
            alt={produto.nome}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {produto.promocao && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{produto.promocao.percentual}%
            </div>
          )}
          {produto.destaque && (
            <div className="absolute top-4 left-4 bg-hg-gold text-hg-black px-3 py-1 rounded-full text-xs font-bold">
              ✨ Destaque
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToWishlist?.(produto.id);
            }}
            className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-hg-gold transition-colors duration-200"
          >
            <Star
              size={20}
              className={isFavorito ? 'fill-hg-gold text-hg-gold' : 'text-hg-gray'}
            />
          </button>
        </div>

        {/* Informações do Produto */}
        <div className="p-4">
          <p className="text-sm text-hg-gray mb-1">{produto.marca}</p>
          <h3 className="text-lg font-semibold text-hg-black mb-2 truncate">{produto.nome}</h3>

          {/* Gênero */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block px-2 py-1 bg-hg-cream text-hg-black text-xs rounded-full font-medium">
              {produto.genero === 'masculino'
                ? '♂ Masculino'
                : produto.genero === 'feminino'
                  ? '♀ Feminino'
                  : '♧ Unissex'}
            </span>
          </div>

          {/* Avaliações Rápidas */}
          <div className="flex justify-between text-xs mb-3 text-hg-gray">
            <div className="flex items-center gap-1">
              <span>Fixação:</span>
              <span className="text-hg-gold">{'⭐'.repeat(produto.avaliacoes.fixacao)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Projeção:</span>
              <span className="text-hg-gold">{'⭐'.repeat(produto.avaliacoes.projecao)}</span>
            </div>
          </div>

          {/* Preço */}
          <div className="border-t pt-3">
            {produto.promocao ? (
              <div className="flex items-center gap-2">
                <span className="text-sm line-through text-hg-gray">{formatarPreco(precoMenor)}</span>
                <span className="text-xl font-bold text-hg-gold">{formatarPreco(precoComDesconto)}</span>
              </div>
            ) : (
              <span className="text-xl font-bold text-hg-black">A partir de {formatarPreco(precoMenor)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
