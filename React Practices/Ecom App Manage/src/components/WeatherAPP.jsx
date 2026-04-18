import React from 'react'
import { useState } from 'react'


export const WeatherAPP = () => {
    // JavaScript
const [weatherInput, setWeather] = useState("")
const [resultDisplay, setResult] = useState("");

    async function getWeather(e) {  
        e.preventDefault();
        const promiseWeather = await fetch(`https://p2pclouds.up.railway.app/v1/learn/weather?city=${weatherInput}`)
        const data = await promiseWeather.json();
        console.log(data)
        setResult(data.current.temp_c)
    }

    

    return (

        // HTML 

        <div>
            <h2>Weather App Using React</h2>
            <div>

                <form onSubmit={getWeather}>
                    <input type="text" name="weatherInput" id="weatherInput" placeholder="Enter City" onChange={(e)=>{setWeather(e.target.value)}} />
                    <button>Get Weather</button>
                    <div>The Temp in {weatherInput} is {resultDisplay}</div>
                </form>

            </div>
        </div>
    )
}
export default WeatherAPP;
