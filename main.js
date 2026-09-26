     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(null);

     // ✅ FIXED: Correct Syntax and updated with your specific Sheet ID
     const SHEET_URL = "https://docs.google.com/spreadsheets/d/11-G1tbWMxIrPVCi1npZOCfs-MZmr_4qBobcRCyP_viE/export?format=csv";

     // Fallback mock data
     const mockBiasResults = [
       { symbol: 'AAPL', category: 'Technology', bias: 'Hold', price: '185.92', marketCap: '2.85T' },
       { symbol: 'MSFT', category: 'Technology', bias: 'Buy', price: '415.26', marketCap: '3.09T' },
     ];

     useEffect(() => {
       // Regex to handle commas inside quotes (e.g., "1,000")
       const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

       // ⚠️ IMPORTANT: Verify these indices match your actual Google Sheet Columns
       // Current assumption: Col A=Symbol, Col B=Category, Col C=Bias, Col D=Price, Col E=Market Cap
       return {
         symbol: values[0]?.trim() || "N/A",
         category: values[1]?.trim() || "N/A",
       
       setError(null);

       try {
         const response = await fetch(SHEET_URL);
         if (!response.ok) throw new Error('Network response was not ok. Check Sheet Permissions.');

         const csvText = await response.text();
         const parsedData = parseCSV(csvText);
