import {useContext, useState} from "react";
import styles from '../style.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WeatherDataContext } from "../contexts/WeatherDataContext";
import { UnitContext } from "../contexts/UnitContext";

const Search = (props) => {
    const { setWeatherData } = useContext(WeatherDataContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [userLocation, setUserLocation] = useState({});
    const { unit } = useContext(UnitContext);

    async function getUserLocation (){
        if (navigator.geolocation) {
          await navigator.geolocation.getCurrentPosition(async (position) => {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            console.log(position)
            console.log(userLocation)

            if(userLocation.latitude && userLocation.longitude){
                await fetch('https://api.opencagedata.com/geocode/v1/json?q='+userLocation.latitude+','+userLocation.longitude+'&key=e86896f3a76a4b68b2c5af02ecd54e87&language=en&pretty=1')
                      .then(response => response.json())
                      .then(lData => {
                        console.log(lData)
                        selectLocation(null, userLocation.latitude, userLocation.longitude, lData.results[0].components.city, lData.results[0].components.state, lData.results[0].components.country_code.toUpperCase())
                });

            }

          });
        }
    }

    async function searchLocation(event) {
        setSearchTerm(event.target.value);
        await fetch('https://geocoding-api.open-meteo.com/v1/search?name='+event.target.value)
        .then(response=>response.json())
        .then(searchResults=>{
            console.log(searchResults.results);
            setSearchSuggestions(searchResults.results);
        })
        // console.log(event.target.value)
    }
    async function selectLocation(event, latitude, longitude, locationName, locationState, locationCountry) {
        var weatherdata = {};
        var aqidata = {};
        console.log(latitude)
        console.log(longitude)
        var api_url

        if(unit === 'fahrenheit')
          api_url = 'https://api.open-meteo.com/v1/forecast?latitude='+latitude+'&longitude='+longitude+'&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,precipitation_probability,apparent_temperature,precipitation,rain,showers,snowfall,snow_depth,weathercode,cloudcover,visibility,windspeed_10m&daily=uv_index_max,uv_index_clear_sky_max,weathercode,precipitation_probability_max,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,windspeed_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto'
        else
          api_url = 'https://api.open-meteo.com/v1/forecast?latitude='+latitude+'&longitude='+longitude+'&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,precipitation_probability,apparent_temperature,precipitation,rain,showers,snowfall,snow_depth,weathercode,cloudcover,visibility,windspeed_10m&daily=uv_index_max,uv_index_clear_sky_max,weathercode,precipitation_probability_max,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,windspeed_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&current_weather=true&windspeed_unit=mph&precipitation_unit=inch&timezone=auto'
         
        await fetch(api_url)
                .then(response => response.json())
                .then(wData => {
                    weatherdata=wData;
        });

        await fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude='+latitude+'&longitude='+longitude+'&hourly=pm10,pm2_5,us_aqi,us_aqi_pm2_5,us_aqi_pm10')
                .then(response => response.json())
                .then(wData => {
                    aqidata=wData;
        });


        weatherdata.locationName = locationName;
        weatherdata.locationState = locationState;
        weatherdata.locationCountry = locationCountry
        weatherdata.aqi = aqidata;
        // setWeatherData(weatherdata);
        setSearchSuggestions();
        setSearchTerm('');
        // props.onChange(weatherdata);
        setWeatherData(weatherdata);
        // var lData = {};
        // weatherdata.locationName = locationName;
        // lData.admin1 = locationState;
        // lData.country = locationCountry;
        // setLocationData(locationData);
        console.log(weatherdata)
    }

    return (
        <div value={props.value} style={{position: 'relative'}}>
            <div className={styles.searchbar} style={{display: 'flex', alignItems: 'center'}}>
                <button className={styles.location_button}>
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size="xl" color='#aaa' />
                </button>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={event => searchLocation(event)}
                    className={styles.searchbarinput}
                />
                <button onClick={getUserLocation} className={styles.location_button}>
                    <FontAwesomeIcon icon={['fa-solid', 'location-dot']} size="xl" color='#aaa' />
                </button>
            </div>
            {searchSuggestions && searchSuggestions.length > 0 && (
            <ul className={styles.search_results}>
                {searchSuggestions.map(suggestion => (
                    suggestion.country_code && (
                    <li key={suggestion.id}>
                        <div onClick={event => selectLocation(event, suggestion.latitude, suggestion.longitude, suggestion.name, suggestion.admin1, suggestion.country_code)}>
                            {suggestion.name}, {(suggestion.admin1 && (suggestion.admin1+','))} {suggestion.country_code}  <img width='20px' alt='country flag' src={`http://www.geonames.org/flags/x/${suggestion.country_code.toLowerCase()}.gif`}/>
                        </div>
                    </li>
                    )
                ))}
            </ul>
            )}
        </div>
        // <div>
        //     <input onChange={searchLocation} type="text"></input>
        // </div>
    )
}

export default Search