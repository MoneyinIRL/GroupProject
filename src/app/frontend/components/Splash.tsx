import styles from './Splash.module.css';

export default function Splash() {
    return (
        <div className={styles.Splash}>
        <main>
            <div className={styles.masthead}>
                <h1 className={styles.headOne}> Welcome! </h1>
                <h2 className={styles.headTwo}> Where will Sailboat take you today?</h2>
            </div>
        </main>
      </div>
    )
}