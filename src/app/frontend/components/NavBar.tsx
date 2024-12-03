'use client'

import styles from './NavBar.module.css'
import Link from 'next/link'
import sailboatIcon from "../images/SailboatIcon.png"
import { useSession, signOut } from 'next-auth/react'

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className={styles.navBar}>
      <div className={styles.logo}>
        <Link href='/'>
          <img src={sailboatIcon.src} alt="Sailboat Logo"/>
        </Link>
      </div>
      <div className={styles.endStuff}>
        {session ? (
          <>
            <p className={styles.username}>Hello, {session.user?.username}</p>
            <button 
              className={styles.button} 
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <button className={styles.button}>
              <Link href='/loginpage'>Log In</Link>
            </button>
            <button className={styles.button}>
              <Link href='/signuppage'>Sign Up</Link>
            </button>
          </>
        )}
      </div>
    </nav>
  )
}