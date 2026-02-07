
import React from 'react';
import { useStore } from '../store/useStore';
import { AppRoute } from '../types';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentRoute, setRoute, user, setUser } = useStore();

  if (currentRoute === AppRoute.LOGIN || currentRoute === AppRoute.REGISTER) {
    return <div className="min-h-screen bg-black text-white">{children}</div>;
  }

  const navItems = [
    { id: AppRoute.DASHBOARD, label: 'Painel', icon: '📊' },
    { id: AppRoute.CREATOR, label: 'Criar', icon: '🔥' },
    { id: AppRoute.HISTORY, label: 'Histórico', icon: '📜' },
    { id: AppRoute.SETTINGS, label: 'Ajustes', icon: '⚙️' },
  ];

  const handleLogout = () => {
    setUser(null);
    setRoute(AppRoute.LOGIN);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#050505] text-white">
      {/* Sidebar / Bottom Nav for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 border-t border-red-900/30 md:relative md:w-64 md:border-t-0 md:border-r md:bg-[#0a0a0a] flex md:flex-col justify-around md:justify-start p-2 md:p-6 backdrop-blur-md">
        <div className="hidden md:block mb-10">
          <h1 className="text-2xl font-black text-red-600 tracking-tighter italic">VIRALWOLF AI</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Dominação Social</p>
        </div>
        
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setRoute(item.id)}
            className={`flex flex-col md:flex-row items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
              currentRoute === item.id 
                ? 'bg-red-600 text-white flame-glow font-bold' 
                : 'text-gray-400 hover:text-red-400 hover:bg-red-900/10'
            }`}
          >
            <span className="text-xl md:text-lg">{item.icon}</span>
            <span className="text-[10px] md:text-sm uppercase font-bold">{item.label}</span>
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="mt-auto hidden md:flex items-center gap-3 p-3 text-gray-500 hover:text-white transition-colors"
        >
          <span>🚪</span>
          <span className="text-sm uppercase font-bold">Sair</span>
        </button>
      </nav>

      {/* Content Area */}
      <main className="flex-1 pb-24 md:pb-0 overflow-y-auto max-h-screen custom-scrollbar">
        <div className="p-4 md:p-10 max-w-5xl mx-auto">
          {children}
        </div>
      </main>

      {/* Security Warning Banner */}
      <div className="fixed top-0 left-0 right-0 bg-red-600/10 border-b border-red-600/20 py-1 px-4 text-[10px] text-center text-red-400 z-[60]">
        ⚠️ AVISO: Keys salvos localmente. Uso pessoal. Não compartilhe sua tela.
      </div>
    </div>
  );
};

export default Layout;
