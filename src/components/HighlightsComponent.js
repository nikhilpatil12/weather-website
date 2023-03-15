import React, { useState, useContext } from "react";
import { WeatherDataContext } from "../contexts/WeatherDataContext";
import { DayWeekContext } from "../contexts/DayWeekContext";
import styles from '../style.module.css';
import '../css/weather-icons.min.css';
import { Container, Card,  Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ProgressBar from 'react-customizable-progressbar'
import '../css/CustomMuiComponents.css'
import { LineProgressBar } from '@frogress/line'

const HighlightsComponent = () => {
    // setWeatherData(props.value);
    const [weekEnabled, setWeekEnabled] = useState(false)
    const { weatherData } = useContext(WeatherDataContext);
    var daydata = weatherData.hourly;
    var aqidata = weatherData.aqi;
    var weekData = weatherData.daily;
    var currentWeather = weatherData.current_weather;
    const wData = { weekEnabled, setWeekEnabled };
    var uvindex = weekData.uv_index_max[0];

    const getUVIndexRiskLevel = (uvIndex) => {
        if (uvIndex <= 2) return "Low";
        else if (uvIndex <= 5) return "Moderate";
        else if (uvIndex <= 7) return "High";
        else if (uvIndex <= 10) return "Very high";
        else return "Extreme";
    }

    var uv_string = getUVIndexRiskLevel(uvindex);

    var sunset = weekData.sunset[0].split('T')[1]
    var sunrise = weekData.sunrise[0].split('T')[1]

    const getHour = timeStr => {
        var hour='';
        var hh = parseInt(timeStr.split('T')[1].split(':')[0]);

        if(hh!==0 || hh!==12){
            if(hh>0 && hh<12)
                hour = hh+'AM'
            if(hh>12 && hh<24)
                hour = (hh-12)+'PM'
        }
        if(hh===0){
            hour = '12AM'
        }if(hh===12){
            hour = '12PM'
        }
        return hour;
    }

    const prepareDayWeatherObject = (data, aqidata, datetime) => {
        var dd={};
        for(var i=0;i<100;i++){
            // console.log(data[i])
            var datadate = data.time[i].split('T')[0];
            var currentdate = datetime.split('T')[0];
            var datatime = data.time[i].split('T')[1].split(':')[0]
            var currenttime = datetime.split('T')[1].split(':')[0]
            if(datadate === currentdate)
            {
                if(datadate===currentdate && datatime===currenttime){
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
                    dd.us_aqi = aqidata.hourly.us_aqi[i];
                    dd.us_aqi = aqidata.hourly.pm2_5[i];
                    dd.us_aqi = aqidata.hourly.pm10[i];
                    dd.showers = data.showers[i];
                    dd.snow_depth = data.snow_depth[i];
                    dd.snowfall = data.snowfall[i];
                    dd.temperature_2m = data.temperature_2m[i];
                    dd.temperature_rounded = Math.round(data.temperature_2m[i]);
                    dd.visibility = data.visibility[i];
                    // dd.weathertype = getWeatherType(data.weathercode[i]);
                    dd.weathercode = data.weathercode[i];
                    dd.windspeed_10m = data.windspeed_10m[i];
                }
            }
        }
        console.log(dd);
        return dd;
    }
    var processedDayData = prepareDayWeatherObject(daydata, aqidata, weatherData.current_weather.time);
    console.log(processedDayData);

    var visibility = (processedDayData.visibility*0.62137119/1000).toFixed(2);;

    const getVisibilityCategory = (visibility) => {
        if (visibility >= 10) return "Excellent";
        else if (visibility >= 5) return "Good";
        else if (visibility >= 3) return "Moderate";
        else if (visibility >= 1) return "Poor";
        else if (visibility >= 0.5) return "Very poor";
        else return "Low";
    }
    var visibility_string = getVisibilityCategory(visibility)

    var humidity = processedDayData.relativehumidity_2m;

    function getHumidityLevel(humidity) {
        if (humidity <= 30) return "Low";
        else if (humidity <= 60) return "Moderate";
        else if (humidity <= 80) return "High";
        else return "Very high";
    }
    var string_humidity = getHumidityLevel(humidity)
      
    function getAQILevel(aqi) {
        if (aqi <= 50) return "Good";
        else if (aqi <= 100) return "Moderate";
        else if (aqi <= 150) return "Unhealthy for sensitive groups";
        else if (aqi <= 200) return "Unhealthy";
        else if (aqi <= 300) return "Very unhealthy";
        else return "Hazardous";
    }
    var aqi = processedDayData.us_aqi;
    var string_aqi = getAQILevel(aqi)
    
    return <DayWeekContext.Provider value={wData}>
        <Container>
            <Box sx={{textAlign: "left", padding: "2vh 0"}}><b><h4>Todays Highlights</h4></b></Box>
            <Grid2 container spacing={2}>
                <Grid2 xs={6} md={4} sx={{display: "grid", gridTemplateColumns: "repeat(3)"}}>
                    <Card sx={{backgroundColor: 'rgba(255 ,255 ,255 ,0.5)', border: 'none', padding: '1%', borderRadius: '0.5vw',margin: '0 0.5%',color: 'black'}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20, textAlign: 'left' }} color="text.secondary" gutterBottom>
                                UV Index
                            </Typography>
                            <Box>
                                <ProgressBar className="uvBar" strokeWidth={10} trackStrokeWidth={5} strokeColor="#ffce54" rotate={-210} cut={120} steps={12} progress={uvindex>12?12:uvindex} radius={50}>
                                    <div className={styles.indicator}>
                                        {uvindex}
                                    </div>
                                </ProgressBar>
                            </Box>
                            <Typography variant="h5" align="left" color="text.secondary">
                                {uv_string}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs={6} md={4} sx={{display: "grid", gridTemplateColumns: "repeat(3)"}}>
                    <Card sx={{backgroundColor: 'rgba(255 ,255 ,255 ,0.5)', border: 'none', padding: '1%', borderRadius: '0.5vw',margin: '0 0.5%',color: 'black'}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20, textAlign: 'left' }} color="text.secondary" gutterBottom>
                                Wind Status
                            </Typography>
                            <Box  sx={{alignSelf:'center'}}>
                                <ProgressBar className="uvBar2"
                                    radius={60}
                                    progress={currentWeather.winddirection}
                                    strokeWidth={0}
                                    trackStrokeWidth={5}
                                    pointerRadius={8}
                                    pointerStrokeWidth={5}
                                    pointerStrokeColor="indianred">
                                    <div className={styles.indicator}>
                                        <div>{currentWeather.windspeed}mph</div>
                                    </div>
                                </ProgressBar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs={6} md={4} sx={{display: "grid", gridTemplateColumns: "repeat(3)"}}>
                    <Card sx={{backgroundColor: 'rgba(255 ,255 ,255 ,0.5)', border: 'none', padding: '1%', borderRadius: '0.5vw',margin: '0 0.5%',color: 'black'}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20, textAlign: 'left' }} color="text.secondary" gutterBottom>
                                Sunrise & Sunset
                            </Typography>
                            <Grid2 container  sx={{alignSelf:'center'}}>
                                <Grid2 xs={3} sx={{alignSelf:'center', padding: '0px'}}>
                                    <Box className={styles.mainSmallWeatherIcon}>
                                        <i className={`wi wi-sunrise`} />
                                    </Box>
                                </Grid2>
                                <Grid2 xs={9} sx={{alignSelf:'center', padding: '0px'}}>
                                    <Typography variant="h3" align="left" color="text.secondary">
                                        {sunrise}
                                    </Typography>
                                </Grid2>
                                <Grid2 xs={3} sx={{alignSelf:'center', padding: '0px'}}>
                                    <Box className={styles.mainSmallWeatherIcon}>
                                        <i className={`wi wi-sunset`} />
                                    </Box>
                                </Grid2>
                                <Grid2 xs={9} sx={{alignSelf:'center', padding: '0px'}}>
                                    <Typography variant="h3" align="left" color="text.secondary">
                                        {sunset}
                                    </Typography>
                                </Grid2>
                            </Grid2>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs={6} md={4} sx={{display: "grid", gridTemplateColumns: "repeat(3)"}}>
                    <Card sx={{backgroundColor: 'rgba(255 ,255 ,255 ,0.5)', border: 'none', padding: '1%', borderRadius: '0.5vw',margin: '0 0.5%',color: 'black'}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20, textAlign: 'left' }} color="text.secondary" gutterBottom>
                                Humidity
                            </Typography>
                            <Typography variant="h3" color="text.secondary" align="left">
                                {humidity}%
                            </Typography>
                            {humidity<20?
                            <LineProgressBar percent={humidity} rounded={30} progressColor="linear-gradient(to right, limegreen, limegreen)"/>:
                            humidity<50?
                            <LineProgressBar percent={humidity} rounded={30} progressColor="linear-gradient(to right, limegreen, yellow)"/>:
                            humidity<70?
                            <LineProgressBar percent={humidity} rounded={30} progressColor="linear-gradient(to right, yellow, orange)"/>:
                            <LineProgressBar percent={humidity} rounded={30} progressColor="linear-gradient(to right, orange, red)"/>
                            }
                            <Typography variant="h5" align="left" color="text.secondary">
                                {string_humidity}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs={6} md={4} sx={{display: "grid", gridTemplateColumns: "repeat(3)"}}>
                    <Card sx={{backgroundColor: 'rgba(255 ,255 ,255 ,0.5)', border: 'none', padding: '1%', borderRadius: '0.5vw',margin: '0 0.5%',color: 'black'}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20, textAlign: 'left' }} color="text.secondary" gutterBottom>
                                Visibility
                            </Typography>
                            <Typography variant="h3" color="text.secondary" align="left">
                                {visibility} miles
                            </Typography>
                            {visibility>10?
                            <LineProgressBar percent={visibility} rounded={30} progressColor="linear-gradient(to right, limegreen, limegreen)"/>:
                            visibility>5?
                            <LineProgressBar percent={visibility} rounded={30} progressColor="linear-gradient(to right, green, yellow)"/>:
                            visibility>2?
                            <LineProgressBar percent={visibility} rounded={30} progressColor="linear-gradient(to right, yellow, orange)"/>:
                            <LineProgressBar percent={visibility} rounded={30} progressColor="linear-gradient(to right, orange, red)"/>
                            }
                            <Typography variant="h5" align="left" color="text.secondary">
                                {visibility_string}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs={6} md={4} sx={{display: "grid", gridTemplateColumns: "repeat(3)"}}>
                    <Card sx={{backgroundColor: 'rgba(255 ,255 ,255 ,0.5)', border: 'none', padding: '1%', borderRadius: '0.5vw',margin: '0 0.5%',color: 'black'}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20, textAlign: 'left' }} color="text.secondary" gutterBottom>
                                Air Quality
                            </Typography>
                            <Typography variant="h3" color="text.secondary" align="left">
                                {aqi}
                            </Typography>
                            {aqi<50?
                            <LineProgressBar percent={visibility} rounded={30} progressColor="linear-gradient(to right, limegreen, limegreen)"/>:
                            aqi<100?
                            <LineProgressBar percent={visibility} rounded={30} progressColor="linear-gradient(to right, green, yellow)"/>:
                            aqi<200?
                            <LineProgressBar percent={visibility} rounded={30} progressColor="linear-gradient(to right, yellow, orange)"/>:
                            <LineProgressBar percent={visibility} rounded={30} progressColor="linear-gradient(to right, orange, red)"/>
                            }
                            <Typography variant="h5" align="left" color="text.secondary">
                                {string_aqi}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </Container>
    </DayWeekContext.Provider>
}
export default HighlightsComponent;