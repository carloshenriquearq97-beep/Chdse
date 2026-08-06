'use client';

import React, { useState, useEffect } from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import Link from 'next/link';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('admin-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      setShowLogin(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Senha simples para demonstração - em produção, usar autenticação real
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setShowLogin(false);
      localStorage.setItem('admin-auth', 'true');
      setPassword('');
    } else {
      alert('Senha incorreta!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogin(true);
    localStorage.removeItem('admin-auth');
  };

  if (showLogin && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-luxury flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <h1 className="font-serif text-4xl text-hg-gold mb-2 text-center">HG Admin</h1>
          <p className="text-hg-gray text-center mb-8">Painel Administrativo</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-hg-black font-semibold mb-2">Senha de Acesso</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-hg-gray rounded-lg px-4 py-2 focus:outline-none focus:border-hg-gold"
                placeholder="Digite a senha"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-hg-gold text-hg-black py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Entrar
            </button>
          </form>
          <p className="text-xs text-hg-gray text-center mt-4">Senha de demonstração: admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hg-cream flex">
      {/* Sidebar */}
      <aside
        className={`bg-gradient-luxury text-hg-cream transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } fixed md:relative h-screen overflow-y-auto z-40`}
      >
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h1 className="font-serif text-2xl text-hg-gold">HG Admin</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-black/10 rounded transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-8 space-y-2 px-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-2 rounded hover:bg-black/10 transition-colors"
          >
            <span className="text-xl">📊</span>
            {sidebarOpen && <span>Dashboard</span>}
          </Link>
          <Link
            href="/admin/produtos"
            className="flex items-center gap-3 px-4 py-2 rounded hover:bg-black/10 transition-colors"
          >
            <span className="text-xl">🧴</span>
            {sidebarOpen && <span>Produtos</span>}
          </Link>
          <Link
            href="/admin/pedidos"
            className="flex items-center gap-3 px-4 py-2 rounded hover:bg-black/10 transition-colors"
          >
            <span className="text-xl">📦</span>
            {sidebarOpen && <span>Pedidos</span>}
          </Link>
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded bg-red-500 hover:bg-red-600 transition-colors justify-center"
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
