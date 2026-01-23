import React, { useState, useEffect } from 'react';
import { AlertCircle, TrendingUp, Download, RefreshCw } from 'lucide-react';

const FinWiseIntegration = () => {
  const [biasResults, setBiasResults] = useState([]);
  const [watchlistData, setWatchlistData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulated bias wheel results - in production, this would fetch from your GitHub Pages
  const mockBiasResults = [
    { symbol: 'AAPL', category: 'Technology', bias: 'Hold', price: 185.92, marketCap: '2.85T' },
    { symbol: 'MSFT', category: 'Technology', bias: 'Hold', price: 415.26, marketCap: '3.09T' },
    { symbol: 'GOOGL', category: 'Technology', bias: 'Hold', price: 140.93, marketCap: '1.76T' },
    { symbol: 'AMZN', category: 'Consumer', bias: 'Hold', price: 178.35, marketCap: '1.85T' },
    { symbol: 'NVDA', category: 'Technology', bias: 'Hold', price: 495.22, marketCap: '1.22T' },
    { symbol: 'META', category: 'Technology', bias: 'Hold', price: 484.03, marketCap: '1.24T' },
    { symbol: 'TSLA', category: 'Automotive', bias: 'Hold', price: 207.83, marketCap: '662B' },
    { symbol: 'BRK.B', category: 'Financial', bias: 'Hold', price: 456.12, marketCap: '1.01T' },
    { symbol: 'JPM', category: 'Financial', bias: 'Hold', price: 219.54, marketCap: '628B' },
    { symbol: 'V', category: 'Financial', bias: 'Hold', price: 308.67, marketCap: '644B' }
  ];

  useEffect(() => {
    // Initialize with mock data
    setBiasResults(mockBiasResults);
    setWatchlistData(mockBiasResults);
  }, []);

  const fetchFromBiasWheel = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call to GitHub Pages
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, you would fetch from:
      // const response = await fetch('https://anusin1805.github.io/MasterDashboard/api/bias-results');
      // const data = await response.json();
      
      setBiasResults(mockBiasResults);
      setWatchlistData(mockBiasResults);
    } catch (err) {
      setError('Failed to fetch bias wheel data');
    } finally {
      setLoading(false);
    }
  };

  const syncToGoogleSheets = () => {
    // Generate CSV format for easy copy-paste to Google Sheets
    const csvContent = [
      ['Symbol', 'Category', 'Bias', 'Price', 'Market Cap', 'Date'],
      ...watchlistData.map(item => [
        item.symbol,
        item.category,
        item.bias,
        item.price,
        item.marketCap,
        new Date().toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    // Copy to clipboard
    navigator.clipboard.writeText(csvContent);
    alert('Watchlist data copied to clipboard! Paste it into your Google Sheets.');
  };

  const exportToCanva = () => {
    // Prepare data in a format suitable for Canva
    const canvaData = watchlistData.map(item => ({
      stock: item.symbol,
      recommendation: item.bias,
      price: `$${item.price}`,
      marketCap: item.marketCap
    }));

    const jsonData = JSON.stringify(canvaData, null, 2);
    navigator.clipboard.writeText(jsonData);
    alert('Data formatted for Canva copied to clipboard!');
  };

  const downloadCSV = () => {
    const csvContent = [
      ['Symbol', 'Category', 'Bias', 'Price', 'Market Cap', 'Date'],
      ...watchlistData.map(item => [
        item.symbol,
        item.category,
        item.bias,
        item.price,
        item.marketCap,
        new Date().toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finwise-watchlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <TrendingUp className="w-8 h-8" />
            FinWise Integration Dashboard
          </h1>
          <p className="text-white/80">
            Sync bias wheel results to your watchlist and Google Sheets
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <button
            onClick={fetchFromBiasWheel}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            Fetch Bias Data
          </button>
          
          <button
            onClick={syncToGoogleSheets}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Copy to Sheets
          </button>
          
          <button
            onClick={exportToCanva}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Export to Canva
          </button>
          
          <button
            onClick={downloadCSV}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download CSV
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-300" />
            <span className="text-red-100">{error}</span>
          </div>
        )}

        {/* Watchlist Table */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-white/20">
            <h2 className="text-2xl font-bold text-white">Current Watchlist</h2>
            <p className="text-white/60 mt-1">{watchlistData.length} stocks tracked</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">Symbol</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">Bias</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white/80">Price</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white/80">Market Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {watchlistData.map((item, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-white font-semibold text-lg">{item.symbol}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white/70">{item.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-500/30 text-blue-200 rounded-full text-sm font-medium">
                        {item.bias}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-white font-medium">${item.price}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-white/70">{item.marketCap}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Integration Instructions */}
        <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Integration Guide</h3>
          <div className="space-y-3 text-white/80">
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-semibold">1</span>
              <p>Click "Fetch Bias Data" to pull latest results from your bias wheel dashboard</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-semibold">2</span>
              <p>Click "Copy to Sheets" to copy formatted data, then paste into your Google Sheets</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-semibold">3</span>
              <p>Use "Export to Canva" to get JSON formatted data for your Canva watchlist site</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-semibold">4</span>
              <p>Download CSV for backup or offline analysis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinWiseIntegration;
