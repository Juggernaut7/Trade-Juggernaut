import React, { useEffect, useState } from 'react';
import { getMarketData } from '../../utils/api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

function MarketList() {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        setLoading(true);
        const data = await getMarketData('usd', 50);
        setMarketData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load market data. Please try again later.');
        console.error("Market data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarket();
    const interval = setInterval(fetchMarket, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-juggernaut-accent-1"></div>
        <p className="ml-4 text-juggernaut-text-light">Loading market data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>{error}</p>
        <p className="text-juggernaut-text-muted text-sm mt-2">
          CoinGecko API might have rate limits. Please wait a moment and refresh.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-0 py-0"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-juggernaut-text-light mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-juggernaut-accent-1 to-juggernaut-accent-2">
        Top Cryptocurrency Markets
      </h2>
      <div className="bg-juggernaut-dark rounded-xl shadow-2xl border border-juggernaut-light">
        {/* We keep overflow-x-auto as a fallback for very small screens, but aim to fit it */}
        <div className="overflow-x-auto"> 
          <table className="min-w-full divide-y divide-juggernaut-light table-auto"> {/* Changed to table-auto for flexible column widths */}
            <thead className="bg-juggernaut-medium">
              <tr>
                <th scope="col" className="w-[5%] px-2 py-3 text-left text-xs font-medium text-juggernaut-text-muted uppercase tracking-wider">
                  #
                </th>
                <th scope="col" className="w-[25%] px-3 py-3 text-left text-xs font-medium text-juggernaut-text-muted uppercase tracking-wider">
                  Coin
                </th>
                <th scope="col" className="w-[20%] px-3 py-3 text-left text-xs font-medium text-juggernaut-text-muted uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="w-[20%] px-3 py-3 text-left text-xs font-medium text-juggernaut-text-muted uppercase tracking-wider">
                  24h Change
                </th>
                <th scope="col" className="w-[30%] px-3 py-3 text-left text-xs font-medium text-juggernaut-text-muted uppercase tracking-wider">
                  Insights
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-juggernaut-light">
              {marketData.map((coin, index) => (
                <tr key={coin.id} className="hover:bg-juggernaut-light transition-colors duration-200">
                  <td className="px-2 py-4 text-juggernaut-text-light text-sm">
                    {index + 1}
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex items-center min-w-[100px]"> {/* min-w to prevent extreme squishing */}
                      <img src={coin.image} alt={coin.name} className="h-5 w-5 rounded-full mr-2" /> {/* Slightly smaller image */}
                      <span className="font-medium text-white text-sm truncate">{coin.name}</span> {/* truncate long names */}
                      <span className="ml-1 text-juggernaut-text-muted uppercase text-xs hidden sm:inline"> {/* Hide symbol on very small screens */}
                        {coin.symbol}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-juggernaut-text-light text-sm whitespace-nowrap"> {/* Keep price on single line */}
                    ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {/* Ensure 2 decimal places for whole numbers, more for smaller values */}
                  </td>
                  <td className="px-3 py-4 text-sm whitespace-nowrap"> {/* Keep change on single line */}
                    <span className={`font-semibold ${
                      coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {coin.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-3 py-4 text-sm">
                    <Link to={`/crypto/${coin.id}`} className="block"> {/* Make link a block for full cell click */}
                      <Button className="px-2 py-1 text-xs bg-juggernaut-accent-2 text-juggernaut-dark hover:bg-juggernaut-accent-1 w-full text-center"> {/* Smaller, full-width button */}
                        View Insights
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export default MarketList;