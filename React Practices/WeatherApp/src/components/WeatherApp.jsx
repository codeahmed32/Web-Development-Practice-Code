import React, { useState } from 'react'
import './WeatherApp.css'
import "tailwindcss";

const WeatherApp = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState("");
    const [backgroundImage, setBackgroundImage] = useState("/city-images/default.jpg");
    const [weatherData, setWeatherData] = useState(null);

    const getWeather = async (e) => {
        e.preventDefault();
        try {

            const weatherPromise = await fetch(`https://p2pclouds.up.railway.app/v1/learn/weather?city=${city}`);
            const data = await weatherPromise.json()
            console.log(data)


            setWeather(`${city}'s Weather is ${data.current.temp_c} Celcius`)

            if (data && data.current) {
                setWeatherData(data); // Poora data store karen
                updateCityImage(city); // Image update karne ka function call karen
            } else {
                setWeatherData(null);
                setBackgroundImage("/city-images/default.jpg");
            }

        } catch (err) {
            console.error("Error Fetching Data", err)
            setWeather("Error Fetching Data")
        }
    }

    const updateCityImage = (searchedCity) => {
        const cityName = searchedCity.trim().toLowerCase();
        if (cityName === "lahore") {
            setBackgroundImage("/city-images/lahore.jpg");
        } else if (cityName === "islamabad") {
            setBackgroundImage("/city-images/islamabad.jpg");
        } else if (cityName === "london") {
            setBackgroundImage("/city-images/london.jpg");
        } else {
            // Default image agar city mapping mein nahi hai
            setBackgroundImage("/city-images/default.jpg");
        }
    };





    return (
      <div 
    className="min-h-screen flex items-center justify-center p-4 md:p-6 bg-slate-900 bg-cover bg-center transition-all duration-1000 ease-in-out"
    style={{ 
      backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
      backgroundColor: '#0f172a' 
    }}
  >
    <div className="absolute inset-0 bg-black/40"></div>

    {/* Responsive Card: Mobile par width 'full' aur Medium screens par 'max-w-sm' */}
    <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-[90%] md:max-w-sm text-white animate-fade-in">
      
      <h3 className="text-2xl md:text-3xl font-extrabold mb-6 md:mb-8 text-center tracking-tight text-white">
        Weather <span className="text-blue-400">Explorer</span>
      </h3>
      
      <form onSubmit={getWeather} className="space-y-4 mb-6 md:mb-8">
        <input 
          type="text" 
          placeholder='Enter city name...' 
          className="w-full p-3 md:p-4 bg-black/30 border border-white/10 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-white transition-all text-sm md:text-base"
          onChange={(e) => setCity(e.target.value)}
        />
        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-4 rounded-xl md:rounded-2xl active:scale-95 transition-all shadow-lg text-sm md:text-base"
        >
          Search City
        </button>
      </form>

      {weatherData ? (
        <div className="space-y-4 md:space-y-6 text-center animate-fade-in-up">
          
          <div className="bg-white/10 rounded-2xl p-4 md:p-6 border border-white/10 shadow-inner">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-1">{weatherData.location.name}</h2>
            <p className="text-[10px] md:text-sm uppercase tracking-widest text-blue-300 font-medium">
              {weatherData.location.country}
            </p>
            <h1 className="text-5xl md:text-6xl font-extrabold mt-2 md:mt-4 text-white drop-shadow-md">
              {weatherData.current.temp_c}°C
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="bg-black/20 p-3 md:p-4 rounded-xl border border-white/5 text-center">
              <p className="text-[10px] md:text-xs text-blue-200 mb-1">Feels Like</p>
              <p className="font-bold text-lg md:text-xl">{weatherData.current.feelslike_c}°C</p>
            </div>
            <div className="bg-black/20 p-3 md:p-4 rounded-xl border border-white/5 text-center">
              <p className="text-[10px] md:text-xs text-blue-200 mb-1">Condition</p>
              <p className="font-bold text-sm md:text-lg leading-tight">{weatherData.current.condition.text}</p>
            </div>
          </div>

        </div>
      ) : (
        <p className="text-center text-gray-400 italic text-xs md:text-sm">Enter a city to see the magic!</p>
      )}
    </div>
  </div>
    )
}

export default WeatherApp;