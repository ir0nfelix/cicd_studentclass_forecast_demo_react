import { useState, useEffect } from 'react';
import './index.css';

const CITIES = [
  { id: 'moscow', name: 'Москва (moscow)' },
  { id: 'spb', name: 'Санкт-Петербург (spb)' },
  { id: 'novosibirsk', name: 'Новосибирск (novosibirsk)' },
  { id: 'rostov', name: 'Ростов-на-Дону (rostov)' }
];

function App() {
  const [city, setCity] = useState(CITIES[0].id);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      setWeather(null);
      try {
        const response = await fetch(`/api/weather/${city}`);
        if (!response.ok) {
          throw new Error('Ошибка сети при загрузке погоды');
        }
        const data = await response.json();
        setWeather(data.fact);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="app-container">
      <div className="weather-card">
        <header className="header">
          <h1 className="title">Fullstack Прогноз Погоды</h1>
          <select
            className="city-select"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            {CITIES.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </header>

        {loading && (
          <div className="status-container">
            <div className="loader"></div>
            <p>Загрузка данных...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {weather && !loading && !error && (
          <div className="weather-info">
            <div className="temp-main">
              <div className="temp-value">{weather.temp}°</div>
              <div className="condition">{weather.condition}</div>
            </div>

            <div className="details">
              <div className="detail-item">
                <span className="detail-label">Ощущается как</span>
                <span className="detail-value">{weather.feels_like}°</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
