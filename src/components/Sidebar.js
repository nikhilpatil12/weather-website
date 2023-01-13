import React, { useContext, useEffect, useState } from "react";
import Search from "./Search";
import styles from '../style.module.css';
import { WeatherDataContext } from "../contexts/WeatherDataContext";

const Sidebar = (props) =>{
    // const [weatherData, setWeatherData] = useState();
    // const [locationData, setLocationData] = useState();

    const { weatherData, setWeatherData } = useContext(WeatherDataContext);
    
    useEffect(() => {
        // setWeatherData(props.weather)
        console.log(weatherData)
        // setLocationData(props.location)
        // console.log(props.location)
        // props.onChange(weatherData);
    },[weatherData]);

    if (weatherData==null)
        return <div></div>
    else
    return <div className={styles.sidebar}>
        <Search></Search>
        <div>
          Latitude:{weatherData.latitude}, Longitude:{weatherData.longitude}, City={weatherData.locationName}
        </div>
    </div>
}
export default Sidebar;