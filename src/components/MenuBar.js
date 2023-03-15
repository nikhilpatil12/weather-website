import styles from '../style.module.css';
import React, { useState, useContext } from "react";
import { DayWeekContext } from '../contexts/DayWeekContext';
import { Chip } from '@mui/material';
import {ToggleButton} from '@mui/material';
import {ToggleButtonGroup} from '@mui/material';
import { UnitContext } from '../contexts/UnitContext';

const MenuBar = () => {
    const wData = useContext(DayWeekContext);
    const {unit, setUnit }= useContext(UnitContext)
    const [varient1, setVarient1] = useState("filled");
    const [varient2, setVarient2] = useState("outlined");
    // var varient1 = "outlined";
    // var varient2 = "filled";
    const toggleDayWeek = () => {
        wData.setWeekEnabled(!wData.weekEnabled)
        setVarient1(varient1 === "outlined" ? "filled" :"outlined");
        setVarient2( varient2 === "outlined" ? "filled" :"outlined");
    }
    const toggleUnit = () => {
        setUnit(unit === "fahrenheit" ? "celcius" :"fahrenheit")
    }
    return <div className={styles.menubar}>
        <Chip label="Today" size="medium" variant={varient1} color="primary" onClick={toggleDayWeek}></Chip>
        <div className={styles.spacer_div_single}></div>
        <Chip label="Week" size="medium" variant={varient2} color="primary" onClick={toggleDayWeek}></Chip>
        <div className={styles.spacer_div}></div>
        {/* //TODO: Change the unit */}
        {/* <Chip label="ºF" size="medium" variant={varient1} onClick={toggleUnit}></Chip>
           
        <Chip label="ºC" size="medium" variant={varient2} onClick={toggleUnit}></Chip> */}
        <ToggleButtonGroup variant="filled" size="small" color="primary" value={unit} exclusive onChange={toggleUnit}  aria-label="Platform" >
            <ToggleButton className={styles.roundedtoggleleft} value="fahrenheit">ºF</ToggleButton>
            <ToggleButton className={styles.roundedtoggleright} value="celcius">ºC</ToggleButton>
        </ToggleButtonGroup>
        {/* <button type='button' className={`rounded-circle ${styles.temperature_button}`}>ºF</button>
        <button type='button' className={`rounded-circle ${styles.temperature_button}`}>ºC</button>   */}
    </div>

}

export default MenuBar;