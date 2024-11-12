import styles from './NavBar.module.css';
import Link from 'next/link';

//button for the logo, when we get the image working we can switch back to the logo as button
//<button> <img src="../images/SailboatIcon.png" alt="sailboat Logo"/></button>

export default function NavBar() {
return (
    <nav className={styles.navBar}>
        <div className={styles.logo}>
            <Link href='/'>Sailboat</Link>
        </div>
        <div className={styles.endStuff}>
            <p className={styles.username}>Hello, ???</p>
            <button className={styles.button}><Link href='/loginpage'>Log In</Link></button>
            <button className={styles.button}><Link href='/signuppage'>Sign Up</Link></button>
        </div>
    </nav>
)
}