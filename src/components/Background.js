import MainComponent from "./MainComponent";
import styles from '../style.module.css';
import '../css/CustomMuiComponents.css'
const Background = () => {
    return(
        <div className={styles.background}>
            <MainComponent></MainComponent>
        </div>
    )
}

export default Background;