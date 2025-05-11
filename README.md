# Weather Online

The app fetches real-time weather data using the [Open-Meteo API](https://open-meteo.com/).

## Features

- Search for weather by city name
- View **current temperature**, wind speed, and region
- View **5-day forecast** with daily max/min temperatures
- Navigation buttons to switch between current weather and forecast views
- Emoji-based weather icons

## Project Structure

```
weather-online/
├── index.html
├── css/
│ └── style.css
└── js/
│ └── script.js
└── README.md 
```

## How It Works

1. User enters a city name.
2. The app uses the [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) to get coordinates.
3. On clicking **"Current Weather"**:
   - The app sends a GET request to the [Forecast API](https://open-meteo.com/en/docs#api_form) to get `current weather`.
4. On clicking **"5-Day Forecast"**:
   - The app fetches `daily` forecast data.
5. All data is displayed in a central card with weather icons.

## Getting Started

1. Click [Weather Online](https://unzeva.github.io/CtD-Weather/).
2. **Washington** weather is displayed by default.
3. Type any city name in the input field.
4. Click **"Current Weather"** or **"5-Day Forecast"** to switch views.

## License

This project is open source and free to use.
