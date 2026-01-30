import React, { useState } from 'react';
import FinWiseIntegration from './FinWiseIntegration';

function App() {
  const [view, setView] = useState('Portfolio'); // Default view
  const [iframeUrl, setIframeUrl] = useState("https://anusin1805.github.io/F11BehaviourFinanceWheelTest/");

  const navLinks = [
    { 
      id: 'profile', 
      label: '🎡 Behavior Wheel', 
      url: "https://anusin1805.github.io/F11BehaviourFinanceWheelTest/" 
    },
    { 
      id: 'Portfolio', 
      label: '🎡 Behavior Wheel Portfolio', 
      isReact: true 
    },
    { 
      id: 'PortfolioDownload', 
      label: '🏆 Portfolio Download 🏆', 
      // This is the Google Sheet URL with minimal parameters for embedding
      url: "https://docs.google.com/spreadsheets/d/11-G1tbWMxIrPVCi1npZOCfs-MZmr_4qBobcRCyP_viE/edit?usp=sharing&widget=true&headers=false&rm=minimal" 
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-900 text-white font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 p-6 flex flex-col gap-4 border-r border-slate-700">
        <h2 className="text-xl font-bold text-blue-400 mb-6 uppercase tracking-tighter">F11 Portfolio</h2>
        
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => {
              setView(link.id);
              if (link.url) setIframeUrl(link.url);
            }}
            className={`text-left px-4 py-3 rounded-xl transition-all ${
              view === link.id ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-700 text-slate-400'
            }`}
          >
            {link.label}
          </button>
        ))}

        <div className="mt-auto p-4 bg-slate-900/50 rounded-xl border border-slate-700">
          <p className="text-xs text-slate-500 uppercase font-bold">Strategy Status</p>
          <p className="text-sm text-emerald-400">Live & Active</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar / Stock Ribbon Space */}
        <div className="h-16 bg-slate-800 border-b border-slate-700 flex items-center px-8">
            <div className="animate-pulse text-blue-400 text-sm font-mono">Market Data Live Syncing...</div>
        </div>

        <div className="p-8 overflow-y-auto h-[calc(100vh-64px)]">
          {view === 'Portfolio' ? (
            /* Render the Live Watchlist Component */
            <FinWiseIntegration />
          ) : (
            /* Render External Tools (Behavior Wheel OR Google Sheet) */
            <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-white flex flex-col">
              
              {/* Conditional Header specifically for Portfolio Download */}
              {view === 'PortfolioDownload' && (
                <div className="bg-slate-100 p-4 border-b border-slate-300">
                   <h4 className="m-0 text-center font-bold text-slate-800">Portfolio Update Form</h4>
                </div>
              )}

              <iframe 
                  src={iframeUrl} 
                  className="w-full h-full border-none flex-1" 
                  title="External Tool"
                  sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
