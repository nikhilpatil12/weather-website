import styles from '../style.module.css';
import React, { useState, useContext } from "react";
import classNames from 'classnames';
import { DayWeekContext } from '../contexts/DayWeekContext';

const MenuBar = () => {
    const wData = useContext(DayWeekContext);
    const toggleDayWeek = () => {
        wData.setWeekEnabled(!wData.weekEnabled)
    }
    return <div className={styles.menubar}>
        <button type='button' className={classNames(styles.menutab, !wData.weekEnabled && styles.activeTab)} onClick={toggleDayWeek}>Today</button>
        <button type='button' className={classNames(styles.menutab, wData.weekEnabled && styles.activeTab)} onClick={toggleDayWeek}>Week</button>  
        <div className={styles.spacer_div}></div>
        <button type='button' className={`rounded-circle ${styles.temperature_button}`}>ºF</button>
        <button type='button' className={`rounded-circle ${styles.temperature_button}`}>ºC</button>  
    </div>

}

export default MenuBar;