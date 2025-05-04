const cityInput = document.getElementById('cityInput');
const refreshButton = document.getElementById('refreshButton');

const cityName = document.getElementById('cityName');
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
  
      // Отображение
      cityName.textContent = location.name;
      regionCountry.textContent = `${location.admin1}, ${location.country}`;
      temperature.textContent = `${weather.temperature}°C`;
      weatherDescription.textContent = `Wind: ${weather.windspeed} km/h`;
  
      const icon = weatherIcons[weather.weathercode] || '❓';
  
      // Иконку теперь выводим как просто текст (emoji) в <div>
      const weatherIconDiv = document.getElementById('weatherIcon');
      weatherIconDiv.innerHTML = icon;
      weatherIconDiv.style.fontSize = '48px';
  
    } catch (error) {
      console.error(error);
      cityName.textContent = 'City not found';
      regionCountry.textContent = '';
      temperature.textContent = '--';
      weatherDescription.textContent = '';
  
      const weatherIconDiv = document.getElementById('weatherIcon');
      weatherIconDiv.innerHTML = '';
    }
  }
  
  
  //Button
  refreshButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
      getWeather(city);
    }
  });
  
  // Default weather
  window.addEventListener('load', () => {
    getWeather('Washington');
  });
    
