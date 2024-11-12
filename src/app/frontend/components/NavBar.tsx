import styles from './NavBar.module.css';

export default function NavBar() {
return (
    <nav className={styles.navBar}>
        <div className={styles.logo}>
            <button> <img src="../images/SailboatIcon.png" alt="sailboat Logo"/></button>
        </div>
        <div className={styles.endStuff}>
            <p className={styles.username}>Hello, ???</p>
            <button className={styles.button}>Log in</button>
            <button className={styles.button}>Sign up</button>
        </div>
    </nav>
)
}