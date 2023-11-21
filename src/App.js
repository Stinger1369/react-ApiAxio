import React, { useState } from 'react';
import axios from 'axios';
import "./style.css"

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [cityImage, setCityImage] = useState(null);
  const weatherApiKey = "2d304f5f2302b651213e56d606465022";
  const unsplashAccessKey = "9WWM5FaAgR5NV2l-GsdjL5A1FK0hRUYkIgWJM7CIzXE"; // Remplacez par votre clé Unsplash

  const fetchWeatherAndImage = () => {
    if (!city) {
      alert("Veuillez entrer le nom d'une ville.");
      return;
    }

    // Appel API météo
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`;

    axios.get(weatherUrl)
      .then((response) => {
        console.log(response.data)
        setWeather(response.data);
        fetchCityImage(city);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données météo :', error);
      });
  };

  const fetchCityImage = (cityName) => {
    const unsplashUrl = `https://api.unsplash.com/search/photos?page=1&query=${cityName}&client_id=${unsplashAccessKey}`;

    axios.get(unsplashUrl)
      .then((response) => {
        const firstImage = response.data.results[0];
        setCityImage(firstImage.urls.regular);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des images :', error);
      });
  };

  return (
    <div className="App">
      <div>
        <input 
          type="text" 
          placeholder="Entrez le nom d'une ville" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
        />
        <button onClick={fetchWeatherAndImage}>Charger la météo et image</button>
      </div>
      {weather && (
       <div>
       <h2>Météo à {weather.name}</h2>
       <p>Température : {(weather.main.temp - 273.15).toFixed(2)} °C</p>
       <p>Conditions : {weather.weather[0].description}</p>
       <p>Longitude : {weather.coord.lon}</p>
       <p>Latitude : {weather.coord.lat}</p>
       <p>Vitesse du vent : {weather.wind.speed} m/s</p>
       <p>Humidité : {weather.main.humidity} %</p>
       <p>Pression atmosphérique : {weather.main.pressure} hPa</p>
     </div>
      )}
      {cityImage && <img src={cityImage} alt={`Vue de ${city}`} />}
    </div>
  );
}

export default App;