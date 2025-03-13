import React from 'react';
import './weatherapi.css';
import { useState } from 'react';

export default function Weather() {
  let [city, setCity] = useState('')
  let [wdetails, setWdetails] = useState()

  let getData = (event) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod === "404") {
          setWdetails(undefined)
        }
        else {
          setWdetails(finalRes)
        }
        console.log(finalRes)

      })
    event.preventDefault()
    setCity('')
  }
  let formattedSunrise = '';
  let formattedSunset = '';

  if (wdetails) {
    const sunriseTimestamp = wdetails.sys.sunrise;
    const sunsetTimestamp = wdetails.sys.sunset;

    const sunriseDate = new Date(sunriseTimestamp * 1000);
    const sunsetDate = new Date(sunsetTimestamp * 1000);

    const formatTime = (date) => {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };

    formattedSunrise = formatTime(sunriseDate);
    formattedSunset = formatTime(sunsetDate);
  }
  return (
    <div>

      <form onSubmit={getData}>
        <div class="input">
          <input type='text' value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter the city' />
          <button className='btn'>Submit</button>
        </div>
      </form>
      <div className='show'>
        {wdetails !== undefined ?
          <>
            <div class="dhruv">
              <div class="mainname">{wdetails.name} <i class="fa-solid fa-location-dot"></i> <p>{wdetails.sys.country}</p></div>
              <div class="paraghraph">The weather in {wdetails.name} is currently {wdetails.weather[0].description} with a temperature {wdetails.main.temp}°. Humidity is {wdetails.main.humidity} and visibility is {wdetails.visibility}. The wind is blowing from the northwest at {wdetails.wind.speed}.The atmospheric pressure is {wdetails.main.pressure}. </div>
              <div class="big">
                <div class="weatherdetails"><h2>Weather Details :</h2></div>
                <div class="four">
                  <div class="tempmain">
                    <div class="temp">temperature</div>
                    <div class="symbol"><i class="fa-solid fa-temperature-three-quarters"></i></div>
                    <div class="temperature">{wdetails.main.temp}°</div>
                  </div >
                  <div class="descriptionmain">
                    <div class="desc">description</div>
                    <div class="symbol"><i class="fa-regular fa-file-lines"></i></div>
                    <div class="descdeatial">{wdetails.weather[0].description} </div>
                  </div>
                  <div class="visibilitymain">
                    <div class="vis">visibility</div>
                    <div class="symbol"><i class="fa-solid fa-eye-slash"></i></div>
                    <div class="visdetail">{wdetails.visibility} Meters</div>
                  </div>
                  <div class="windspeedmain">
                    <div class="windspeed">wind speed</div>
                    <div class="symbol"><i class="fa-solid fa-wind"></i></div>
                    <div class="windspeeddetail">{wdetails.wind.speed} Km/h</div>
                  </div>
                </div>
                <div class="three">
                  <div class="pressuremain">
                    <div class="pressure">pressure</div>
                    <div class="symbol"><i className="fa-solid fa-mattress-pillow"></i></div>
                    <div class="pressuredetail">{wdetails.main.pressure} Pa</div>
                  </div>
                  <div class="humiditymain">
                    <div class="humidity">humidity</div>
                    <div class="himidityimg"><img src={require('./219816.png')}></img></div>
                    <div class="humiditydetail">{wdetails.main.humidity}  hygrometer</div>
                  </div>
                  <div class="sunrisemain">
                    <div class="sunrise">sun rise</div>
                    <div class="symbol"><i class="fa-solid fa-sun"></i></div>
                    <div class="sunrisedetail">{formattedSunrise} AM</div>
                  </div>
                  <div class="sunsetmain">
                    <div class="sunset">sun set</div>
                    <div class="symbol"><i class="fa-solid fa-moon"></i></div>
                    <div class="sunsetdetail">{formattedSunset} PM</div>
                  </div>
                </div>
              </div>
            </div>
          </>
          :
          "No Data"
        }
      </div>
    </div>  
  )
}