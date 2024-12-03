'use client'

import styles from './LogInAndSignUp.module.css'
import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Card from './card'

export default function LogIn() {
    const router = useRouter()
    const [error, setError] = useState<string>('')
    const [enteredUsername, setEnteredUsername] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault()
        setError('')
        
        try {
            const response = await signIn('credentials', {
                username: enteredUsername,
                password: enteredPassword,
                redirect: false
            })

            console.log('Auth Response:', response) 

            if (!response) {
                throw new Error('No response from auth service')
            }

            if (response.error) {
                if (response.error === "CredentialsSignin") {
                    setError("Incorrect username or password")
                } else {
                    setError(response.error)
                }
                return
            }

            if (response.ok) {
                await router.push('/')
                router.refresh()
            }

        } catch (error) {
            console.error('Login error:', error)
            setError(error instanceof Error ? error.message : 'Authentication failed')
        }
    }

    return (
        <div className={styles.LogSignBackground}>
            <Card className={styles.loginCard}>
                <h1 className={styles.headTitle}>Log In to Sailboat</h1>
                <form className={styles.inputForm} onSubmit={submitHandler}>
                    {error && <div className={styles.error}>{error}</div>}
                    <div className={styles.signUpBox}>
                        <label className={styles.subTitle}>Username</label>
                        <input 
                            className={styles.input} 
                            id="name" 
                            type="text"
                            required
                            placeholder="Enter your username" 
                            onChange={(e) => setEnteredUsername(e.target.value)} 
                            value={enteredUsername} 
                        />
                    </div>
                    <div className={styles.signUpBox}>
                        <label className={styles.subTitle}>Password</label>
                        <input 
                            className={styles.input} 
                            id="password" 
                            type="password"
                            required
                            placeholder="Enter your password" 
                            onChange={(e) => setEnteredPassword(e.target.value)} 
                            value={enteredPassword} 
                        />
                    </div>
                    <button className={styles.submitButton} type="submit">Log In</button>
                </form>
            </Card>
        </div>
    )
}