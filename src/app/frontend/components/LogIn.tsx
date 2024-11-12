import styles from './LogInAndSignUp.module.css';

export default function LogIn() {
    return (
        <div className={styles.LogSignBackground}>
        <main>
            <div className={styles.masthead}>
                <h1 className={styles.headOne}> Log In: </h1>
                <form className={styles.logInForm}>
                    <label>Username:</label>
                    <input id="name" type="text" placeholder="Enter your username"/>
                    <label>Password:</label>
                    <input id="password" type="password" placeholder="Enter your password"/>
                    <button type="submit">Log In!</button>
                </form>
            </div>
        </main>
      </div>
    )
}