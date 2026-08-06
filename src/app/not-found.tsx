import { notFound } from 'next/navigation';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-hg-cream flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-serif text-6xl text-hg-gold mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-hg-black mb-4">Página não encontrada</h2>
        <p className="text-hg-gray text-lg mb-8 max-w-md">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        <a
          href="/"
          className="inline-block bg-hg-gold text-hg-black px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
        >
          Voltar para Home
        </a>
      </div>
    </div>
  );
}
