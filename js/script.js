const cityInput = document.getElementById('cityInput');
const refreshButton = document.getElementById('refreshButton');

const cityName = document.getElementById('citycard');
const regionCountry = document.getElementById('regionCountry');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');
const weatherIcon =document.getElementById('weatherIcon');

//Icon Mapping
const weatherIcons = {
    0: '☀️', // clear
    1: '🌤️', // mainly clear
    2: '⛅',  // partly cloudy
    3: '☁️', // overcast
    45: '🌫️', // fog
    61: '🌧️', // light rain
    71: '❄️', // snow
    95: '⛈️'  // thunderstorm
  };
  
  async function getCoords(city) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`;
  
    const response = await fetch(geoUrl);
    const data = await response.json();
  
    if (data.results && data.results.length > 0) {
      const location = data.results[0];
      return {
        lat: location.latitude,
        lon: location.longitude,
        name: location.name,
        country: location.country,
        admin1: location.admin1 || '' // Region
      };
    } else {
      throw new Error("City not found");
    }
  }
  
  async function getWeather(city) {
      try {
        const location = await getCoords(city);
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`;
        const response = await fetch(weatherUrl);
        const data = await response.json();
        const weather = data.current_weather;

        // Display data
        document.getElementById('citycard').textContent = location.name;
        document.getElementById('regionCountry').textContent = `${location.admin1}, ${location.country}`;
        document.getElementById('temperature').textContent = `${weather.temperature}°C`;
        document.getElementById('weatherDescription').textContent = `Wind: ${weather.windspeed} km/h`;
        document.getElementById('weatherIcon').innerHTML = weatherIcons[weather.weathercode] || '❓';

        // Toggle visibility
        document.getElementById('currentWeather').style.display = 'block';
        document.getElementById('forecastWeather').style.display = 'none';

      } catch (error) {
        console.error(error);
        document.getElementById('citycard').textContent = 'City not found';
        document.getElementById('regionCountry').textContent = '';
        document.getElementById('temperature').textContent = '--';
        document.getElementById('weatherDescription').textContent = '';
        document.getElementById('weatherIcon').innerHTML = '';
      }
    }

async function getForecast(city) {
  try {
    const location = await getCoords(city);
    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
    const response = await fetch(forecastUrl);
    const data = await response.json();
    const forecastData = data.daily;

    let forecastHtml = `<h2>5-Day Forecast for ${location.name}</h2><ul>`;
    for (let i = 0; i < 5; i++) {
      forecastHtml += `<li><strong>${forecastData.time[i]}</strong>: ${forecastData.temperature_2m_max[i]}°C / ${forecastData.temperature_2m_min[i]}°C</li>`;
    }
    forecastHtml += '</ul>';

    // Insert forecast HTML
    document.getElementById('forecastWeather').innerHTML = forecastHtml;

    // Toggle visibility
    document.getElementById('currentWeather').style.display = 'none';
    document.getElementById('forecastWeather').style.display = 'block';

  } catch (error) {
    console.error(error);
    document.getElementById('forecastWeather').innerHTML = 'Forecast not available.';
  }
}

  // Bind buttons
     document.getElementById('currentBtn').addEventListener('click', () => {
      const city = cityInput.value.trim() || 'Washington';
      getWeather(city);
    });

    document.getElementById('forecastBtn').addEventListener('click', () => {
      const city = cityInput.value.trim() || 'Washington';
      getForecast(city);
    });
  
  // Default weather
  window.addEventListener('load', () => {
    getWeather('Washington');
  });
    
