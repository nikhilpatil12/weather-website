import React, { createContext } from "react";

const WeatherDataContext = createContext({
    weatherData: [],
    setWeatherData:() => {}
});

export {WeatherDataContext};