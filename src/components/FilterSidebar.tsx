'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Gender, Occasion, Climate, Season } from '@/types';
import { marcas, ocasioes, climas, estacoes } from '@/data/produtos';

interface FilterSidebarProps {
  onFilterChange: (filters: {
    genero: Gender[];
    marcas: string[];
    precoMin: number;
    precoMax: number;
    ocasioes: Occasion[];
    clima: Climate | '';
    estacoes: Season[];
  }) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    genero: true,
    marca: true,
    preco: true,
    ocasiao: true,
    clima: false,
    estacao: false,
  });

  const [filters, setFilters] = useState({
    genero: [] as Gender[],
    marcas: [] as string[],
    precoMin: 0,
    precoMax: 1000,
    ocasioes: [] as Occasion[],
    clima: '' as Climate | '',
    estacoes: [] as Season[],
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleGenderoChange = (genero: Gender) => {
    const novoGenero = filters.genero.includes(genero)
      ? filters.genero.filter(g => g !== genero)
      : [...filters.genero, genero];
    const novosFiltros = { ...filters, genero: novoGenero };
    setFilters(novosFiltros);
    onFilterChange(novosFiltros);
  };

  const handleMarcaChange = (marca: string) => {
    const novasMarcas = filters.marcas.includes(marca)
      ? filters.marcas.filter(m => m !== marca)
      : [...filters.marcas, marca];
    const novosFiltros = { ...filters, marcas: novasMarcas };
    setFilters(novosFiltros);
    onFilterChange(novosFiltros);
  };

  const handlePrecoChange = (tipo: 'min' | 'max', valor: number) => {
    const novosFiltros = {
      ...filters,
      [tipo === 'min' ? 'precoMin' : 'precoMax']: valor,
    };
    setFilters(novosFiltros);
    onFilterChange(novosFiltros);
  };

  const handleOcasiaoChange = (ocasiao: Occasion) => {
    const novasOcasioes = filters.ocasioes.includes(ocasiao)
      ? filters.ocasioes.filter(o => o !== ocasiao)
      : [...filters.ocasioes, ocasiao];
    const novosFiltros = { ...filters, ocasioes: novasOcasioes };
    setFilters(novosFiltros);
    onFilterChange(novosFiltros);
  };

  const handleClimaChange = (clima: Climate) => {
    const novoClima = filters.clima === clima ? '' : clima;
    const novosFiltros = { ...filters, clima: novoClima };
    setFilters(novosFiltros);
    onFilterChange(novosFiltros);
  };

  const handleEstacaoChange = (estacao: Season) => {
    const novasEstacoes = filters.estacoes.includes(estacao)
      ? filters.estacoes.filter(e => e !== estacao)
      : [...filters.estacoes, estacao];
    const novosFiltros = { ...filters, estacoes: novasEstacoes };
    setFilters(novosFiltros);
    onFilterChange(novosFiltros);
  };

  return (
    <div className="w-full md:w-64 bg-hg-cream rounded-lg p-6 h-fit">
      <h2 className="text-2xl font-serif text-hg-black mb-6">Filtros</h2>

      {/* Gênero */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('genero')}
          className="w-full flex items-center justify-between mb-3 hover:text-hg-gold transition-colors"
        >
          <h3 className="font-semibold text-hg-black">Gênero</h3>
          <ChevronDown
            size={18}
            className={`transition-transform ${expandedSections.genero ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.genero && (
          <div className="space-y-2">
            {['masculino', 'feminino', 'unissex'].map(genero => (
              <label key={genero} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.genero.includes(genero as Gender)}
                  onChange={() => handleGenderoChange(genero as Gender)}
                  className="w-4 h-4 rounded border-hg-gray"
                />
                <span className="text-sm text-hg-gray capitalize">
                  {genero === 'masculino' ? '♂ Masculino' : genero === 'feminino' ? '♀ Feminino' : '♧ Unissex'}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Marca */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('marca')}
          className="w-full flex items-center justify-between mb-3 hover:text-hg-gold transition-colors"
        >
          <h3 className="font-semibold text-hg-black">Marca</h3>
          <ChevronDown
            size={18}
            className={`transition-transform ${expandedSections.marca ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.marca && (
          <div className="space-y-2">
            {marcas.map(marca => (
              <label key={marca} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.marcas.includes(marca)}
                  onChange={() => handleMarcaChange(marca)}
                  className="w-4 h-4 rounded border-hg-gray"
                />
                <span className="text-sm text-hg-gray">{marca}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Preço */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('preco')}
          className="w-full flex items-center justify-between mb-3 hover:text-hg-gold transition-colors"
        >
          <h3 className="font-semibold text-hg-black">Preço</h3>
          <ChevronDown
            size={18}
            className={`transition-transform ${expandedSections.preco ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.preco && (
          <div className="space-y-3">
            <div>
              <label className="text-xs text-hg-gray mb-1 block">Mínimo</label>
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.precoMin}
                onChange={e => handlePrecoChange('min', Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm font-semibold text-hg-gold">R$ {filters.precoMin}</span>
            </div>
            <div>
              <label className="text-xs text-hg-gray mb-1 block">Máximo</label>
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.precoMax}
                onChange={e => handlePrecoChange('max', Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm font-semibold text-hg-gold">R$ {filters.precoMax}</span>
            </div>
          </div>
        )}
      </div>

      {/* Ocasião */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('ocasiao')}
          className="w-full flex items-center justify-between mb-3 hover:text-hg-gold transition-colors"
        >
          <h3 className="font-semibold text-hg-black">Ocasião</h3>
          <ChevronDown
            size={18}
            className={`transition-transform ${expandedSections.ocasiao ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.ocasiao && (
          <div className="space-y-2">
            {(ocasioes as Occasion[]).map(ocasiao => (
              <label key={ocasiao} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.ocasioes.includes(ocasiao)}
                  onChange={() => handleOcasiaoChange(ocasiao)}
                  className="w-4 h-4 rounded border-hg-gray"
                />
                <span className="text-sm text-hg-gray capitalize">
                  {ocasiao.replace('-', ' ')}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Clima */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('clima')}
          className="w-full flex items-center justify-between mb-3 hover:text-hg-gold transition-colors"
        >
          <h3 className="font-semibold text-hg-black">Clima</h3>
          <ChevronDown
            size={18}
            className={`transition-transform ${expandedSections.clima ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.clima && (
          <div className="space-y-2">
            {(climas as Climate[]).map(clima => (
              <label key={clima} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="clima"
                  checked={filters.clima === clima}
                  onChange={() => handleClimaChange(clima)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-hg-gray capitalize">
                  {clima === 'quente' ? '☀️ Quente' : clima === 'frio' ? '❄️ Frio' : '♨️ Ambos'}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Estação */}
      <div>
        <button
          onClick={() => toggleSection('estacao')}
          className="w-full flex items-center justify-between mb-3 hover:text-hg-gold transition-colors"
        >
          <h3 className="font-semibold text-hg-black">Estação</h3>
          <ChevronDown
            size={18}
            className={`transition-transform ${expandedSections.estacao ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.estacao && (
          <div className="space-y-2">
            {(estacoes as Season[]).map(estacao => (
              <label key={estacao} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.estacoes.includes(estacao)}
                  onChange={() => handleEstacaoChange(estacao)}
                  className="w-4 h-4 rounded border-hg-gray"
                />
                <span className="text-sm text-hg-gray capitalize">{estacao.replace('-', ' ')}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
