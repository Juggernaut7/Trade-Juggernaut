import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function CryptoChart({ historicalData }) {
  const data = {
    labels: historicalData.labels,
    datasets: [
      {
        label: 'Price (USD)',
        data: historicalData.prices,
        fill: true,
        backgroundColor: 'rgba(0, 240, 255, 0.2)', // juggernaut-accent-1 with transparency
        borderColor: '#00F0FF', // juggernaut-accent-1
        tension: 0.4, // Smoothness of the line
        pointRadius: 0, // No points on the line
        hoverRadius: 5,
        hoverBorderColor: '#FF00A0', // juggernaut-accent-2 on hover
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend for single dataset
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += '$' + context.parsed.y.toLocaleString();
            }
            return label;
          }
        },
        backgroundColor: '#1A1A1A', // juggernaut-medium
        titleColor: '#E0E0E0',
        bodyColor: '#E0E0E0',
        borderColor: '#00F0FF',
        borderWidth: 1,
        cornerRadius: 6,
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(42, 42, 42, 0.5)', // juggernaut-light with transparency
          borderColor: 'rgba(42, 42, 42, 0.8)',
        },
        ticks: {
          color: '#A0A0A0', // juggernaut-text-muted
        },
      },
      y: {
        grid: {
          color: 'rgba(42, 42, 42, 0.5)',
          borderColor: 'rgba(42, 42, 42, 0.8)',
        },
        ticks: {
          color: '#A0A0A0',
          callback: function(value, index, values) {
            return '$' + value.toLocaleString(); // Format Y-axis ticks as currency
          }
        },
      },
    },
  };

  return (
    <div className="h-80 w-full"> {/* Set a fixed height for the chart container */}
      <Line data={data} options={options} />
    </div>
  );
}

export default CryptoChart;