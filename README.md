# Weather Online
Code the Dream pre-work assignment - a weather API
The app fetches real-time weather data using the [Open-Meteo API](https://open-meteo.com/) and displays it with intuitive icons and clear information.

## Features

- 🔍 Search for weather by city name
- 🌡️ View temperature and wind speed
- 🌍 Displays country and region
- 🎨 Clean, responsive UI
- 🔄 Refresh button to update weather
- ☁️ Emoji-based weather icons

## Project Structure
weather-online/
├── index.html
├── css/
│ └── style.css
└── js/
└── script.js

## How It Works

1. User enters a city name.
2. The app uses the [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) to get coordinates.
3. Then it fetches current weather data using the [Open-Meteo Forecast API](https://open-meteo.com/en/docs#api_form).
4. Weather information is displayed with relevant icon and values.

## Getting Started

1. Clone or download the repository.
2. Open `index.html` in a browser.
3. Start typing a city name and hit **Refresh**.

## License

This project is open source and free to use.
