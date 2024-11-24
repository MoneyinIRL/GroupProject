import styles from './LogInAndSignUp.module.css';
import { ChangeEvent, useState, FormEvent} from 'react';
import { doCredentialLogin } from '@/libs/credential';

export default function LogIn() {
    const [enteredUsername,setenteredUsername] = useState<string>('')
    const [enteredPassword,setenteredPassword] = useState<string>('')
    const [isLoggedin,setisLoggedin] = useState<boolean>(false)
    const usernameChangeHandler = (event: ChangeEvent<HTMLInputElement> ) => {
        setenteredUsername(event.target.value)
    }
    const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setenteredPassword(event.target.value)
    }

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('username', enteredUsername);
        formData.append('password', enteredPassword);
        
        try {
            const response = await doCredentialLogin(formData);
            console.log(response);
            if (response.error === 'CredentialsSignin') {
                setisLoggedin(false);
                alert("Invalid credentials, please try again.");
            } else if (response.ok) {
                alert("Login successful!");
                setisLoggedin(true);
            } else {
                setisLoggedin(false);
                alert("Login failed, please try again.");
        } 
    }catch (error) {
            console.error('Login failed:', error);
        }
        

    }
    return (
        <div className={styles.LogSignBackground}>
        <main>
            <div className={styles.masthead}>
                <h1 className={styles.headOne}> Log In: </h1>
                <form className={styles.logInForm} onSubmit = {submitHandler}>
                    <label>Username:</label>
                    <input id="name" type="text" placeholder="Enter your username" onChange = {usernameChangeHandler} value={enteredUsername}/>
                    <label>Password:</label>
                    <input id="password" type="password" placeholder="Enter your password" onChange = {passwordChangeHandler} value={enteredPassword}/>
                    <button type="submit">Log In!</button>
                </form>
            </div>
        </main>
      </div>
    )
}