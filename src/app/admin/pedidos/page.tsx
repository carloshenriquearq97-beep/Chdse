'use client';

import React, { useState } from 'react';
import { formatarPreco } from '@/lib/filters';
import { CheckCircle, Clock, Truck, Package } from 'lucide-react';

interface Order {
  id: string;
  nomeCliente: string;
  telefonePessoa: string;
  items: Array<{
    produtoId: string;
    volume: string;
    quantidade: number;
    preco: number;
  }>;
  total: number;
  status: 'pendente' | 'confirmado' | 'enviado' | 'entregue';
  criadoEm: Date;
  observacoes?: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    nomeCliente: 'João Silva',
    telefonePessoa: '5511999999999',
    items: [
      { produtoId: '1', volume: '100ml', quantidade: 1, preco: 349.90 },
    ],
    total: 349.90,
    status: 'confirmado',
    criadoEm: new Date('2024-03-15'),
    observacoes: 'Entregar em horário comercial',
  },
  {
    id: '2',
    nomeCliente: 'Maria Santos',
    telefonePessoa: '5521988888888',
    items: [
      { produtoId: '2', volume: '50ml', quantidade: 2, preco: 349.90 },
    ],
    total: 699.80,
    status: 'pendente',
    criadoEm: new Date('2024-03-16'),
  },
];

export default function AdminPedidos() {
  const [pedidos] = useState<Order[]>(mockOrders);
  const [filtroStatus, setFiltroStatus] = useState<'todos' | 'pendente' | 'confirmado' | 'enviado' | 'entregue'>('todos');

  const pedidosFiltrados = pedidos.filter(
    p => filtroStatus === 'todos' || p.status === filtroStatus
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pendente':
        return <Clock className="text-yellow-500" size={20} />;
      case 'confirmado':
        return <CheckCircle className="text-blue-500" size={20} />;
      case 'enviado':
        return <Truck className="text-purple-500" size={20} />;
      case 'entregue':
        return <Package className="text-green-500" size={20} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-700';
      case 'confirmado':
        return 'bg-blue-100 text-blue-700';
      case 'enviado':
        return 'bg-purple-100 text-purple-700';
      case 'entregue':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <h1 className="font-serif text-4xl text-hg-black mb-8">Pedidos</h1>

      {/* Filtros */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {(['todos', 'pendente', 'confirmado', 'enviado', 'entregue'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFiltroStatus(status)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filtroStatus === status
                ? 'bg-hg-gold text-hg-black'
                : 'bg-white text-hg-gray hover:bg-hg-cream'
            }`}
          >
            {status === 'todos' ? 'Todos' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Tabela de Pedidos */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {pedidosFiltrados.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b bg-hg-cream">
                <th className="text-left py-4 px-6 font-semibold text-hg-black">ID do Pedido</th>
                <th className="text-left py-4 px-6 font-semibold text-hg-black">Cliente</th>
                <th className="text-left py-4 px-6 font-semibold text-hg-black">Itens</th>
                <th className="text-left py-4 px-6 font-semibold text-hg-black">Total</th>
                <th className="text-left py-4 px-6 font-semibold text-hg-black">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-hg-black">Data</th>
              </tr>
            </thead>
            <tbody>
              {pedidosFiltrados.map(pedido => (
                <tr key={pedido.id} className="border-b hover:bg-hg-cream transition-colors">
                  <td className="py-4 px-6 text-hg-black font-semibold">#{pedido.id}</td>
                  <td className="py-4 px-6">
                    <div className="text-hg-black font-semibold">{pedido.nomeCliente}</div>
                    <a
                      href={`https://wa.me/${pedido.telefonePessoa}`}
                      className="text-hg-gold hover:underline text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {pedido.telefonePessoa}
                    </a>
                  </td>
                  <td className="py-4 px-6 text-hg-gray">{pedido.items.length} item(ns)</td>
                  <td className="py-4 px-6 text-hg-black font-semibold">{formatarPreco(pedido.total)}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(pedido.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(pedido.status)}`}>
                        {pedido.status.charAt(0).toUpperCase() + pedido.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-hg-gray text-sm">
                    {new Date(pedido.criadoEm).toLocaleDateString('pt-BR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center">
            <p className="text-hg-gray">Nenhum pedido encontrado com este filtro.</p>
          </div>
        )}
      </div>
    </div>
  );
}
