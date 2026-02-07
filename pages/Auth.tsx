
import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { AppRoute } from '../types';

const Auth: React.FC = () => {
  const { currentRoute, setRoute, setUser, setLoading } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLogin = currentRoute === AppRoute.LOGIN || currentRoute !== AppRoute.REGISTER;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating Backend Auth
    setTimeout(() => {
      setUser({ email, token: 'mock-jwt-token' });
      setRoute(AppRoute.DASHBOARD);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black">
      <div className="w-full max-w-md bg-[#0a0a0a] border border-red-900/40 p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-600/20 blur-[100px]" />
        
        <header className="text-center mb-10">
          <div className="text-6xl mb-4">🐺</div>
          <h1 className="text-4xl font-black italic tracking-tighter text-red-600">VIRALWOLF AI</h1>
          <p className="text-gray-500 uppercase text-[10px] tracking-widest mt-1">Dominação Social Profissional</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Email Corporativo</label>
            <input 
              required
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full mt-1 bg-black border border-white/10 rounded-2xl p-4 text-sm focus:border-red-600 outline-none transition-all"
              placeholder="seu@dominio.com"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Senha de Acesso</label>
            <input 
              required
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full mt-1 bg-black border border-white/10 rounded-2xl p-4 text-sm focus:border-red-600 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button className="w-full bg-red-600 py-5 rounded-2xl font-black uppercase text-lg tracking-tighter shadow-lg hover:bg-red-700 transition-all flame-glow">
            {isLogin ? 'Assumir Controle' : 'Forjar Novo Perfil'}
          </button>
        </form>

        <footer className="mt-8 text-center">
          <button 
            onClick={() => setRoute(isLogin ? AppRoute.REGISTER : AppRoute.LOGIN)}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors uppercase font-bold tracking-widest"
          >
            {isLogin ? 'Não tem uma conta? Forjar' : 'Já é um lobo? Entrar'}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Auth;
