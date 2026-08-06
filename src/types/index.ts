// Tipos de dados para o catálogo HG Imports

export type Gender = 'masculino' | 'feminino' | 'unissex';
export type Occasion = 'dia' | 'noite' | 'trabalho' | 'encontro-romantico' | 'festa' | 'assinatura-pessoal';
export type Climate = 'quente' | 'frio' | 'ambos';
export type Season = 'primavera' | 'verao' | 'outono' | 'inverno' | 'ano-todo';

export interface OlfactoryNotes {
  topo: string[];
  coracao: string[];
  fundo: string[];
}

export interface FragranceRating {
  fixacao: number; // 1-5
  projecao: number; // 1-5
  versatilidade: number; // 1-5
  elegancia: number; // 1-5
}

export interface Product {
  id: string;
  slug: string;
  nome: string;
  marca: string;
  genero: Gender;
  volume: string[]; // ['30ml', '50ml', '100ml']
  precos: Record<string, number>; // { '30ml': 150, '50ml': 200, '100ml': 280 }
  descricao: string;
  fotoUrl: string;
  fotoUrlSecundarias?: string[];
  familiaOlfativa: string;
  notasOlfativas: OlfactoryNotes;
  ingredientesPrincipais: string[];
  ocasioes: Occasion[];
  estacoes: Season[];
  clima: Climate;
  intensidade: 'leve' | 'moderada' | 'intensa' | 'muito-intensa';
  avaliacoes: FragranceRating;
  estoque: number;
  destaque?: boolean;
  promocao?: {
    percentual: number;
    dataFim: Date;
  };
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface WishlistItem {
  produtoId: string;
  adicionadoEm: Date;
}

export interface FilterOptions {
  genero?: Gender[];
  marcas?: string[];
  precoMin?: number;
  precoMax?: number;
  ocasioes?: Occasion[];
  clima?: Climate;
  estacoes?: Season[];
  busca?: string;
}

export interface CartItem {
  produtoId: string;
  volume: string;
  quantidade: number;
  preco: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  nomeCliente: string;
  telefonePessoa: string; // Para WhatsApp
  total: number;
  status: 'pendente' | 'confirmado' | 'enviado' | 'entregue';
  criadoEm: Date;
  observacoes?: string;
}
