import { useEffect, useState } from 'react';
import styles from '../style.module.css';
import MenuBar from './MenuBar';
import WeatherDetails from './WeatherDetails';

const DetailComponent = (props) => {
    const [weatherData, setWeatherData] = useState();
    useEffect(()=>{
        console.log(props.weather)
        setWeatherData(props.weather);
    },[props.weather]);
    // setWeatherData(props.value);
    return <div className={styles.detail_component}>
        <MenuBar></MenuBar>
        <WeatherDetails weather={weatherData} onChange={setWeatherData}></WeatherDetails>
    </div>
}
export default DetailComponent;