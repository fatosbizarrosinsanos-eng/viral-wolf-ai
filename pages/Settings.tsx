
import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { GoogleGenAI } from "@google/genai";

const Settings: React.FC = () => {
  const { config, setConfig } = useStore();
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const handleSave = (key: string, value: string) => {
    setConfig({ [key]: value });
  };

  const testConnection = async () => {
    if (!config.geminiKey) {
      setTestStatus('❌ A CHAVE ESTÁ VAZIA');
      return;
    }

    setIsTesting(true);
    setTestStatus('⚙️ VALIDANDO SOMBRAS...');
    
    try {
      const ai = new GoogleGenAI({ apiKey: config.geminiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: 'teste de conexão rápido',
      });

      if (response.text) {
        setTestStatus('✅ KEY VÁLIDA! CONEXÃO ESTABELECIDA.');
      }
    } catch (err: any) {
      setTestStatus(`❌ ERRO: KEY INVÁLIDA OU LIMITE EXCEDIDO`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-8 pb-32 animate-in fade-in duration-500 px-4">
      <header className="text-center">
        <h2 className="text-5xl font-impact uppercase italic tracking-tighter text-red-600 mb-2">
          CENTRAL DE <span className="text-white">COMANDO</span>
        </h2>
        <p className="text-gray-500 text-xs font-bold tracking-widest">Sincronize suas armas de dominação.</p>
      </header>

      <div className="space-y-6">
        {/* Seção Principal: GEMINI KEY */}
        <section className="bg-[#050505] p-6 rounded-[32px] border-2 border-red-600/20 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔥</span>
            <h3 className="text-xl font-impact uppercase tracking-tight">Cérebro Gemini</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em] mb-2 block">Sua API Key Pessoal</label>
              <input 
                type="password"
                value={config.geminiKey}
                onChange={e => handleSave('geminiKey', e.target.value)}
                placeholder="Cole sua GEMINI_API_KEY aqui..."
                className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm focus:border-red-600 outline-none transition-all placeholder:text-gray-800 text-white font-mono"
              />
            </div>

            <button 
              onClick={testConnection}
              disabled={isTesting}
              className={`w-full py-4 rounded-2xl font-impact uppercase text-lg tracking-widest transition-all flame-glow pulse-red ${
                isTesting ? 'bg-gray-800 text-gray-500' : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isTesting ? 'Validando...' : 'Salvar e Testar Key'}
            </button>

            {testStatus && (
              <div className={`text-[10px] font-black uppercase text-center p-3 rounded-xl border ${
                testStatus.includes('✅') ? 'bg-green-600/10 border-green-600 text-green-500' : 'bg-red-600/10 border-red-600 text-red-500'
              }`}>
                {testStatus}
              </div>
            )}
            
            <p className="text-[9px] text-gray-600 text-center uppercase font-black tracking-tighter leading-tight">
              ⚠️ AVISO: KEY SALVA APENAS NO SEU DISPOSITIVO — USO PESSOAL, NÃO COMPARTILHE O APP.
            </p>
          </div>
        </section>

        {/* Seção Secundária: Outras Keys */}
        <section className="bg-[#050505] p-6 rounded-[32px] border border-white/5 space-y-4">
          <h3 className="text-xs font-black uppercase text-gray-500 tracking-widest">Módulos Adicionais</h3>
          
          <div>
            <label className="text-[10px] uppercase font-black text-gray-400 mb-1 block">ElevenLabs (Voz)</label>
            <input 
              type="password"
              value={config.elevenLabsKey}
              onChange={e => handleSave('elevenLabsKey', e.target.value)}
              placeholder="Key ElevenLabs..."
              className="w-full bg-black border border-white/5 rounded-xl p-3 text-xs focus:border-red-600 outline-none transition-all"
            />
          </div>
        </section>

        {/* Footer de Segurança */}
        <div className="flex items-center gap-4 p-4 bg-red-600/5 rounded-2xl border border-red-600/10">
          <div className="text-3xl grayscale brightness-200">🐺</div>
          <div className="flex-1">
            <h4 className="font-impact text-xs text-red-600 uppercase">Protocolo de Sigilo</h4>
            <p className="text-[9px] text-gray-500 uppercase font-bold leading-none">Seus dados nunca tocam nossos servidores.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
