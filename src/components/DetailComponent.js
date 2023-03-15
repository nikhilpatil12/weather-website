import { useState } from 'react';
import styles from '../style.module.css';
import MenuBar from './MenuBar';
import WeatherDetails from './WeatherDetails';
import HighlightsComponent from './HighlightsComponent';
import { DayWeekContext } from '../contexts/DayWeekContext';

const DetailComponent = () => {
    // setWeatherData(props.value);
    const [weekEnabled, setWeekEnabled] = useState(false)
    const wData = { weekEnabled, setWeekEnabled };
    return <DayWeekContext.Provider value={wData}>
        <div className={styles.detail_component}>
            <MenuBar></MenuBar>
            <WeatherDetails></WeatherDetails>
            <HighlightsComponent></HighlightsComponent>
        </div>
    </DayWeekContext.Provider>
}
export default DetailComponent;