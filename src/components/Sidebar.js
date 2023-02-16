import React, { useContext, useEffect, useState } from "react";
import Search from "./Search";
import styles from '../style.module.css';
import { WeatherDataContext } from "../contexts/WeatherDataContext";
import { Container } from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import classNames from "classnames";

const Sidebar = (props) =>{
    // const [weatherData, setWeatherData] = useState();
    // const [locationData, setLocationData] = useState();

    const { weatherData, setWeatherData} = useContext(WeatherDataContext);
    console.log(weatherData)
    // useEffect(() => {
    // //     // setWeatherData(props.weather)
    // //     console.log(weatherData)
    // //     // setLocationData(props.location)
    // //     // console.log(props.location)
    // //     // props.onChange(weatherData);
    //     console.log(weatherData)
    // },[weatherData]);

    function getWeatherIcon (weathercode, time){
        switch (weathercode) {
            case 0:
                return time>6 || time<18 ? 'wi wi-day-sunny' : ' wi wi-night-clear'
            case 1:
                return time>6 || time<18 ? 'wi wi-day-cloudy' : 'wi wi-night-alt-partly-cloudy'
            case 2:
                return time>6 || time<18 ? 'wi wi-day-cloudy' : 'wi wi-night-alt-partly-cloudy' //| wi wi-day-cloudy-high
            case 3:
                return time>6 || time<18 ? 'wi wi-day-sunny-overcast' : 'wi wi-cloudy' //wi wi-cloudy
            case 45:
                return time>6 || time<18 ? 'wi wi-day-fog' : 'wi wi-night-fog' //wi wi-fog
            case 48:
                return time>6 || time<18 ? 'wi wi-day-fog' : 'wi wi-night-fog' //wi wi-fog 
            case 51:
                return time>6 || time<18 ? 'wi wi-day-showers' : 'wi wi-night-alt-showers'
            case 53:
                return time>6 || time<18 ? 'wi wi-day-showers' : 'wi wi-night-alt-showers'
            case 55:
                return time>6 || time<18 ? 'wi wi-day-showers' : 'wi wi-night-alt-showers'
            case 56:
                return time>6 || time<18 ? 'wi wi-day-sleet' : 'wi wi-night-alt-sleet'
            case 57:
                return time>6 || time<18 ? 'wi wi-day-sleet' : 'wi wi-night-alt-sleet'
            case 61:
                return time>6 || time<18 ? 'wi wi-day-rain' : 'wi wi-night-alt-rain' //wi wi-rain 
            case 63:
                return time>6 || time<18 ? 'wi wi-day-rain' : 'wi wi-night-alt-rain' //wi wi-rain 
            case 65:
                return time>6 || time<18 ? 'wi wi-day-rain' : 'wi wi-night-alt-rain' //wi wi-rain 
            case 66:
                return time>6 || time<18 ? 'wi wi-day-rain' : 'wi wi-night-alt-rain' //wi wi-rain 
            case 67:
                return time>6 || time<18 ? 'wi wi-day-rain' : 'wi wi-night-alt-rain' //wi wi-rain 
            case 71:
                return time>6 || time<18 ? 'wi wi-day-snow' : 'wi wi-night-alt-snow'
            case 73:
                return time>6 || time<18 ? 'wi wi-day-snow' : 'wi wi-night-alt-snow'
            case 75:
                return time>6 || time<18 ? 'wi wi-day-snow' : 'wi wi-night-alt-snow'
            case 77:
                return 'wi wi-snow';
            case 80:
                return time>6 || time<18 ? 'wi wi-day-rain-mix' : 'wi wi-night-alt-rain-mix'
            case 81:
                return time>6 || time<18 ? 'wi wi-day-rain-mix' : 'wi wi-night-alt-rain-mix'
            case 82:
                return time>6 || time<18 ? 'wi wi-day-rain-mix' : 'wi wi-night-alt-rain-mix'
            case 85:
                return time>6 || time<18 ? 'wi wi-day-snow' : 'wi wi-night-alt-snow'
            case 86:
                return time>6 || time<18 ? 'wi wi-day-snow' : 'wi wi-night-alt-snow'
            case 95:
                return time>6 || time<18 ? 'wi wi-day-thunderstorm' : 'wi wi-night-alt-thunderstorm'
            case 96:
                return time>6 || time<18 ? 'wi wi-day-snow-thunderstorm' : 'wi wi-night-alt-snow-thunderstorm'
            case 99:
                return time>6 || time<18 ? 'wi wi-day-snow-thunderstorm' : 'wi wi-night-alt-snow-thunderstorm'
            default:
                return 'Invalid code';
        }
    }

    const getWeekday = dateStr => {
        const date = new Date(dateStr);
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return weekdays[date.getUTCDay()];
    };


    if (weatherData==null)
        return <div></div>
    else
    return <div className={styles.sidebar}>
        {/*  */}
        <Search></Search>
        <Container>
            <Row>
                <Col>
                    <h4 className={`${styles.currentWeather}`}>
                        {weatherData.locationName}, {weatherData.locationState}, {weatherData.locationCountry}
                    </h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className={classNames(styles.currentWeather, styles.currentWeatherIcon)}>
                        <i className={getWeatherIcon(weatherData.current_weather.weathercode, weatherData.current_weather.time.split('T')[1].split(':')[0])} ></i>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className={`${styles.currentWeather} ${styles.currentWeatherTemp} d-flex align-items-center justify-content-start`}>{Math.round(weatherData.current_weather.temperature)}{weatherData.daily_units.apparent_temperature_max}</div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4 className={`${styles.currentWeather} d-flex align-items-center justify-content-start`}>{getWeekday(weatherData.current_weather.time.split('T')[0])}, {weatherData.current_weather.time.split('T')[1]}</h4>
                </Col>
            </Row>
            ----------------------------------------
            <Row>
                <Col>
                    <h4 className={`${styles.currentWeather} d-flex align-items-center justify-content-start`}>
                        {/* TODO */}
                        <Row>
                            <Col></Col>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <Col></Col>
                        </Row>
                    </h4>
                </Col>
            </Row>
          {/* Latitude:{weatherData.latitude}, Longitude:{weatherData.longitude}, City={weatherData.locationName} */}
        </Container>
    </div>
}
export default Sidebar;