# 🌹 HG Imports - Catálogo Digital Premium

Catálogo online elegante e responsivo para perfumes e produtos importados.

## 🎯 Características

✅ Design premium e sofisticado  
✅ 100% responsivo (mobile, tablet, desktop)  
✅ Filtros inteligentes (marca, preço, ocasião, clima)  
✅ Compartilhamento por link individual  
✅ Integração WhatsApp  
✅ Sistema de Wishlist (favoritos)  
✅ Painel administrativo  
✅ SEO otimizado  
✅ Carregamento rápido  

## 🚀 Stack Tecnológico

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Hospedagem**: Vercel
- **Ícones**: Lucide React + React Icons

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/carloshenriquearq97-beep/Chdse.git
cd Chdse

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.local.example .env.local
# Edite .env.local com suas configurações

# Execute o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📁 Estrutura do Projeto

```
├── src/
│   ├── app/              # App Router do Next.js 14
│   ├── components/       # Componentes React reutilizáveis
│   ├── lib/             # Funções utilitárias
│   ├── types/           # Tipos TypeScript
│   ├── data/            # Dados estáticos e de exemplo
│   └── styles/          # Estilos globais
├── public/              # Arquivos estáticos
├── .env.local.example   # Exemplo de variáveis de ambiente
├── tailwind.config.ts   # Configuração Tailwind
└── next.config.js       # Configuração Next.js
```

## 🎨 Paleta de Cores

- **Preto Luxo**: `#0a0a0a`
- **Ouro**: `#d4af37`
- **Creme**: `#f5f1e8`
- **Preto Escuro**: `#1a1a1a`
- **Cinza**: `#4a4a4a`

## 📱 Páginas Principais

- `/` - Homepage com banner principal
- `/catalogo` - Lista de perfumes com filtros
- `/produto/[slug]` - Página individual do produto
- `/wishlist` - Produtos favoritados
- `/admin` - Painel administrativo

## 🔧 Desenvolvimento

```bash
# Build para produção
npm run build

# Start servidor de produção
npm start

# Verificar tipos TypeScript
npm run type-check
```

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato com a equipe de desenvolvimento.

## 📄 Licença

Privado - HG Imports 2024
