import styles from './LogInAndSignUp.module.css';

export default function SignUp() {
    return (
        <div className={styles.LogSignBackground}>
        <main>
            <div className={styles.masthead}>
                <h1 className={styles.headOne}> Sign Up: </h1>
                <form className={styles.signUpForm}>
                    <label>Username:</label>
                    <input id="name" type="text" placeholder="Enter your username"/>
                    <label>Email:</label>
                    <input id="email" type="email" placeholder="Enter your E-Mail"/>
                    <label>Password:</label>
                    <input id="password" type="password" placeholder="Enter your password"/>
                    <label>Verify Password:</label>
                    <input id="verifypassword" type="password" placeholder="Repeat your password, please"/>
                    <button type="submit">Sign Up!</button>
                </form>
            </div>
        </main>
      </div>
    )
}