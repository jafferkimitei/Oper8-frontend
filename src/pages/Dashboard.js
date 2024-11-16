import React, { useEffect, useState } from 'react';
import Layout from "../components/Layout";
import StatCard from "../components/Dashboard/StatCard";
import TopLocationsMap from "../components/Dashboard/TopLocationsMap";
import WeatherAndTrafficAlerts from "../components/Dashboard/WeatherAndTrafficAlerts";
import RevenueChart from "../components/Dashboard/RevenueChart";
import { fetchStats } from '../services/stats-api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDrivers: 0,
    totalDispatchers: 0,
    totalLoads: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchStats();
        setStats(data);
      } catch (error) {
        setError('Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  if (error) {
    return <p>{error}</p>;
  }

  const statsArray = [
    { title: 'Total Drivers', value: stats.totalDrivers },
    { title: 'Total Dispatchers', value: stats.totalDispatchers },
    { title: 'Total Loads', value: stats.totalLoads },
    { title: 'Total Trucks', value: stats.totalDrivers },
  ];

  const locations = [
    { name: "Austin, Texas", coordinates: [30.2672, -97.7431] },
    { name: "Miami, Florida", coordinates: [25.7617, -80.1918] },
    { name: "DFW, Texas (Dallas-Fort Worth)", coordinates: [32.8998, -97.0403] },
    { name: "Minnesota", coordinates: [46.7296, -94.6859] },
  ];

  return (
    <Layout loading={loading}>
      {error && <p>{error}</p>}
      {!loading && (
        <div className="content">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {statsArray.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        <RevenueChart />
        <WeatherAndTrafficAlerts />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        <TopLocationsMap locations={locations} />
      </div>
      </div>
       )}
      
    </Layout>
  );
};

export default Dashboard;
