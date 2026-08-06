'use client';

import React, { useState, useEffect } from 'react';
import produtos from '@/data/produtos';
import { formatarPreco, obterPrecoMenor } from '@/lib/filters';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProdutos: 0,
    produtosDestaque: 0,
    produtosComPromocao: 0,
    estoqueBaixo: 0,
  });

  useEffect(() => {
    setStats({
      totalProdutos: produtos.length,
      produtosDestaque: produtos.filter(p => p.destaque).length,
      produtosComPromocao: produtos.filter(p => p.promocao).length,
      estoqueBaixo: produtos.filter(p => p.estoque < 10).length,
    });
  }, []);

  const cards = [
    {
      titulo: 'Total de Produtos',
      valor: stats.totalProdutos,
      icon: '🧴',
      cor: 'bg-blue-100 text-blue-600',
    },
    {
      titulo: 'Produtos em Destaque',
      valor: stats.produtosDestaque,
      icon: '⭐',
      cor: 'bg-yellow-100 text-yellow-600',
    },
    {
      titulo: 'Com Promoção',
      valor: stats.produtosComPromocao,
      icon: '🏷️',
      cor: 'bg-red-100 text-red-600',
    },
    {
      titulo: 'Estoque Baixo',
      valor: stats.estoqueBaixo,
      icon: '⚠️',
      cor: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-4xl text-hg-black mb-8">Dashboard</h1>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-hg-gray text-sm font-semibold">{card.titulo}</p>
                <p className="text-4xl font-bold text-hg-black mt-2">{card.valor}</p>
              </div>
              <div className={`text-4xl ${card.cor} rounded-lg p-4`}>{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumo de Produtos */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-hg-black mb-6">Produtos Recentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-hg-black">Produto</th>
                <th className="text-left py-3 px-4 font-semibold text-hg-black">Marca</th>
                <th className="text-left py-3 px-4 font-semibold text-hg-black">Preço</th>
                <th className="text-left py-3 px-4 font-semibold text-hg-black">Estoque</th>
                <th className="text-left py-3 px-4 font-semibold text-hg-black">Status</th>
              </tr>
            </thead>
            <tbody>
              {produtos.slice(0, 5).map(produto => (
                <tr key={produto.id} className="border-b hover:bg-hg-cream transition-colors">
                  <td className="py-3 px-4 text-hg-black font-semibold">{produto.nome}</td>
                  <td className="py-3 px-4 text-hg-gray">{produto.marca}</td>
                  <td className="py-3 px-4 text-hg-black">{formatarPreco(obterPrecoMenor(produto.precos))}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        produto.estoque > 10
                          ? 'bg-green-100 text-green-700'
                          : produto.estoque > 0
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {produto.estoque} un.
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="flex gap-2">
                      {produto.destaque && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">⭐ Destaque</span>
                      )}
                      {produto.promocao && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">🏷️ Promo</span>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
