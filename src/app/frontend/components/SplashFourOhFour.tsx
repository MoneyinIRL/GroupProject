import styles from './Splash.module.css';

export default function SplashFourOhFour() {
    return (
        <div className={styles.Splash}>
        <main>
            <div className={styles.masthead}>
                <h1 className={styles.headOne}> Error: 404! </h1>
                <h2 className={styles.headTwo}> Looks like your sailboat sunk...</h2>
            </div>
        </main>
      </div>
    )
}