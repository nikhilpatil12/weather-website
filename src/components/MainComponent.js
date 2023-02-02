import React, { useState, useEffect, useContext, useMemo } from "react";
import styles from '../style.module.css';
import DetailComponent from "./DetailComponent";
import Sidebar from "./Sidebar";
import { WeatherDataContext } from "../contexts/WeatherDataContext";
const MainComponent = () => {

  const [weatherData, setWeatherData] = useState();

  const wData = { weatherData, setWeatherData };

  const [locationData, setLocationData] = useState();
  
  useEffect(() => {
      const fetchData = async() => {
        var weatherdata = {};
        var locationdata = {};

        await fetch('https://geocoding-api.open-meteo.com/v1/search?name=Los%20Angeles')
          .then(response=>response.json())
          .then(searchResults=>{
              console.log(searchResults.results);
              locationdata = searchResults.results[0];
        })
    
        await fetch('https://api.open-meteo.com/v1/forecast?latitude='+locationdata.latitude+'&longitude='+locationdata.longitude+'&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation,rain,showers,snowfall,snow_depth,weathercode,cloudcover,visibility,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,windspeed_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto')
              .then(response => response.json())
              .then(wData => {
                weatherdata=wData;
        });
        weatherdata.locationName = locationdata.name;
        wData.setWeatherData(weatherdata);
        setLocationData(locationdata);
        // props.onChange(weatherdata);
      }
      fetchData().catch(console.error);
  },[]);
  // console.log(weatherData)
  // if (weatherData==null || locationData==null )
  //   return <div>Loading</div>
  // else

  if (weatherData==null)
    return <div>Loading</div>
  else
    return (
      <div className={styles.main_component}>
        <WeatherDataContext.Provider value={wData}>
          <Sidebar></Sidebar>
          <DetailComponent></DetailComponent>
        </WeatherDataContext.Provider>
      </div>
    );
};

  
export default MainComponent;