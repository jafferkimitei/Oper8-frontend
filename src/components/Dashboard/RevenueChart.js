import React, { useEffect, useState } from 'react';
import { fetchStats } from '../../services/stats-api';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

// Register the necessary components for the Pie chart
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const RevenueChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const data = await fetchStats(); // Fetch data using the API handler

        setChartData({
          labels: ['Total Expenses', 'Revenue', 'Dispatcher Earnings', 'Driver Earnings'],
          datasets: [
            {
              label: 'Amount ($)',
              data: [
                data.totalExpenses,
                data.revenue,
                data.dispatcherEarnings,
                data.driverEarnings,
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        setError('Error fetching chart data');
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Revenue and Expenses Overview',
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `$${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
  };

  if (loading) return <p>Loading chart data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-light-background dark:bg-dark-background shadow-lg rounded-lg p-6 m-4 flex justify-center items-center">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
        {chartData && <Pie data={chartData} options={options} />}
      </div>
    </div>
  );
};

export default RevenueChart;
