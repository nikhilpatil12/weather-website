import React, { useContext, useEffect } from "react";
import { WeatherDataContext } from "../contexts/WeatherDataContext";

const WeatherDetails = () => {
    const wData = useContext(WeatherDataContext);
    console.log(wData)
    // const [weatherData, setWeatherData] = useState();
    // const prepareDailyWeatherObject = (data) => {
    //     console.log(data)
    //     let weekweatherdata = [];

    // }
    // prepareDailyWeatherObject(props);
    // useEffect(() => {
    //     // const wData = useContext(WeatherDataContext);
    //     console.log(wData);
    // },[wData]);
    // function getWeatherType (weathercode){}
    //         switch (weathercode) {
    //             case 0:
    //                 return 'Clear sky';
    //                 break;
    //             case 1:
    //                 return 'Mainly clear';
    //                 break;
    //             case 2:
    //                 return 'partly cloudy';
    //                 break;
    //             case 3:
    //                 return 'Overcast';
    //                 break;
    //             case 45:
    //                 return 'Fog';
    //                 break;
    //             case 48:
    //                 return 'Depositing rime fog';
    //                 break;
    //             case 51:
    //                 return 'Drizzle: Light';
    //                 break;
    //             case 53:
    //                 return 'Drizzle: Moderate';
    //                 break;
    //             case 55:
    //                 return 'Drizzle: Dense intensity';
    //                 break;
    //             case 56:
    //                 return 'Freezing Drizzle: Light intensity';
    //                 break;
    //             case 57:
    //                 return 'Freezing Drizzle: Dense intensity';
    //                 break;
    //             case 61:
    //                 return 'Rain: Slight intensity';
    //                 break;
    //             case 63:
    //                 return 'Rain: Moderate intensity';
    //                 break;
    //             case 65:
    //                 return 'Rain: Heavy intensity';
    //                 break;
    //             case 66:
    //                 return 'Freezing Rain: Light intensity';
    //                 break;
    //             case 67:
    //                 return 'Freezing Rain: Heavy intensity';
    //                 break;
    //             case 71:
    //                 return 'Snow fall: Slight intensity';
    //                 break;
    //             case 73:
    //                 return 'Snow fall: Moderate intensity';
    //                 break;
    //             case 75:
    //                 return 'Snow fall: Heavy intensity';
    //                 break;
    //             case 77:
    //                 return 'Snow grains';
    //                 break;
    //             case 80:
    //                 return 'Rain showers: Slight';
    //                 break;
    //             case 81:
    //                 return 'Rain showers: Moderate';
    //                 break;
    //             case 82:
    //                 return 'Rain showers: Violent';
    //                 break;
    //             case 85:
    //                 return 'Snow showers slight';
    //                 break;
    //             case 86:
    //                 return 'Snow showers heavy';
    //                 break;
    //             case 95:
    //                 return 'Thunderstorm: Slight';
    //                 break;
    //             case 96:
    //                 return 'Thunderstorm with slight hail';
    //                 break;
    //             case 99:
    //                 return 'Thunderstorm with heavy hail';
    //                 break;
    //             default:
    //                 return 'Invalid code';
    //         }
    //     }

    return <div>
        <div>{JSON.stringify(wData)}</div>;
        {/* <WeatherDataContext.Consumer>
            {({weatherData, setWeatherData}) => (
                <button
                onClick={setWeatherData}>
                {weatherData}
                </button>
            )}
        </WeatherDataContext.Consumer> */}
        {/* {JSON.stringify(weatherData)} */}
        <div>
            {/* <ul>
                {props.daily.map(dailyweather => (
                <li key={dailyweather.id}>
                    <div onClick={event => selectLocation(event, suggestion.latitude, suggestion.longitude, suggestion.name, suggestion.admin1, suggestion.country_code)}>
                        {suggestion.name}, {suggestion.admin1}, {suggestion.country_code}, <img width='20px' src={`http://www.geonames.org/flags/x/${suggestion.country_code.toLowerCase()}.gif`}/>
                    </div>
                </li>
                ))}
            </ul> */}
        </div>
    </div>
}

export default WeatherDetails;