// Utilitários para filtros e busca

import { Product, FilterOptions } from '@/types';

export function filtrarProdutos(produtos: Product[], filtros: FilterOptions): Product[] {
  return produtos.filter((produto) => {
    // Filtro por gênero
    if (filtros.genero && filtros.genero.length > 0) {
      if (!filtros.genero.includes(produto.genero)) {
        return false;
      }
    }

    // Filtro por marca
    if (filtros.marcas && filtros.marcas.length > 0) {
      if (!filtros.marcas.includes(produto.marca)) {
        return false;
      }
    }

    // Filtro por preço (menor valor)
    if (filtros.precoMin !== undefined || filtros.precoMax !== undefined) {
      const menorPreco = Math.min(...Object.values(produto.precos));
      if (filtros.precoMin && menorPreco < filtros.precoMin) {
        return false;
      }
      if (filtros.precoMax && menorPreco > filtros.precoMax) {
        return false;
      }
    }

    // Filtro por ocasião
    if (filtros.ocasioes && filtros.ocasioes.length > 0) {
      const temOcasiao = filtros.ocasioes.some(ocasiao => produto.ocasioes.includes(ocasiao));
      if (!temOcasiao) {
        return false;
      }
    }

    // Filtro por clima
    if (filtros.clima && produto.clima !== filtros.clima && produto.clima !== 'ambos') {
      if (filtros.clima !== 'ambos') {
        return false;
      }
    }

    // Filtro por estação
    if (filtros.estacoes && filtros.estacoes.length > 0) {
      const temEstacao = filtros.estacoes.some(
        estacao => produto.estacoes.includes(estacao) || produto.estacoes.includes('ano-todo')
      );
      if (!temEstacao) {
        return false;
      }
    }

    // Filtro por busca (nome, marca, descrição)
    if (filtros.busca) {
      const termo = filtros.busca.toLowerCase();
      const match =
        produto.nome.toLowerCase().includes(termo) ||
        produto.marca.toLowerCase().includes(termo) ||
        produto.descricao.toLowerCase().includes(termo) ||
        produto.familiaOlfativa.toLowerCase().includes(termo);
      if (!match) {
        return false;
      }
    }

    return true;
  });
}

export function obterPrecoMenor(precos: Record<string, number>): number {
  return Math.min(...Object.values(precos));
}

export function obterPrecoMaior(precos: Record<string, number>): number {
  return Math.max(...Object.values(precos));
}

export function aplicarDesconto(preco: number, percentual: number): number {
  return preco - (preco * percentual) / 100;
}

export function gerarSlug(nome: string): string {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatarPreco(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}
