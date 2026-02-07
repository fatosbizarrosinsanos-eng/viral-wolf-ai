
import React from 'react';
import { useStore } from '../store/useStore';
import { AppRoute } from '../types';

const Dashboard: React.FC = () => {
  const { history, setRoute } = useStore();
  
  const stats = [
    { label: 'Roteiros Gerados', value: history.length, icon: '📄' },
    { label: 'Vídeos Veo', value: history.filter(h => h.videoUrl).length, icon: '🎥' },
    { label: 'Postados', value: history.filter(h => h.status === 'posted').length, icon: '🚀' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h2 className="text-4xl font-black italic tracking-tighter">BEM-VINDO, <span className="text-red-600">MESTRE</span>.</h2>
        <p className="text-gray-400">O mundo está faminto por mistérios bizarros.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#111] border border-red-900/20 p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 text-4xl opacity-10 group-hover:opacity-30 transition-opacity">
              {stat.icon}
            </div>
            <p className="text-sm text-gray-400 uppercase font-bold tracking-widest">{stat.label}</p>
            <p className="text-5xl font-black text-red-600 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#111] p-8 rounded-3xl border border-red-900/20 flex flex-col justify-center items-center text-center space-y-4 shadow-2xl">
          <div className="text-6xl pulse-red rounded-full bg-red-600 p-6">🐺</div>
          <h3 className="text-2xl font-bold">PRONTO PARA VIRALIZAR?</h3>
          <p className="text-gray-400 max-w-sm">Use o Mestre de Fatos Estranhos para gerar conteúdo sombrio em segundos.</p>
          <button 
            onClick={() => setRoute(AppRoute.CREATOR)}
            className="bg-red-600 hover:bg-red-700 text-white font-black px-10 py-4 rounded-xl flame-glow transition-all uppercase tracking-tighter"
          >
            Começar Agora
          </button>
        </div>

        <div className="bg-[#111] p-8 rounded-3xl border border-red-900/20 overflow-hidden">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span>📜</span> HISTÓRICO RECENTE
          </h3>
          <div className="space-y-4">
            {history.length === 0 ? (
              <p className="text-gray-600 italic">Nenhuma atividade registrada ainda...</p>
            ) : (
              history.slice(0, 5).map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5">
                  <span className="font-bold truncate max-w-[150px]">{item.title}</span>
                  <span className={`text-[10px] px-2 py-1 rounded uppercase font-black ${
                    item.status === 'posted' ? 'bg-green-900/30 text-green-500' : 'bg-red-900/30 text-red-500'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
