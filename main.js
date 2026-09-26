import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase (Ensure env variables are exposed to your build)
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL, 
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const BehaviorWheelPortfolio = () => {
  // State for Google Sheets
  const [sheetsData, setSheetsData] = useState([]);
  const [isLoadingSheets, setIsLoadingSheets] = useState(true);

  // State for Supabase
  const [supabaseData, setSupabaseData] = useState([]);
  const [isLoadingSupabase, setIsLoadingSupabase] = useState(true);
  const [supabaseError, setSupabaseError] = useState(null);

  useEffect(() => {
    // 1. Fetch Google Sheets Data (Leave your existing logic intact)
    const fetchSheetsData = async () => {
      try {
        // Your existing Google Sheets fetch logic here
        // const response = await fetch('YOUR_SHEETS_API');
        // setSheetsData(await response.json());
      } catch (error) {
        console.error("Sheets Error:", error);
      } finally {
        setIsLoadingSheets(false);
      }
    };

    // 2. Fetch Supabase Data Independently
    const fetchSupabaseData = async () => {
      try {
        const { data, error } = await supabase
          .from('your_portfolio_table') // Replace with your actual table name
          .select('*');

        if (error) throw error;
        
        setSupabaseData(data);
      } catch (error) {
        console.error("Supabase Error:", error.message);
        setSupabaseError(error.message);
      } finally {
        // This ensures the loading screen goes away even if it fails
        setIsLoadingSupabase(false); 
      }
    };

    fetchSheetsData();
    fetchSupabaseData();
  }, []);

  // UI Rendering
  return (
    <div className="portfolio-container">
      {/* Google Sheets UI */}
      <section>
        <h2>Google Sheets Portfolio</h2>
        {isLoadingSheets ? (
          <p>Loading Sheets Data...</p>
        ) : (
          <div>{/* Render Sheets Data Here */}</div>
        )}
      </section>

      {/* Supabase UI */}
      <section>
        <h2>Supabase Portfolio</h2>
        {isLoadingSupabase ? (
          <p>Loading your Supabase Portfolio...</p> // This is what you see currently
        ) : supabaseError ? (
          <p style={{ color: 'red' }}>Error loading Supabase: {supabaseError}</p>
        ) : (
          <div>{/* Render Supabase Data Here */}</div>
        )}
      </section>
    </div>
  );
};

export default BehaviorWheelPortfolio;
