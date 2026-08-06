'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Share2, MessageCircle, Copy, Check } from 'lucide-react';
import produtos from '@/data/produtos';
import { formatarPreco, obterPrecoMenor, aplicarDesconto } from '@/lib/filters';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProdutoPage({ params }: PageProps) {
  const { slug } = React.use(params);
  const [volume, setVolume] = useState<string>('');
  const [isFavorito, setIsFavorito] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [shareOpen, setShareOpen] = useState(false);

  const produto = produtos.find(p => p.slug === slug);

  useEffect(() => {
    if (produto && !volume) {
      setVolume(produto.volume[0]);
    }
    const saved = localStorage.getItem('hg-wishlist');
    if (saved) {
      setWishlist(JSON.parse(saved));
      if (produto) {
        setIsFavorito(JSON.parse(saved).includes(produto.id));
      }
    }
  }, [produto, volume]);

  if (!produto) {
    notFound();
  }

  const precoAtual = produto.precos[volume];
  const precoComDesconto = produto.promocao ? aplicarDesconto(precoAtual, produto.promocao.percentual) : precoAtual;
  const urlProduto = `${typeof window !== 'undefined' ? window.location.origin : ''}/produto/${produto.slug}`;

  const toggleWishlist = () => {
    let novaWishlist = wishlist;
    if (isFavorito) {
      novaWishlist = wishlist.filter(id => id !== produto.id);
    } else {
      novaWishlist = [...wishlist, produto.id];
    }
    setWishlist(novaWishlist);
    setIsFavorito(!isFavorito);
    localStorage.setItem('hg-wishlist', JSON.stringify(novaWishlist));
  };

  const copiarLink = () => {
    navigator.clipboard.writeText(urlProduto);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const compartilharWhatsApp = () => {
    const mensagem = encodeURIComponent(
      `Confira este perfume: *${produto.nome}* (${produto.marca})\n\n${produto.descricao}\n\nAcesse: ${urlProduto}`
    );
    window.open(`https://wa.me/?text=${mensagem}`, '_blank');
  };

  const compartilharFacebook = () => {
    const url = encodeURIComponent(urlProduto);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const compartilharInstagram = () => {
    copiarLink();
    alert('Link copiado! Compartilhe nos seus stories do Instagram.');
  };

  const enviarOrcamento = () => {
    const mensagem = encodeURIComponent(
      `Olá! Gostaria de solicitar um orçamento para:\n\n*${produto.nome}*\nMarca: ${produto.marca}\nVolume: ${volume}\nPreço: ${formatarPreco(precoComDesconto)}`
    );
    window.open(`https://wa.me/5500000000?text=${mensagem}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-hg-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-hg-gray">
            <Link href="/" className="hover:text-hg-gold">
              Home
            </Link>
            <span>/</span>
            <Link href="/catalogo" className="hover:text-hg-gold">
              Catálogo
            </Link>
            <span>/</span>
            <span className="text-hg-black font-semibold">{produto.nome}</span>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Imagem */}
          <div className="flex flex-col gap-4">
            <div className="relative h-96 md:h-[500px] bg-white rounded-lg overflow-hidden">
              <Image
                src={produto.fotoUrl}
                alt={produto.nome}
                fill
                className="object-cover"
                priority
              />
              {produto.promocao && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg text-lg font-bold">
                  -{produto.promocao.percentual}%
                </div>
              )}
            </div>
            {produto.fotoUrlSecundarias && produto.fotoUrlSecundarias.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {produto.fotoUrlSecundarias.slice(0, 3).map((foto, idx) => (
                  <div key={idx} className="relative h-24 bg-white rounded cursor-pointer hover:opacity-75">
                    <Image src={foto} alt={`${produto.nome} ${idx}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Informações */}
          <div>
            {/* Header */}
            <div className="mb-6">
              <p className="text-hg-gold font-semibold mb-2">{produto.marca}</p>
              <h1 className="font-serif text-4xl md:text-5xl text-hg-black mb-4">{produto.nome}</h1>
              <p className="text-hg-gray text-lg mb-4">{produto.descricao}</p>
            </div>

            {/* Seleção de Volume */}
            <div className="mb-8">
              <h3 className="text-hg-black font-semibold mb-3">Selecione o Volume:</h3>
              <div className="flex gap-3 flex-wrap">
                {produto.volume.map(vol => (
                  <button
                    key={vol}
                    onClick={() => setVolume(vol)}
                    className={`px-4 py-2 rounded-lg border-2 transition-colors font-semibold ${
                      volume === vol
                        ? 'bg-hg-gold text-hg-black border-hg-gold'
                        : 'border-hg-gray text-hg-gray hover:border-hg-gold'
                    }`}
                  >
                    {vol}
                  </button>
                ))}
              </div>
            </div>

            {/* Preço */}
            <div className="mb-8 pb-8 border-b-2">
              <div className="flex items-center gap-4 mb-2">
                {produto.promocao ? (
                  <>
                    <span className="text-3xl font-bold text-hg-gold">{formatarPreco(precoComDesconto)}</span>
                    <span className="text-lg line-through text-hg-gray">{formatarPreco(precoAtual)}</span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-hg-black">{formatarPreco(precoAtual)}</span>
                )}
              </div>
              <p className="text-sm text-hg-gray">Volume: {volume}</p>
            </div>

            {/* Botões de Ação */}
            <div className="mb-8 space-y-3">
              <button
                onClick={enviarOrcamento}
                className="w-full bg-hg-gold text-hg-black py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Comprar via WhatsApp
              </button>
              <button
                onClick={toggleWishlist}
                className={`w-full py-3 rounded-lg font-semibold border-2 transition-all flex items-center justify-center gap-2 ${
                  isFavorito
                    ? 'bg-hg-gold text-hg-black border-hg-gold'
                    : 'border-hg-gold text-hg-gold hover:bg-hg-cream'
                }`}
              >
                <Heart size={20} fill={isFavorito ? 'currentColor' : 'none'} />
                {isFavorito ? 'Removido dos Favoritos' : 'Adicionar aos Favoritos'}
              </button>
            </div>

            {/* Compartilhamento */}
            <div className="mb-8">
              <h3 className="text-hg-black font-semibold mb-3">Compartilhar:</h3>
              <div className="flex gap-2">
                <button
                  onClick={compartilharWhatsApp}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </button>
                <button
                  onClick={compartilharFacebook}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Facebook
                </button>
                <button
                  onClick={compartilharInstagram}
                  className="flex-1 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors font-semibold"
                >
                  Instagram
                </button>
                <button
                  onClick={copiarLink}
                  className="flex-1 bg-hg-gray text-white py-2 rounded-lg hover:bg-opacity-80 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  {copiedLink ? <Check size={18} /> : <Copy size={18} />}
                  {copiedLink ? 'Copiado!' : 'Link'}
                </button>
              </div>
            </div>

            {/* Informações Técnicas */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-hg-black mb-4 text-lg">Informações Técnicas</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-hg-gray text-sm font-semibold mb-1">Família Olfativa</p>
                  <p className="text-hg-black">{produto.familiaOlfativa}</p>
                </div>
                <div>
                  <p className="text-hg-gray text-sm font-semibold mb-1">Intensidade</p>
                  <p className="text-hg-black capitalize">{produto.intensidade}</p>
                </div>
                <div>
                  <p className="text-hg-gray text-sm font-semibold mb-1">Melhor para Clima</p>
                  <p className="text-hg-black capitalize">{produto.clima}</p>
                </div>
              </div>
            </div>

            {/* Notas Olfativas */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-hg-black mb-4 text-lg">Notas Olfativas</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-hg-gold font-semibold mb-2">Notas de Topo</p>
                  <p className="text-hg-black">{produto.notasOlfativas.topo.join(', ')}</p>
                </div>
                <div>
                  <p className="text-hg-gold font-semibold mb-2">Notas de Coração</p>
                  <p className="text-hg-black">{produto.notasOlfativas.coracao.join(', ')}</p>
                </div>
                <div>
                  <p className="text-hg-gold font-semibold mb-2">Notas de Fundo</p>
                  <p className="text-hg-black">{produto.notasOlfativas.fundo.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Avaliações Visuais */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-hg-black mb-4 text-lg">Características</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-hg-gray">Fixação</span>
                  <span className="text-hg-gold">{'⭐'.repeat(produto.avaliacoes.fixacao)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-hg-gray">Projeção</span>
                  <span className="text-hg-gold">{'⭐'.repeat(produto.avaliacoes.projecao)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-hg-gray">Versatilidade</span>
                  <span className="text-hg-gold">{'⭐'.repeat(produto.avaliacoes.versatilidade)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-hg-gray">Elegância</span>
                  <span className="text-hg-gold">{'⭐'.repeat(produto.avaliacoes.elegancia)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Produtos Relacionados */}
        <div className="mt-16 pt-16 border-t">
          <h2 className="font-serif text-4xl text-hg-black mb-8">Produtos Similares</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {produtos
              .filter(
                p => p.id !== produto.id && (p.marca === produto.marca || p.genero === produto.genero)
              )
              .slice(0, 4)
              .map(p => (
                <Link key={p.id} href={`/produto/${p.slug}`}>
                  <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <div className="relative h-48 bg-hg-cream">
                      <Image src={p.fotoUrl} alt={p.nome} fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-hg-gray mb-1">{p.marca}</p>
                      <h3 className="font-semibold text-hg-black truncate mb-2">{p.nome}</h3>
                      <p className="text-hg-gold font-bold">
                        A partir de {formatarPreco(Math.min(...Object.values(p.precos)))}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
