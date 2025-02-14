import React, { useState, useContext } from "react";
import { WeatherDataContext } from "../contexts/WeatherDataContext";
import { DayWeekContext } from "../contexts/DayWeekContext";
import styles from '../style.module.css';
import '../css/weather-icons.min.css';
import Collapse from 'react-bootstrap/Collapse';
import { Box, Grid2, IconButton, List } from "@mui/material";
import { TransitionGroup } from 'react-transition-group';
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from "@mui/material/Stack";

const WeatherDetails = () => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const wData = useContext(WeatherDataContext);
    console.log(wData.weatherData)
    var weekdata = wData.weatherData.daily;
    var daydata = wData.weatherData.hourly;

    const containerRef = React.useRef(null);

    const dwData = useContext(DayWeekContext);
    const prepareWeekWeatherObject = (data) => {
        // console.log(data)
        let weekweatherdata = [];
        for (var i = 0; i < 7; i++) {
            // console.log(data[i])
            var wd = {};
            wd.weekday = getWeekday(data.time[i]);
            wd.time = data.time[i];
            wd.apparent_temperature_max = data.apparent_temperature_max[i];
            wd.apparent_temperature_min = data.apparent_temperature_min[i];
            wd.et0_fao_evapotranspiration = data.et0_fao_evapotranspiration[i];
            wd.precipitation_hours = data.precipitation_hours[i];
            wd.precipitation_sum = data.precipitation_sum[i];
            wd.rain_sum = data.rain_sum[i];
            wd.shortwave_radiation_sum = data.shortwave_radiation_sum[i];
            wd.showers_sum = data.showers_sum[i];
            wd.snowfall_sum = data.snowfall_sum[i];
            wd.sunrise = data.sunrise[i];
            wd.sunset = data.sunset[i];
            wd.temperature_2m_max = data.temperature_2m_max[i];
            wd.temperature_2m_min = data.temperature_2m_min[i];
            wd.weathertype = getWeatherType(data.weathercode[i]);
            wd.weathercode = data.weathercode[i];
            wd.winddirection_10m_dominant = data.winddirection_10m_dominant[i];
            wd.windspeed_10m_max = data.windspeed_10m_max[i];
            weekweatherdata.push(wd);
        }
        // console.log(weekweatherdata);
        return weekweatherdata;
    }
    const prepareDayWeatherObject = (data, datetime) => {
        // console.log(data)
        let dayweatherdata = [];
        var len = 0;
        for (var i = 0; i < 100; i++) {
            // console.log(data[i])
            var datadate = data.time[i].split('T')[0];
            var currentdate = datetime.split('T')[0];
            var datatime = data.time[i].split('T')[1].split(':')[0]
            var currenttime = datetime.split('T')[1].split(':')[0]
            if (datadate >= currentdate && len < 24) {
                if ((datadate === currentdate && datatime > currenttime) || datadate > currentdate) {
                    var dd = {};
                    dd.time = data.time[i];
                    dd.hh = data.time[i].split('T')[1].split(':')[0];
                    dd.hour = getHour(data.time[i]);
                    dd.day = data.time[i].split('T')[0];
                    dd.apparent_temperature = data.apparent_temperature[i];
                    dd.cloudcover = data.cloudcover[i];
                    dd.dewpoint_2m = data.dewpoint_2m[i];
                    dd.precipitation = data.precipitation[i];
                    dd.rain = data.rain[i];
                    dd.relativehumidity_2m = data.relativehumidity_2m[i];
                    dd.showers = data.showers[i];
                    dd.snow_depth = data.snow_depth[i];
                    dd.snowfall = data.snowfall[i];
                    dd.temperature_2m = data.temperature_2m[i];
                    dd.temperature_rounded = Math.round(data.temperature_2m[i]);
                    dd.visibility = data.visibility[i];
                    dd.weathertype = getWeatherType(data.weathercode[i]);
                    dd.weathercode = data.weathercode[i];
                    dd.windspeed_10m = data.windspeed_10m[i];
                    dayweatherdata.push(dd);
                    len++;
                }
            }
        }
        console.log(dayweatherdata);
        return dayweatherdata;
    }

    const getWeekday = dateStr => {
        const date = new Date(dateStr);
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return weekdays[date.getUTCDay()];
    };

    const getHour = timeStr => {
        var hour = '';
        var hh = parseInt(timeStr.split('T')[1].split(':')[0]);

        if (hh !== 0 || hh !== 12) {
            if (hh > 0 && hh < 12)
                hour = hh + 'AM'
            if (hh > 12 && hh < 24)
                hour = (hh - 12) + 'PM'
        }
        if (hh === 0) {
            hour = '12AM'
        } if (hh === 12) {
            hour = '12PM'
        }
        return hour;
    }

    var processedWeekData = prepareWeekWeatherObject(weekdata);
    var processedDayData = prepareDayWeatherObject(daydata, wData.weatherData.current_weather.time);

    // console.log(processedDayData)
    // console.log(processedWeekData)
    // var weekRender, dayRender;
    // if(processedWeekData!=null){
    const weekRender = processedWeekData != null ? processedWeekData.map((processedData) =>
        //using mediaquery to determine desktop or mobile
        isDesktop ?
            <div className={styles.weekInfoBlock} key={processedData.time}>
                {processedData.weekday}<br></br>
                <div className={styles.weekWeatherIcon}>
                    {/* <img className={styles.weatherIcon} src = {MySvg}></img> */}
                    <i className={getWeatherIcon(processedData.weathercode, 7)} ></i>
                </div>
                {/* {processedData.weathertype} */}
                <div>{processedData.temperature_2m_min}º</div>
                <div>{processedData.temperature_2m_max}º</div>
            </div> :
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={0}>
                <span style={{ width: "15vw", alignContent: "start" }}>{processedData.weekday}</span>
                <span style={{ width: "15vw", alignContent: "start" }} className={styles.weekWeatherIcon}><i className={getWeatherIcon(processedData.weathercode, 7)} ></i></span>
                <span style={{ width: "15vw" }}>{processedData.temperature_2m_min}º </span>
                <span style={{ width: "15vw" }}>{processedData.temperature_2m_max}º</span>
            </Stack>
    ) : processedWeekData;

    const dayRender = (first, last) => processedDayData.slice(first, last).map((processedData) =>
        isDesktop ? <div className={styles.dayInfoBlock} key={processedData.time}>
            {processedData.hour}
            <div className={styles.dayWeatherIcon}>
                <i width='40px' className={getWeatherIcon(processedData.weathercode, processedData.hh)} ></i>
            </div>
            {processedData.temperature_rounded}º
        </div> :
            <div className={styles.dayInfoBlockMobile} key={processedData.time}>
                {processedData.hour}
                <div className={styles.dayWeatherIcon}>
                    <i width='40px' className={getWeatherIcon(processedData.weathercode, processedData.hh)} ></i>
                </div>
                {processedData.temperature_rounded}º
            </div>
    );
    const [cStart, setCstart] = useState(0);
    const [cEnd, setCend] = useState(isDesktop ? 8 : 6);
    const [cArr] = useState([0, 8, 16]);
    const [cDayWeek] = useState([1, 2]);

    const forward = () => {
        if (cStart < 18) {
            if (isDesktop) {
                setCstart(cStart + 8);
                setCend(cEnd + 8);
                console.log(cStart, cEnd)
            }
            else {
                setCstart(cStart + 6);
                setCend(cEnd + 6);
                console.log(cStart, cEnd)
            }
        }
    }
    const backward = () => {
        if (cStart > 0) {
            if (isDesktop) {
                setCstart(cStart - 8);
                setCend(cEnd - 8);
                console.log(cStart, cEnd)
            }
            else {
                setCstart(cStart - 6);
                setCend(cEnd - 6);
                console.log(cStart, cEnd)
            }
        }
    }
    // }


    function getWeatherType(weathercode) {
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

    function getWeatherIcon(weathercode, time) {
        switch (weathercode) {
            case 0:
                return time > 6 || time < 18 ? 'wi wi-day-sunny' : ' wi wi-night-clear'
            case 1:
                return time > 6 || time < 18 ? 'wi wi-day-cloudy' : 'wi wi-night-alt-partly-cloudy'
            case 2:
                return time > 6 || time < 18 ? 'wi wi-day-cloudy' : 'wi wi-night-alt-partly-cloudy' //| wi wi-day-cloudy-high
            case 3:
                return time > 6 || time < 18 ? 'wi wi-day-sunny-overcast' : 'wi wi-cloudy' //wi wi-cloudy
            case 45:
                return time > 6 || time < 18 ? 'wi wi-day-fog' : 'wi wi-night-fog' //wi wi-fog
            case 48:
                return time > 6 || time < 18 ? 'wi wi-day-fog' : 'wi wi-night-fog' //wi wi-fog 
            case 51:
                return time > 6 || time < 18 ? 'wi wi-day-showers' : 'wi wi-night-alt-showers'
            case 53:
                return time > 6 || time < 18 ? 'wi wi-day-showers' : 'wi wi-night-alt-showers'
            case 55:
                return time > 6 || time < 18 ? 'wi wi-day-showers' : 'wi wi-night-alt-showers'
            case 56:
                return time > 6 || time < 18 ? 'wi wi-day-sleet' : 'wi wi-night-alt-sleet'
            case 57:
                return time > 6 || time < 18 ? 'wi wi-day-sleet' : 'wi wi-night-alt-sleet'
            case 61:
                return time > 6 || time < 18 ? 'wi wi-day-rain' : 'wi wi-night-alt-rain' //wi wi-rain 
            case 63:
                return time > 6 || time < 18 ? 'wi wi-day-rain' : 'wi wi-night-alt-rain' //wi wi-rain 
            case 65:
                return time > 6 || time < 18 ? 'wi wi-day-rain' : 'wi wi-night-alt-rain' //wi wi-rain 
            case 66:
                return time > 6 || time < 18 ? 'wi wi-day-rain' : 'wi wi-night-alt-rain' //wi wi-rain 
            case 67:
                return time > 6 || time < 18 ? 'wi wi-day-rain' : 'wi wi-night-alt-rain' //wi wi-rain 
            case 71:
                return time > 6 || time < 18 ? 'wi wi-day-snow' : 'wi wi-night-alt-snow'
            case 73:
                return time > 6 || time < 18 ? 'wi wi-day-snow' : 'wi wi-night-alt-snow'
            case 75:
                return time > 6 || time < 18 ? 'wi wi-day-snow' : 'wi wi-night-alt-snow'
            case 77:
                return 'wi wi-snow';
            case 80:
                return time > 6 || time < 18 ? 'wi wi-day-rain-mix' : 'wi wi-night-alt-rain-mix'
            case 81:
                return time > 6 || time < 18 ? 'wi wi-day-rain-mix' : 'wi wi-night-alt-rain-mix'
            case 82:
                return time > 6 || time < 18 ? 'wi wi-day-rain-mix' : 'wi wi-night-alt-rain-mix'
            case 85:
                return time > 6 || time < 18 ? 'wi wi-day-snow' : 'wi wi-night-alt-snow'
            case 86:
                return time > 6 || time < 18 ? 'wi wi-day-snow' : 'wi wi-night-alt-snow'
            case 95:
                return time > 6 || time < 18 ? 'wi wi-day-thunderstorm' : 'wi wi-night-alt-thunderstorm'
            case 96:
                return time > 6 || time < 18 ? 'wi wi-day-snow-thunderstorm' : 'wi wi-night-alt-snow-thunderstorm'
            case 99:
                return time > 6 || time < 18 ? 'wi wi-day-snow-thunderstorm' : 'wi wi-night-alt-snow-thunderstorm'
            default:
                return 'Invalid code';
        }
    }

    const renderWeekOrDay = (item) => {
        return <div>{dwData.weekEnabled ? <Box className={styles.weekData}>{isDesktop ? weekRender : <Box sx={{ width: "90vw", margin: "0 5vw" }}><Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={0.5}
        >{weekRender}</Stack></Box>}</Box> : ''}
            {!dwData.weekEnabled ?
                <Box className={styles.dayData}>
                    <div className={styles.scrollview}>
                        <Grid2 container>
                            <Grid2 xs={1} sm={1} md={2} lg={1} xl={1} sx={{ alignSelf: "center" }}>
                                {cStart === 0 ? '' : <IconButton sx={{ border: 1 }} onClick={backward}><NavigateBefore></NavigateBefore></IconButton>}
                            </Grid2>
                            <Grid2 xs={10} sm={10} md={10} lg={10} xl={10}>
                                <Box id='collapse' ref={containerRef}>
                                    <List>
                                        <TransitionGroup>
                                            {cArr.map((start) => (
                                                <Collapse style={{ alignContent: "center" }} key={cStart} container={containerRef.current}>
                                                    <Box>
                                                        {dayRender(cStart, cEnd)}
                                                    </Box>
                                                </Collapse>

                                            ))}
                                        </TransitionGroup>
                                    </List>
                                </Box>
                            </Grid2>
                            <Grid2 xs={1} sm={1} md={1} lg={1} xl={1} sx={{ alignSelf: "center" }}>
                                {cStart === 16 || cStart === 18 ? '' : <IconButton sx={{ border: 1 }} onClick={forward}><NavigateNext></NavigateNext></IconButton>}
                            </Grid2>
                        </Grid2>
                    </div>
                </Box> : ''}
        </div>
    }

    if (weekRender == null || dayRender == null)
        return '';
    else return <Box>
        <List>
            <TransitionGroup>
                {cDayWeek.map((item) => (
                    <Collapse key={dwData.weekEnabled}>
                        {renderWeekOrDay({ item })}
                    </Collapse>))}
            </TransitionGroup>
        </List>
    </Box>
}

export default WeatherDetails;