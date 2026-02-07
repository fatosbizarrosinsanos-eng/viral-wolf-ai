
import { create } from 'zustand';
import { AppRoute, GenerationHistory, UserConfig } from '../types';

interface AppState {
  currentRoute: AppRoute;
  user: { email: string; token: string } | null;
  config: UserConfig;
  history: GenerationHistory[];
  loading: boolean;
  error: string | null;
  
  setRoute: (route: AppRoute) => void;
  setUser: (user: { email: string; token: string } | null) => void;
  setConfig: (config: Partial<UserConfig>) => void;
  addHistory: (item: GenerationHistory) => void;
  setHistory: (items: GenerationHistory[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const DEFAULT_CONFIG: UserConfig = {
  geminiKey: localStorage.getItem('GEMINI_API_KEY') || '',
  elevenLabsKey: localStorage.getItem('ELEVENLABS_API_KEY') || '',
  tiktokToken: localStorage.getItem('TIKTOK_TOKEN') || '',
  instagramToken: localStorage.getItem('INSTAGRAM_TOKEN') || '',
  youtubeToken: localStorage.getItem('YOUTUBE_TOKEN') || '',
};

export const useStore = create<AppState>((set) => ({
  currentRoute: AppRoute.LOGIN,
  user: null,
  config: DEFAULT_CONFIG,
  history: [],
  loading: false,
  error: null,

  setRoute: (route) => set({ currentRoute: route }),
  setUser: (user) => set({ user }),
  setConfig: (newConfig) => set((state) => {
    const updated = { ...state.config, ...newConfig };
    // Persist as requested
    Object.entries(newConfig).forEach(([key, val]) => {
      // Fix: Use String(val) to ensure type compatibility with localStorage.setItem and resolve 'unknown' type error
      if (val !== undefined) localStorage.setItem(key.toUpperCase() === 'GEMINIKEY' ? 'GEMINI_API_KEY' : key.toUpperCase() + (key.toLowerCase().includes('token') ? '' : '_API_KEY'), String(val));
    });
    return { config: updated };
  }),
  addHistory: (item) => set((state) => ({ history: [item, ...state.history] })),
  setHistory: (items) => set({ history: items }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
