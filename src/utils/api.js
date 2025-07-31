import axios from 'axios';

const COINGECKO_API_BASE_URL = 'https://api.coingecko.com/api/v3';

const coingeckoApi = axios.create({
  baseURL: COINGECKO_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getMarketData = async (vsCurrency = 'usd', perPage = 20, page = 1) => {
  try {
    const response = await coingeckoApi.get('/coins/markets', {
      params: {
        vs_currency: vsCurrency,
        order: 'market_cap_desc',
        per_page: perPage,
        page: page,
        sparkline: false,
        price_change_percentage: '24h',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw error;
  }
};

// NEW: Function to get detailed information for a single cryptocurrency
export const getCoinDetails = async (coinId) => {
  try {
    const response = await coingeckoApi.get(`/coins/${coinId}`, {
      params: {
        localization: false, // Don't include localization data
        tickers: false, // Don't include ticker data
        market_data: true, // Include market data
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for coin ${coinId}:`, error);
    throw error;
  }
};

// NEW: Function to get historical market data (price chart)
export const getCoinHistoricalData = async (coinId, days = 7, vsCurrency = 'usd') => {
  try {
    const response = await coingeckoApi.get(`/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: vsCurrency,
        days: days,
        interval: days === 1 ? 'hourly' : 'daily', // Hourly for 1 day, daily for others
      },
    });
    return response.data; // This will contain prices, market_caps, total_volumes
  } catch (error) {
    console.error(`Error fetching historical data for coin ${coinId}:`, error);
    throw error;
  }
};