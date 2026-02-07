
import React, { useEffect } from 'react';
import { useStore } from './store/useStore';
import { AppRoute } from './types';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Creator from './pages/Creator';
import Settings from './pages/Settings';
import Auth from './pages/Auth';

const App: React.FC = () => {
  const { currentRoute, user, loading, error, setError } = useStore();

  // Clear error after 5s
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  const renderPage = () => {
    // Basic Auth Guard
    if (!user && currentRoute !== AppRoute.LOGIN && currentRoute !== AppRoute.REGISTER) {
      return <Auth />;
    }

    switch (currentRoute) {
      case AppRoute.LOGIN:
      case AppRoute.REGISTER:
        return <Auth />;
      case AppRoute.DASHBOARD:
        return <Dashboard />;
      case AppRoute.CREATOR:
        return <Creator />;
      case AppRoute.SETTINGS:
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      {error && (
        <div className="fixed top-20 right-4 z-[100] bg-red-600 text-white p-4 rounded-xl shadow-2xl border-2 border-red-400 animate-bounce max-w-xs">
          <p className="font-black uppercase text-[10px]">Erro Crítico</p>
          <p className="text-xs">{error}</p>
        </div>
      )}
      
      {loading && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-6">
          <div className="w-24 h-24 border-8 border-red-900 border-t-red-600 rounded-full animate-spin"></div>
          <div className="text-center">
            <h3 className="text-2xl font-black text-red-600 italic tracking-tighter">VIRALWOLF AI</h3>
            <p className="text-gray-400 text-sm animate-pulse">Orquestrando o império...</p>
          </div>
        </div>
      )}

      {renderPage()}
    </Layout>
  );
};

export default App;
