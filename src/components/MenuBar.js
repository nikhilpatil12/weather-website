import styles from '../style.module.css';
import React, { useState } from "react";

const MenuBar = () => {
    const [enabled, setEnabled] = useState(false)

    return <div className={styles.menubar}>
        <button type='button' className={styles.menutab}>Today</button>
        <button type='button' className={styles.menutab}>Week</button>  
        <div className={styles.spacer_div}></div>
        <button type='button' className={styles.temperature_button}>ºF</button>
        <button type='button' className={styles.temperature_button}>ºC</button>  
    </div>
}

export default MenuBar;