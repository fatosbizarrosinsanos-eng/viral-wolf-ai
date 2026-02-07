
import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { generateViralScript, generateVeoVideo } from '../services/geminiService';
import { humanizePost } from '../services/postService';
import { getPeakHourStatus } from '../services/socialService';
import { ScriptOutput, GenerationHistory } from '../types';

const Creator: React.FC = () => {
  const { config, addHistory, setLoading, loading, setError } = useStore();
  const [topic, setTopic] = useState('');
  const [script, setScript] = useState<ScriptOutput | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [scheduledPosts, setScheduledPosts] = useState<{platform: string, time: string}[]>([]);

  const handleGenerateScript = async () => {
    if (!topic) return alert('Dê um tema ao Mestre!');
    try {
      setLoading(true);
      const res = await generateViralScript(topic);
      setScript(res);
      setStep(2);
    } catch (err: any) {
      setError(`Erro na Sombra: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!script) return;
    try {
      setLoading(true);
      const url = await generateVeoVideo(script.videoPrompt);
      setVideoUrl(url);
      setStep(3);
      
      const newItem: GenerationHistory = {
        id: Math.random().toString(36).substr(2, 9),
        userId: 'temp',
        title: topic,
        script: script,
        videoUrl: url,
        createdAt: new Date().toISOString(),
        status: 'generated'
      };
      addHistory(newItem);
    } catch (err: any) {
      setError(`VEO falhou: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleHumanizedPost = async (platform: string) => {
    const token = platform === 'tiktok' ? config.tiktokToken : 
                  platform === 'instagram' ? config.instagramToken : config.youtubeToken;
    
    if (!token) return alert(`⚠️ Token de ${platform} não encontrado nos Ajustes!`);
    if (!videoUrl || !script) return;

    try {
      setLoading(true);
      const result = await humanizePost(platform, videoUrl, script, token);
      setScheduledPosts(prev => [...prev, { platform, time: result.scheduledTime }]);
    } catch (err: any) {
      setError(`Erro de Postagem: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 pb-10 px-4 md:px-0">
      <h2 className="text-3xl font-black text-center text-red-600 italic tracking-tighter">MESTRE DE FATOS ESTRANHOS</h2>
      
      {/* Progress Line */}
      <div className="flex items-center justify-between px-8 relative">
        <div className="absolute h-[2px] bg-red-900/30 left-16 right-16 top-1/2 -translate-y-1/2 -z-10" />
        {[1, 2, 3].map(s => (
          <div key={s} className={`w-12 h-12 rounded-full flex items-center justify-center font-black border-2 transition-all duration-500 ${
            step >= s ? 'bg-red-600 border-red-400 text-white shadow-[0_0_20px_rgba(220,38,38,0.6)]' : 'bg-black border-red-900/30 text-gray-600'
          }`}>
            {s}
          </div>
        ))}
      </div>

      <div className="bg-[#0a0a0a] p-6 rounded-[32px] border border-red-900/20 shadow-2xl backdrop-blur-sm">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
            <label className="block">
              <span className="text-gray-500 text-[10px] uppercase font-black tracking-widest ml-1">Invocação do Tema</span>
              <input 
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="Ex: O incidente na passagem Dyatlov..."
                className="w-full mt-2 bg-black border border-red-900/40 rounded-2xl p-5 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all text-lg"
              />
            </label>
            <button 
              onClick={handleGenerateScript}
              disabled={loading}
              className="w-full bg-red-600 py-5 rounded-2xl font-black uppercase text-xl tracking-tighter disabled:opacity-50 hover:bg-red-700 active:scale-95 transition-all shadow-lg hover:shadow-red-600/20 pulse-red"
            >
              {loading ? 'Consultando as Sombras...' : 'Gerar Roteiro Viral'}
            </button>
          </div>
        )}

        {step === 2 && script && (
          <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
            <div className="bg-black/80 p-5 rounded-2xl border border-red-900/10 max-h-[350px] overflow-y-auto custom-scrollbar">
              <p className="text-red-600 font-black text-[10px] mb-2 uppercase tracking-widest">Hook Fatal:</p>
              <p className="text-xl italic font-bold mb-6 text-white">"{script.hook}"</p>
              <p className="text-red-600 font-black text-[10px] mb-2 uppercase tracking-widest">Fatos Chocantes:</p>
              <ul className="space-y-3 text-sm text-gray-300 mb-6">
                {script.facts.map((f, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-red-600 font-bold mt-1">◈</span>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="text-red-600 font-black text-[10px] mb-2 uppercase tracking-widest">CTA Estratégico:</p>
              <p className="text-sm italic text-gray-400">"{script.cta}"</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => setStep(1)}
                className="bg-gray-900 py-4 rounded-2xl font-black uppercase text-xs border border-white/5 hover:bg-gray-800 transition-colors"
              >
                Refazer Ritual
              </button>
              <button 
                onClick={handleGenerateVideo}
                disabled={loading}
                className="bg-red-600 py-4 rounded-2xl font-black uppercase text-xs shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all active:scale-95"
              >
                {loading ? 'Gerando VEO...' : 'Materializar Vídeo 9:16'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && videoUrl && (
          <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
            <div className="relative aspect-[9/16] bg-black rounded-3xl overflow-hidden border-2 border-red-600/50 shadow-[0_0_50px_rgba(220,38,38,0.2)]">
              <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-1">
                <p className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Dominação Humanizada</p>
                {getPeakHourStatus() && (
                  <div className="text-[10px] text-green-500 font-black uppercase animate-pulse flex items-center gap-1">
                    <span>🔥</span> Pico Detectado: Máxima Viralização
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button onClick={() => handleHumanizedPost('tiktok')} className="bg-[#000000] border border-white/10 hover:border-[#fe2c55] p-4 rounded-2xl font-black text-[10px] uppercase transition-all hover:scale-105 active:scale-95">TikTok</button>
                <button onClick={() => handleHumanizedPost('instagram')} className="bg-[#000000] border border-white/10 hover:border-red-500 p-4 rounded-2xl font-black text-[10px] uppercase transition-all hover:scale-105 active:scale-95">Instagram</button>
                <button onClick={() => handleHumanizedPost('youtube')} className="bg-[#000000] border border-white/10 hover:border-[#ff0000] p-4 rounded-2xl font-black text-[10px] uppercase transition-all hover:scale-105 active:scale-95">Shorts</button>
              </div>

              {scheduledPosts.length > 0 && (
                <div className="bg-red-600/10 border border-red-600/20 p-4 rounded-2xl space-y-2">
                  <p className="text-[10px] font-black uppercase text-red-500 text-center">Fila de Postagem Agendada</p>
                  {scheduledPosts.map((p, i) => (
                    <div key={i} className="flex justify-between items-center text-[9px] font-bold text-gray-400">
                      <span className="uppercase">{p.platform}</span>
                      <span className="text-white">Agendado para {p.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={() => { setStep(1); setScript(null); setVideoUrl(null); setTopic(''); setScheduledPosts([]); }}
              className="w-full border border-red-900/30 py-4 rounded-2xl text-[10px] uppercase font-black text-gray-500 hover:text-white transition-colors tracking-widest"
            >
              Iniciar Nova Invasão
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Creator;
