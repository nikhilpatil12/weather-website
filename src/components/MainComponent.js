import React, { useState, useEffect, useContext, useMemo } from "react";
import styles from '../style.module.css';
import DetailComponent from "./DetailComponent";
import Sidebar from "./Sidebar";
import { WeatherDataContext } from "../contexts/WeatherDataContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

const MainComponent = () => {

  const [weatherData, setWeatherData] = useState();

  const [locationData, setLocationData] = useState();

  const wData = { weatherData, setWeatherData};
  
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
        weatherdata.locationState = locationdata.admin1;
        weatherdata.locationCountry = locationdata.country;
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
    return <div className="d-flex align-items-center justify-content-center" style={{height: '100%'}}><Spinner  animation="grow" style={{width: '100px', height: 'max-content'}}/></div>
  else
    return (
      <div className={styles.main_component}>
        <WeatherDataContext.Provider value={wData}>
          <Container fluid>
            {/* <Row> */}
              <Col lg={4} md={4} xl={3} xxl={3} sm={12} xs={12}>
                <Sidebar></Sidebar>
              </Col>
              <Col lg={{span: 8, offset:4}} md={{span: 8, offset:4}} xl={{span: 9, offset:3}} xxl={{span: 9, offset:3}} sm={{span:12, offset:12}} xs={{span:12, offset:12}}>
                <DetailComponent></DetailComponent>
              </Col>
            {/* </Row> */}
          </Container>
        </WeatherDataContext.Provider>
      </div>
    );
};

  
export default MainComponent;