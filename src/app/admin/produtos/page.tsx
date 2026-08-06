'use client';

import React, { useState } from 'react';
import produtos from '@/data/produtos';
import { formatarPreco, obterPrecoMenor } from '@/lib/filters';
import { Edit2, Trash2, Plus, Search } from 'lucide-react';

export default function AdminProdutos() {
  const [listaprodutos, setListaProdutos] = useState(produtos);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    marca: '',
    genero: 'masculino' as const,
    descricao: '',
    familiaOlfativa: '',
    intensidade: 'moderada' as const,
    estoque: 0,
    destaque: false,
    promocao: false,
    percentualPromocao: 0,
  });

  const filtrados = listaprodutos.filter(
    p => p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.marca.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditarProduto = (id: string) => {
    const produto = listaprodutos.find(p => p.id === id);
    if (produto) {
      setFormData({
        nome: produto.nome,
        marca: produto.marca,
        genero: produto.genero,
        descricao: produto.descricao,
        familiaOlfativa: produto.familiaOlfativa,
        intensidade: produto.intensidade,
        estoque: produto.estoque,
        destaque: produto.destaque || false,
        promocao: !!produto.promocao,
        percentualPromocao: produto.promocao?.percentual || 0,
      });
      setEditandoId(id);
      setShowForm(true);
    }
  };

  const handleDeletarProduto = (id: string) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      setListaProdutos(listaprodutos.filter(p => p.id !== id));
    }
  };

  const handleSalvarProduto = (e: React.FormEvent) => {
    e.preventDefault();
    if (editandoId) {
      setListaProdutos(
        listaProducts.map(p => (p.id === editandoId ? { ...p, ...formData } : p))
      );
      setEditandoId(null);
    }
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      marca: '',
      genero: 'masculino',
      descricao: '',
      familiaOlfativa: '',
      intensidade: 'moderada',
      estoque: 0,
      destaque: false,
      promocao: false,
      percentualPromocao: 0,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-4xl text-hg-black">Gerenciamento de Produtos</h1>
        <button
          onClick={() => {
            resetForm();
            setEditandoId(null);
            setShowForm(!showForm);
          }}
          className="bg-hg-gold text-hg-black px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Novo Produto
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold text-hg-black mb-6">
            {editandoId ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <form onSubmit={handleSalvarProduto} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="border border-hg-gray rounded-lg px-4 py-2 focus:outline-none focus:border-hg-gold"
              required
            />
            <input
              type="text"
              placeholder="Marca"
              value={formData.marca}
              onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
              className="border border-hg-gray rounded-lg px-4 py-2 focus:outline-none focus:border-hg-gold"
              required
            />
            <select
              value={formData.genero}
              onChange={(e) => setFormData({ ...formData, genero: e.target.value as any })}
              className="border border-hg-gray rounded-lg px-4 py-2 focus:outline-none focus:border-hg-gold"
            >
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="unissex">Unissex</option>
            </select>
            <input
              type="number"
              placeholder="Estoque"
              value={formData.estoque}
              onChange={(e) => setFormData({ ...formData, estoque: Number(e.target.value) })}
              className="border border-hg-gray rounded-lg px-4 py-2 focus:outline-none focus:border-hg-gold"
              required
            />
            <textarea
              placeholder="Descrição"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="md:col-span-2 border border-hg-gray rounded-lg px-4 py-2 focus:outline-none focus:border-hg-gold resize-none"
              rows={3}
              required
            />
            <input
              type="text"
              placeholder="Família Olfativa"
              value={formData.familiaOlfativa}
              onChange={(e) => setFormData({ ...formData, familiaOlfativa: e.target.value })}
              className="md:col-span-2 border border-hg-gray rounded-lg px-4 py-2 focus:outline-none focus:border-hg-gold"
              required
            />
            <div className="md:col-span-2 flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.destaque}
                  onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
                />
                <span>Marcar como Destaque</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.promocao}
                  onChange={(e) => setFormData({ ...formData, promocao: e.target.checked })}
                />
                <span>Adicionar Promoção</span>
              </label>
            </div>
            {formData.promocao && (
              <input
                type="number"
                placeholder="Percentual de Desconto"
                value={formData.percentualPromocao}
                onChange={(e) => setFormData({ ...formData, percentualPromocao: Number(e.target.value) })}
                className="border border-hg-gray rounded-lg px-4 py-2 focus:outline-none focus:border-hg-gold"
                min="0"
                max="100"
              />
            )}
            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-hg-gold text-hg-black py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-hg-gray text-white py-2 rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Busca */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-hg-gray" size={20} />
          <input
            type="text"
            placeholder="Buscar por nome ou marca..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-hg-gray rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-hg-gold"
          />
        </div>
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-hg-cream">
              <th className="text-left py-4 px-6 font-semibold text-hg-black">Produto</th>
              <th className="text-left py-4 px-6 font-semibold text-hg-black">Marca</th>
              <th className="text-left py-4 px-6 font-semibold text-hg-black">Preço</th>
              <th className="text-left py-4 px-6 font-semibold text-hg-black">Estoque</th>
              <th className="text-left py-4 px-6 font-semibold text-hg-black">Status</th>
              <th className="text-left py-4 px-6 font-semibold text-hg-black">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map(produto => (
              <tr key={produto.id} className="border-b hover:bg-hg-cream transition-colors">
                <td className="py-4 px-6 text-hg-black font-semibold">{produto.nome}</td>
                <td className="py-4 px-6 text-hg-gray">{produto.marca}</td>
                <td className="py-4 px-6 text-hg-black">{formatarPreco(obterPrecoMenor(produto.precos))}</td>
                <td className="py-4 px-6">
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
                <td className="py-4 px-6">
                  <div className="flex gap-2">
                    {produto.destaque && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">⭐ Destaque</span>
                    )}
                    {produto.promocao && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">-{produto.promocao.percentual}%</span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6 flex gap-2">
                  <button
                    onClick={() => handleEditarProduto(produto.id)}
                    className="p-2 hover:bg-hg-cream rounded transition-colors text-hg-gold"
                    title="Editar"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeletarProduto(produto.id)}
                    className="p-2 hover:bg-red-100 rounded transition-colors text-red-500"
                    title="Deletar"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
