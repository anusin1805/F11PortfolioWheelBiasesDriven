import React, { useState, useEffect } from 'react';
import { AlertCircle, TrendingUp, Download, RefreshCw } from 'lucide-react';

const FinWiseIntegration = () => {
  const [watchlistData, setWatchlistData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔴 PASTE YOUR GOOGLE SHEET CSV LINK HERE
  const SHEET_URL = "const SHEET_URL = "https://docs.google.com/spreadsheets/d/1P-1a8Z-tm2_OD3OBZvoeof49GeY88TAjZdFjZxF7Big/export?format=csv";

  // Fallback mock data
  const mockBiasResults = [
    { symbol: 'AAPL', category: 'Technology', bias: 'Hold', price: 185.92, marketCap: '2.85T' },
    { symbol: 'MSFT', category: 'Technology', bias: 'Buy', price: 415.26, marketCap: '3.09T' },
  ];

  useEffect(() => {
    // Load mock data initially
    setWatchlistData(mockBiasResults);
  }, []);

  // --- CSV PARSING HELPER ---
  const parseCSV = (csvText) => {
    const lines = csvText.split("\n");
    // Skip header row (slice 1) and filter empty lines
    return lines.slice(1).filter(line => line.trim() !== "").map(line => {
      // Regex to handle commas inside quotes (e.g., "1,000")
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); 
      
      // Map CSV columns to state object keys
      // ADJUST INDICES [0], [1] based on your specific sheet columns
      return {
        symbol: values[0]?.trim() || "N/A",
        category: values[1]?.trim() || "N/A",
        bias: values[2]?.trim() || "Neutral",
        price: values[3]?.replace(/[^0-9.]/g, '') || "0.00", // Clean price string
        marketCap: values[4]?.trim() || "-"
      };
    });
  };

  const fetchFromBiasWheel = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (SHEET_URL.includes("YOUR_GOOGLE_SHEET")) {
        throw new Error("Please configure the Google Sheet URL in the code first.");
      }

      const response = await fetch(SHEET_URL);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const csvText = await response.text();
      const parsedData = parseCSV(csvText);
      
      setWatchlistData(parsedData);
      
    } catch (err) {
      console.error(err);
      setError(`Failed to fetch data: ${err.message}. Showing cached/mock data.`);
    } finally {
      setLoading(false);
    }
  };

  const syncToGoogleSheets = () => {
    const csvContent = [
      ['Symbol', 'Category', 'Bias', 'Price', 'Market Cap', 'Sync Date'],
      ...watchlistData.map(item => [
        item.symbol,
        item.category,
        item.bias,
        item.price,
        item.marketCap,
        new Date().toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    navigator.clipboard.writeText(csvContent);
    alert('Data copied! You can now paste it directly into Excel or Sheets.');
  };

  const exportToCanva = () => {
    const canvaData = watchlistData.map(item => ({
      stock: item.symbol,
      recommendation: item.bias,
      price: `$${item.price}`,
      marketCap: item.marketCap
    }));
    navigator.clipboard.writeText(JSON.stringify(canvaData, null, 2));
    alert('JSON for Canva copied to clipboard!');
  };

  const downloadCSV = () => {
    const headers = ['Symbol', 'Category', 'Bias', 'Price', 'Market Cap', 'Date'];
    const rows = watchlistData.map(item => [
      item.symbol,
      item.category,
      item.bias,
      item.price,
      item.marketCap,
      new Date().toISOString().split('T')[0]
    ]);

    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finwise-live-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-6 border border-slate-700 shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-blue-400" />
            FinWise Live Dashboard
          </h1>
          <p className="text-slate-400">
            Real-time sync from Master Google Sheet
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <button
            onClick={fetchFromBiasWheel}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Fetching...' : 'Fetch Live Data'}
          </button>
          
          <button
            onClick={syncToGoogleSheets}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
          >
            <Download className="w-5 h-5" />
            Copy to Clipboard
          </button>
          
          <button
            onClick={exportToCanva}
            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
          >
            <Download className="w-5 h-5" />
            JSON for Canva
          </button>
          
          <button
            onClick={downloadCSV}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
          >
            <Download className="w-5 h-5" />
            Download .CSV
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 rounded-xl p-4 mb-6 flex items-center gap-3 animate-pulse">
            <AlertCircle className="w-6 h-6 text-red-300" />
            <span className="text-red-100">{error}</span>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-slate-700 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Live Watchlist</h2>
              <p className="text-slate-400 text-sm mt-1">{watchlistData.length} assets tracking</p>
            </div>
            <div className="text-xs text-slate-500">
               Last Sync: {new Date().toLocaleTimeString()}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Symbol</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Bias</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Price</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Mkt Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {watchlistData.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-700/50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-white font-bold font-mono text-lg group-hover:text-blue-400 transition-colors">{item.symbol}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded bg-slate-700 text-slate-300 text-xs uppercase tracking-wider">{item.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        item.bias.toLowerCase().includes('buy') ? 'bg-green-500/20 text-green-400' :
                        item.bias.toLowerCase().includes('sell') ? 'bg-red-500/20 text-red-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {item.bias}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-white font-mono">${item.price}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-slate-400 font-mono text-sm">{item.marketCap}</span>
                    </td>
                  </tr>
                ))}
                {watchlistData.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                      No data loaded. Click "Fetch Live Data" to start.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinWiseIntegration;
