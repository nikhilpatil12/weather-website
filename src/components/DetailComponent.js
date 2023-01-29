import { useEffect, useState } from 'react';
import styles from '../style.module.css';
import MenuBar from './MenuBar';
import WeatherDetails from './WeatherDetails';

const DetailComponent = () => {
    // setWeatherData(props.value);
    return <div className={styles.detail_component}>
        <MenuBar></MenuBar>
        <WeatherDetails></WeatherDetails>
    </div>
}
export default DetailComponent;