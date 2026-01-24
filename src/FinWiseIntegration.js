import React, { useState, useEffect } from 'react';
import { AlertCircle, TrendingUp, Download, RefreshCw, BarChart2 } from 'lucide-react';

const FinWiseIntegration = () => {
  const [watchlistData, setWatchlistData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Download CSV Functionality
  const downloadCSV = () => {
    // 1. Define Headers
    const headers = ['Symbol', 'Category', 'Bias', 'Price', 'Market Cap', 'Sync Date'];
    
    // 2. Format Rows from State
    const rows = watchlistData.map(item => [
      item.symbol,
      item.category,
      item.bias,
      item.price,
      item.marketCap,
      new Date().toISOString().split('T')[0]
    ]);

    // 3. Create CSV Content
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    
    // 4. Create Download Link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `finwise_trends_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-slate-900 rounded-xl">
      {/* Action Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-2xl font-bold">Watchlist Trends</h2>
        <button 
          onClick={downloadCSV}
          className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Download size={18} /> Download CSV
        </button>
      </div>

      {/* Simplified Trend Chart Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {watchlistData.map((stock) => (
          <div key={stock.symbol} className="bg-white/5 p-4 rounded-lg border border-white/10">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-slate-400 text-sm">{stock.symbol}</p>
                <p className="text-white text-xl font-bold">${stock.price}</p>
              </div>
              {/* Visual Sparkline Placeholder */}
              <div className="h-12 w-24 flex items-end gap-1">
                {[40, 70, 50, 90, 60, 80].map((h, i) => (
                  <div 
                    key={i} 
                    className="bg-blue-500 w-2 rounded-t" 
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
