import React, { useState, useContext } from "react";
import { WeatherDataContext } from "../contexts/WeatherDataContext";
import { DayWeekContext } from "../contexts/DayWeekContext";
import styles from '../style.module.css';
import '../css/weather-icons.min.css';
import { Container, Card, Grid, Paper, Box, Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ProgressBar from 'react-customizable-progressbar'
import '../css/CustomMuiComponents.css'

const HighlightsComponent = () => {
    // setWeatherData(props.value);
    const [weekEnabled, setWeekEnabled] = useState(false)
    const { weatherData, setWeatherData} = useContext(WeatherDataContext);
    var daydata = weatherData.hourly;
    var weekData = weatherData.daily;
    var currentWeather = weatherData.current_weather;
    const wData = { weekEnabled, setWeekEnabled };
    var uvindex = weekData.uv_index_max[0];
    const card = (
        <React.Fragment>
        </React.Fragment>
    );
    return <DayWeekContext.Provider value={wData}>
        <Container>
            <Box sx={{textAlign: "left", padding: "2vh 0"}}><b><h4>Todays Highlights</h4></b></Box>
            <Grid2 container spacing={2}>
                <Grid2 xs={6} md={4}>
                    <Card sx={{backgroundColor: 'rgba(255 ,255 ,255 ,0.5)', border: 'none', padding: '1%', borderRadius: '0.5vw',margin: '0 0.5%',color: 'black'}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20, textAlign: 'left' }} color="text.secondary" gutterBottom>
                                UV Index
                            </Typography>
                            <Box>
                                <ProgressBar className="uvBar" strokeWidth={28} strokeColor="#ffce54" rotate={-210} cut={120} steps={12} progress={uvindex>12?12:uvindex} radius={50}>
                                    <div className={styles.indicator}>
                                        {uvindex}
                                    </div>
                                </ProgressBar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs={6} md={4}>
                    <Card sx={{backgroundColor: 'rgba(255 ,255 ,255 ,0.5)', border: 'none', padding: '1%', borderRadius: '0.5vw',margin: '0 0.5%',color: 'black'}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20, textAlign: 'left' }} color="text.secondary" gutterBottom>
                                Wind Status
                            </Typography>
                            <Box>
                                <ProgressBar
                                    radius={50}
                                    progress={currentWeather.winddirection}
                                    strokeWidth={0}
                                    trackStrokeWidth={4}
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
                <Grid2 xs={6} md={4}>
                    <Card sx={{backgroundColor: 'rgba(255 ,255 ,255 ,0.5)', border: 'none', padding: '1%', borderRadius: '0.5vw',margin: '0 0.5%',color: 'black'}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20, textAlign: 'left' }} color="text.secondary" gutterBottom>
                                UV Index
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                adjective
                            </Typography>
                            <Typography variant="h5" component="div">
                                benevolent
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs={6} md={4}>
                    <Card sx={{backgroundColor: 'rgba(255 ,255 ,255 ,0.5)', border: 'none', padding: '1%', borderRadius: '0.5vw',margin: '0 0.5%',color: 'black'}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20, textAlign: 'left' }} color="text.secondary" gutterBottom>
                                UV Index
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                adjective
                            </Typography>
                            <Typography variant="h5" component="div">
                                benevolent
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs={6} md={4}>
                    <Card sx={{backgroundColor: 'rgba(255 ,255 ,255 ,0.5)', border: 'none', padding: '1%', borderRadius: '0.5vw',margin: '0 0.5%',color: 'black'}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20, textAlign: 'left' }} color="text.secondary" gutterBottom>
                                UV Index
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                adjective
                            </Typography>
                            <Typography variant="h5" component="div">
                                benevolent
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs={6} md={4}>
                    <Card sx={{backgroundColor: 'rgba(255 ,255 ,255 ,0.5)', border: 'none', padding: '1%', borderRadius: '0.5vw',margin: '0 0.5%',color: 'black'}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20, textAlign: 'left' }} color="text.secondary" gutterBottom>
                                UV Index
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                adjective
                            </Typography>
                            <Typography variant="h5" component="div">
                                benevolent
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </Container>
    </DayWeekContext.Provider>
}
export default HighlightsComponent;