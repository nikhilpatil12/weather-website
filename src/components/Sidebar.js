import React, { useContext, useEffect, useState } from "react";
import Search from "./Search";
import styles from '../style.module.css';
import { WeatherDataContext } from "../contexts/WeatherDataContext";
import classNames from "classnames";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Container, Box } from "@mui/system";
import { Divider } from "@mui/material";
import '../css/CustomMuiComponents.css'

const Sidebar = (props) =>{
    // const [weatherData, setWeatherData] = useState();
    // const [locationData, setLocationData] = useState();

    const { weatherData, setWeatherData} = useContext(WeatherDataContext);
    var daydata = weatherData.hourly;
    var weekData = weatherData.daily;

    const getDaySummary = (data, datetime) => {
        // console.log(data)
        let daysummary = [];
        var len = 0;
        var summary=[];
        var avgRain = 0, avgCloud=0;
        var sumRain=0, sumCloud=0;
        for(var i=0;i<50;i++){
            // console.log(data[i])
            var datadate = data.time[i].split('T')[0];
            var currentdate = datetime.split('T')[0];
            var datatime = data.time[i].split('T')[1].split(':')[0]
            var currenttime = datetime.split('T')[1].split(':')[0]
            if(datadate >= currentdate && len<24)
            {
                if((datadate===currentdate && datatime>currenttime)||datadate>currentdate){;
                    sumCloud += data.cloudcover[i];
                    sumRain += data.precipitation_probability[i];
                    len++;
                }
            }
        }
        avgRain= parseInt(sumRain/24);
        avgCloud = parseInt(sumCloud/24) ;
        // avgRain = weekData.precipitation_probability_max[0];
        daySummary = {"avgCloud":avgCloud, "avgRain":avgRain}
        return daySummary;
    }

    var daySummary = getDaySummary(daydata, weatherData.current_weather.time)

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

    function getWeatherType (weathercode){
        switch (weathercode) {
            case 0:
                return 'Clear sky';  //day-sunny || night-clear
            case 1:
                return 'Mainly clear'; // day-cloudy || night-alt-partly-cloudy
            case 2:
                return 'partly cloudy'; // day-cloudy | day-cloudy-high || night-alt-partly-cloudy
            case 3:
                return 'Overcast'; // day-sunny-overcast | cloudy || cloudy
            case 45:
                return 'Fog'; // fog | day-fog || night-fog
            case 48:
                return 'Depositing rime fog'; // fog | day-fog || night-fog
            case 51:
                return 'Drizzle: Light'; // day-showers || night-alt-showers
            case 53:
                return 'Drizzle: Moderate'; // day-showers || night-alt-showers
            case 55:
                return 'Drizzle: Dense intensity'; // day-showers || night-alt-showers
            case 56:
                return 'Freezing Drizzle: Light intensity'; // day-sleet || night-alt-sleet
            case 57:
                return 'Freezing Drizzle: Dense intensity'; // day-sleet || night-alt-sleet
            case 61:
                return 'Rain: Slight intensity'; // rain | day-rain || night-alt-rain
            case 63:
                return 'Rain: Moderate intensity';  // rain | day-rain || night-alt-rain
            case 65:
                return 'Rain: Heavy intensity'; // rain | day-rain || night-alt-rain
            case 66:
                return 'Freezing Rain: Light intensity'; // rain | day-rain || night-alt-rain
            case 67:
                return 'Freezing Rain: Heavy intensity'; // rain | day-rain || night-alt-rain
            case 71:
                return 'Snow fall: Slight intensity'; // day-snow || night-alt-snow
            case 73:
                return 'Snow fall: Moderate intensity'; // day-snow || night-alt-snow
            case 75:
                return 'Snow fall: Heavy intensity'; // day-snow || night-alt-snow
            case 77:
                return 'Snow grains'; // wi-snow
            case 80:
                return 'Rain showers: Slight'; // day-rain-mix || night-alt-rain-mix
            case 81:
                return 'Rain showers: Moderate'; // day-rain-mix || night-alt-rain-mix
            case 82:
                return 'Rain showers: Violent'; // day-rain-mix || night-alt-rain-mix
            case 85:
                return 'Snow showers slight'; // day-snow || night-alt-snow
            case 86:
                return 'Snow showers heavy'; // day-snow || night-alt-snow
            case 95:
                return 'Thunderstorm: Slight'; // day-thunderstorm || night-alt-thunderstorm
            case 96:
                return 'Thunderstorm with slight hail'; // day-snow-thunderstorm || night-alt-snow-thunderstorm
            case 99:
                return 'Thunderstorm with heavy hail'; // day-snow-thunderstorm || night-alt-snow-thunderstorm
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
            <Box sx={{padding: "20px"}}>
                <h4 className={`${styles.currentWeather}`}>
                    {weatherData.locationName}, {weatherData.locationState}, {weatherData.locationCountry}
                </h4>
            </Box>
            <Box sx={{padding: "10px 0 0"}}>
                <div className={classNames(styles.currentWeather, styles.currentWeatherIcon)}>
                    <i className={getWeatherIcon(weatherData.current_weather.weathercode, weatherData.current_weather.time.split('T')[1].split(':')[0])} ></i>
                </div>
            </Box>
            <Box sx={{padding: "10px 0 0"}}>
                <div className={`${styles.currentWeather} ${styles.currentWeatherTemp} d-flex align-items-center justify-content-start`}>{Math.round(weatherData.current_weather.temperature)}{weatherData.daily_units.apparent_temperature_max}</div>
            </Box>
            <Box>
                <h4 className={`${styles.currentWeather} d-flex align-items-center justify-content-start`}>{getWeekday(weatherData.current_weather.time.split('T')[0])} {weatherData.current_weather.time.split('T')[1]}</h4>
            </Box>
            <Divider sx={{padding: "10px 0 0"}}/>
            <Box sx={{padding: "10px 0"}}>
                <h4 className={`${styles.currentWeather} d-flex align-items-center justify-content-start`}>
                    <Grid2 container spacing={2}>
                        <Grid2 xs={3} md={3} lg={3} sm={3} xl={3}>
                            <Box className={styles.sideSmallWeatherIcon}>
                                <i className={getWeatherIcon(2, weatherData.current_weather.time.split('T')[1].split(':')[0])} ></i>
                            </Box>
                        </Grid2>
                        <Grid2 xs={9} md={9} lg={9} sm={9} xl={9} sx={{alignSelf: "center", textAlign: "left"}}>
                            <Box sx={{padding: "15px"}}>
                                { getWeatherType(weatherData.current_weather.weathercode) }
                            </Box>
                        </Grid2>
                        <Grid2 xs={3} md={3} lg={3} sm={3} xl={3}>
                            <Box className={styles.sideSmallWeatherIcon}>
                                <i className={`wi wi-rain`} ></i>
                            </Box>
                        </Grid2>
                        <Grid2 xs={9} md={9} lg={9} sm={9} xl={9} sx={{alignSelf: "center", textAlign: "left"}}>
                            <Box sx={{padding: "15px"}}>
                                Rain: {daySummary.avgRain} %
                            </Box>
                        </Grid2>
                    </Grid2>
                </h4>
            </Box>
        </Container>
    </div>
}
export default Sidebar;