import { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherAndTrafficAlerts = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('Dallas, Texas');
  const [inputLocation, setInputLocation] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=35aed3c0c31e316516ee854495c0f49d`
        );
        const weatherData = weatherResponse.data;

        setWeather({
          temperature: weatherData.main.temp,
          condition: weatherData.weather[0].description,
          windSpeed: weatherData.wind.speed,
          humidity: weatherData.main.humidity,
          icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (location) {
      fetchWeather();
    }
  }, [location]);

  const handleLocationChange = (e) => {
    setInputLocation(e.target.value);
  };

  const handleLocationSubmit = () => {
    if (inputLocation.trim()) {
      setLocation(inputLocation.trim());
      setInputLocation('');
    }
  };

  // Mock traffic alert data
  const trafficAlerts = [
    {
      severity: 'High',
      message: 'Accident causing severe delays on I-35 in Dallas. Avoid the area.',
      location: 'Dallas, Texas',
    },
    {
      severity: 'Low',
      message: 'Light snow causing slow traffic on Route 65. Drive safely.',
      location: 'Route 65, Minnesota',
    },
    {
      severity: 'Severe',
      message: 'Massive traffic jam in New York City. Expect major delays.',
      location: 'New York City, New York',
    },
  ];

  return (
    <div className="bg-light-background dark:bg-dark-background shadow-lg rounded-lg p-6 m-4 space-y-6">
      {/* Location Input */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputLocation}
          onChange={handleLocationChange}
          placeholder="Enter location"
          className="p-2 border rounded w-full bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white"
        />
        <button
          onClick={handleLocationSubmit}
          className="p-2 bg-blue-500 text-light-text dark:text-dark-text rounded hover:bg-blue-600"
        >
          Update
        </button>
      </div>

      {/* Weather Information */}
      {weather ? (
        <div className="flex items-center space-x-4 bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
          <img src={weather.icon} alt="weather-icon" className="w-16 h-16" />
          <div>
            <h3 className="text-xl text-light-text dark:text-dark-text font-semibold">{`Weather Update for ${location}`}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">Temperature: {weather.temperature}°C</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">Condition: {weather.condition}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">Wind Speed: {weather.windSpeed} km/h</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">Humidity: {weather.humidity}%</p>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}

      {/* Traffic Alerts */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Traffic Alerts</h3>
        {trafficAlerts.map((alert, index) => (
          <div key={index} className={`p-4 rounded-lg ${getSeverityClass(alert.severity)}`}>
            <h4 className="font-semibold text-lg">{alert.severity} Alert</h4>
            <p className="text-sm">{alert.message}</p>
            <p className="text-xs text-gray-600">Location: {alert.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to apply different styles based on alert severity
const getSeverityClass = (severity) => {
  switch (severity) {
    case 'Severe':
      return 'bg-red-100 text-red-800';
    case 'High':
      return 'bg-yellow-100 text-yellow-800';
    case 'Low':
      return 'bg-green-100 text-green-800';
    default:
      return '';
  }
};

export default WeatherAndTrafficAlerts;
