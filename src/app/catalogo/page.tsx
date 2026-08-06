'use client';

import React, { useState, useMemo } from 'react';
import produtos from '@/data/produtos';
import { ProductCard } from '@/components/ProductCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { filtrarProdutos } from '@/lib/filters';
import { Gender, Occasion, Climate, Season, FilterOptions } from '@/types';
import { Grid3x3, List } from 'lucide-react';

export default function Catalogo() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'relevancia' | 'preco-asc' | 'preco-desc' | 'novo'>('relevancia');
  const [filtros, setFiltros] = useState<FilterOptions>({
    genero: [],
    marcas: [],
    precoMin: 0,
    precoMax: 1000,
    ocasioes: [],
    clima: undefined,
    estacoes: [],
  });

  React.useEffect(() => {
    const saved = localStorage.getItem('hg-wishlist');
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  const produtosFiltrados = useMemo(() => {
    let resultado = filtrarProdutos(produtos, filtros);

    // Aplicar ordenação
    switch (sortBy) {
      case 'preco-asc':
        resultado = [...resultado].sort(
          (a, b) => Math.min(...Object.values(a.precos)) - Math.min(...Object.values(b.precos))
        );
        break;
      case 'preco-desc':
        resultado = [...resultado].sort(
          (a, b) => Math.max(...Object.values(b.precos)) - Math.max(...Object.values(a.precos))
        );
        break;
      case 'novo':
        resultado = [...resultado].sort((a, b) => b.criadoEm.getTime() - a.criadoEm.getTime());
        break;
      default:
        break;
    }

    return resultado;
  }, [filtros, sortBy]);

  const toggleWishlist = (produtoId: string) => {
    const novaWishlist = wishlist.includes(produtoId)
      ? wishlist.filter(id => id !== produtoId)
      : [...wishlist, produtoId];
    setWishlist(novaWishlist);
    localStorage.setItem('hg-wishlist', JSON.stringify(novaWishlist));
  };

  const handleFilterChange = (novosFiltros: any) => {
    setFiltros(novosFiltros);
  };

  return (
    <div className="min-h-screen bg-hg-cream">
      {/* Header do Catálogo */}
      <section className="bg-gradient-luxury py-12 px-4">
        <div className="container mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-hg-gold mb-4">Catálogo de Perfumes</h1>
          <p className="text-hg-cream text-lg">
            Explore nossa coleção premium com filtros inteligentes
          </p>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar de Filtros */}
          <aside className="md:sticky md:top-24 md:h-fit">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </aside>

          {/* Produtos */}
          <div className="flex-1">
            {/* Controles */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-hg-black">
                  {produtosFiltrados.length} Produtos
                </h2>
              </div>

              <div className="flex items-center gap-4">
                {/* Ordenação */}
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="border border-hg-gray rounded-lg px-4 py-2 text-hg-black focus:outline-none focus:border-hg-gold"
                >
                  <option value="relevancia">Relevância</option>
                  <option value="preco-asc">Menor Preço</option>
                  <option value="preco-desc">Maior Preço</option>
                  <option value="novo">Mais Novo</option>
                </select>

                {/* Modo de Visualização */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-hg-gold text-hg-black'
                        : 'bg-white text-hg-gray hover:text-hg-gold'
                    }`}
                  >
                    <Grid3x3 size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-hg-gold text-hg-black'
                        : 'bg-white text-hg-gray hover:text-hg-gold'
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid de Produtos */}
            {produtosFiltrados.length > 0 ? (
              <div
                className={`grid gap-8 animate-fade-in ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1'
                }`}
              >
                {produtosFiltrados.map(produto => (
                  <ProductCard
                    key={produto.id}
                    produto={produto}
                    onAddToWishlist={toggleWishlist}
                    isFavorito={wishlist.includes(produto.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-hg-black mb-4">
                  Nenhum produto encontrado
                </h3>
                <p className="text-hg-gray">
                  Tente ajustar os filtros para encontrar o que procura.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
