import React, { useState, useEffect, useContext, useMemo } from "react";
import styles from '../style.module.css';
import DetailComponent from "./DetailComponent";
import Sidebar from "./Sidebar";
import { WeatherDataContext } from "../contexts/WeatherDataContext";
import {Container} from "@mui/material";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { LinearProgress } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';

const MainComponent = () => {

  const [weatherData, setWeatherData] = useState();

  const [locationData, setLocationData] = useState();

  const wData = { weatherData, setWeatherData};
  
  useEffect(() => {
      const fetchData = async() => {
        var weatherdata = {};
        var locationdata = {};
        var aqidata = {};

        await fetch('https://geocoding-api.open-meteo.com/v1/search?name=Los%20Angeles')
          .then(response=>response.json())
          .then(searchResults=>{
              console.log(searchResults.results);
              locationdata = searchResults.results[0];
        })
    
        await fetch('https://api.open-meteo.com/v1/forecast?latitude='+locationdata.latitude+'&longitude='+locationdata.longitude+'&hourly=temperature_2m,precipitation_probability,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation,rain,showers,snowfall,snow_depth,weathercode,cloudcover,visibility,windspeed_10m&daily=uv_index_max,uv_index_clear_sky_max,weathercode,precipitation_probability_max,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,windspeed_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto')
              .then(response => response.json())
              .then(wData => {
                weatherdata=wData;
        });

        await fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude='+locationdata.latitude+'&longitude='+locationdata.longitude+'&hourly=pm10,pm2_5,us_aqi,us_aqi_pm2_5,us_aqi_pm10')
                .then(response => response.json())
                .then(wData => {
                    aqidata=wData;
        });
        weatherdata.locationName = locationdata.name;
        weatherdata.locationState = locationdata.admin1;
        weatherdata.locationCountry = locationdata.country;
        weatherdata.aqi = aqidata;
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
    return (<div className={styles.main_component}><Container><LinearProgress color="secondary" /></Container></div>)
  else
    return (
      <Grid2 className={styles.main_component}>
        <WeatherDataContext.Provider value={wData}> 
        {/*  */}
        <Grid2 container spacing={0} direction={{ md: 'row', lg: 'row', xl: 'row', xxl: 'row', sm: 'column', xs: 'column' }} 
  justifyContent="center"
  alignItems="stretch">
          <Grid2 lg={4} md={4} xl={3} xxl={3} sm={12} xs={12}>
            <Sidebar></Sidebar>
          </Grid2>
          <Grid2 lg={8} md={8} xl={9} xxl={9} sm={12} xs={12}>
            <DetailComponent></DetailComponent>
          </Grid2>
        </Grid2>
        </WeatherDataContext.Provider>
      </Grid2>
    );
};

  
export default MainComponent;