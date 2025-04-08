import { useState } from 'react';
import './index.css';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod === 200) {
        setWeather(data);
        setError('');
      } else {
        setWeather(null);
        setError(data.message || 'City not found.');
      }
    } catch (err) {
      setWeather(null);
      setError('Error fetching weather data.');
    }
  };

  const formatTime = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString();

  return (
    <div className="app">
      <h1 className="heading">🌤 Weather App</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>🌡 Temp: {weather.main.temp}°C</p>
          <p>🌥 Condition: {weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
          <p>🌅 Sunrise: {formatTime(weather.sys.sunrise)}</p>
          <p>🌇 Sunset: {formatTime(weather.sys.sunset)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
