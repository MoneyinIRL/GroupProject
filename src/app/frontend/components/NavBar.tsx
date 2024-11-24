import styles from './NavBar.module.css';
import Link from 'next/link';
import sailboatIcon from "../images/SailboatIcon.png";

export default function NavBar() {
return (
    <nav className={styles.navBar}>
        <div className={styles.logo}>
        <button><Link href='/'><img src={sailboatIcon.src} alt="sailboat Logo"/></Link></button>
        </div>
        <div className={styles.endStuff}>
            <p className={styles.username}>Hello, ???</p>
            <button className={styles.button}><Link href='/loginpage'>Log In</Link></button>
            <button className={styles.button}><Link href='/signuppage'>Sign Up</Link></button>
        </div>
    </nav>
)
}