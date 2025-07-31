import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { getMarketData, getCoinHistoricalData, getCoinDetails } from '../utils/api'; // We'll add getCoinDetails/HistoricalData to api.js
import CryptoChart from '../components/dashboard/CryptoChart'; // The chart component we'll create
import { ArrowLeft } from 'lucide-react'; // Icon for back button
import { motion } from 'framer-motion';

function CryptoDetailPage() {
  const { id } = useParams(); // Get the crypto ID from the URL
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(7); // State for chart range (e.g., 7 days)

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch current details for the coin
        const details = await getCoinDetails(id);
        setCoinData(details);

        // Fetch historical data for the chart
        const historical = await getCoinHistoricalData(id, days, 'usd');
        // CoinGecko historical data comes as [timestamp, price] pairs.
        // We'll process it to { labels: [], datasets: [...] } for Chart.js
        const chartLabels = historical.prices.map(data => new Date(data[0]).toLocaleDateString());
        const chartPrices = historical.prices.map(data => data[1]);

        setHistoricalData({
          labels: chartLabels,
          prices: chartPrices,
        });

      } catch (err) {
        setError('Failed to load cryptocurrency details. Please try again.');
        console.error("Crypto detail fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id, days]); // Re-fetch when ID or days change

  if (loading) {
    return (
      <div className="min-h-screen bg-juggernaut-dark flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-juggernaut-accent-1"></div>
        <p className="mt-4 text-juggernaut-text-light">Loading {id} details...</p>
      </div>
    );
  }

  if (error || !coinData) {
    return (
      <div className="min-h-screen bg-juggernaut-dark flex flex-col items-center justify-center text-red-500">
        <p>{error || 'Cryptocurrency data not found.'}</p>
        <Link to="/dashboard" className="mt-4 text-juggernaut-accent-1 hover:underline flex items-center">
          <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
        </Link>
      </div>
    );
  }

  const priceChange24h = coinData.market_data?.price_change_percentage_24h;
  const priceChangeClass = priceChange24h > 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="min-h-screen bg-juggernaut-dark text-juggernaut-text-light pb-10">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/dashboard" className="text-juggernaut-accent-1 hover:underline flex items-center mb-6">
            <ArrowLeft size={18} className="mr-2" /> Back to Market List
          </Link>

          {/* Coin Header */}
          <div className="flex flex-col md:flex-row items-center bg-juggernaut-medium p-6 rounded-xl shadow-xl border border-juggernaut-light mb-8">
            <img src={coinData.image?.large} alt={coinData.name} className="h-20 w-20 rounded-full mr-4 mb-4 md:mb-0" />
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold text-white">
                {coinData.name} (<span className="uppercase text-juggernaut-accent-1">{coinData.symbol}</span>)
              </h1>
              <p className="text-juggernaut-text-muted text-lg mt-2">
                Current Price: <span className="text-white font-bold text-2xl">
                  ${coinData.market_data?.current_price?.usd?.toLocaleString()}
                </span>
                <span className={`ml-3 text-lg ${priceChangeClass}`}>
                  {priceChange24h?.toFixed(2)}% (24h)
                </span>
              </p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-juggernaut-medium p-6 rounded-xl shadow-xl border border-juggernaut-light mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Price History (USD)</h2>
            <div className="flex justify-center mb-4 space-x-2">
              {[7, 30, 90, 365, 'max'].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    days === d ? 'bg-juggernaut-accent-1 text-juggernaut-dark' : 'bg-juggernaut-dark text-juggernaut-text-light hover:bg-juggernaut-light'
                  }`}
                >
                  {d === 'max' ? 'Max' : `${d}D`}
                </button>
              ))}
            </div>
            {historicalData.prices?.length > 0 ? (
              <CryptoChart historicalData={historicalData} />
            ) : (
              <p className="text-center text-juggernaut-text-muted py-10">No historical data available for this period.</p>
            )}
          </div>

          {/* More Details Section */}
          <div className="bg-juggernaut-medium p-6 rounded-xl shadow-xl border border-juggernaut-light grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Market Cap</h3>
              <p className="text-juggernaut-text-light text-lg">
                ${coinData.market_data?.market_cap?.usd?.toLocaleString()}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">24h High / Low</h3>
              <p className="text-juggernaut-text-light text-lg">
                <span className="text-green-500">H: ${coinData.market_data?.high_24h?.usd?.toLocaleString()}</span> / {' '}
                <span className="text-red-500">L: ${coinData.market_data?.low_24h?.usd?.toLocaleString()}</span>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Total Volume (24h)</h3>
              <p className="text-juggernaut-text-light text-lg">
                ${coinData.market_data?.total_volume?.usd?.toLocaleString()}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Circulating Supply</h3>
              <p className="text-juggernaut-text-light text-lg">
                {coinData.market_data?.circulating_supply?.toLocaleString()} {coinData.symbol?.toUpperCase()}
              </p>
            </div>
            {/* You can add more details like description (sanitized), links etc. */}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CryptoDetailPage;