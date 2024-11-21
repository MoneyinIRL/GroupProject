import styles from './LogInAndSignUp.module.css';
import { ChangeEvent, useState, FormEvent} from 'react';




export default function SignUp() {
    const [enteredUsername,setEnteredUsername] = useState<string>(' ');
    const [enteredPassword,setEnteredPassword] = useState<string>(' ');
    const [enteredEmail,setEnteredEmail] = useState<string>(' ');

    const usernameChangeHandler = (event: ChangeEvent<HTMLInputElement> ) => {
        setEnteredUsername(event.target.value)
    }
    const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEnteredPassword(event.target.value)
    }
    
    const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEnteredEmail(event.target.value)
    }

    const  submitHandler = async (event: FormEvent) => {
        event.preventDefault();
        const userUpdate = {
            username:enteredUsername,
            password:enteredPassword,
            email:enteredEmail
        };
        console.log(userUpdate)
        try {
            const response = await fetch('/api/items',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userUpdate)
            });
            if (!response.ok) {
                throw new Error('Failed to update user data');
            }
            const data = await response.json();
            console.log('User save successfully!',data);
            

        }
        catch(error){
            console.error("User could not be saved.",error);
        }
        

        setEnteredUsername(' ')
        setEnteredPassword(' ')
        setEnteredEmail(' ')
        

    }


    return (
        <div className={styles.LogSignBackground}>
        <main>
            <div className={styles.masthead}>
                <h1 className={styles.headOne}> Sign Up: </h1>
                <form className={styles.signUpForm} onSubmit = {submitHandler}>
                    <label>Username:</label>
                    <input 
                    id="name" 
                    type="text" 
                    placeholder="Enter your username"
                    value = {enteredUsername}
                    onChange = {usernameChangeHandler}
                    
                    />
                    <label>Email:</label>
                    <input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your E-Mail"
                    value = {enteredEmail}
                    onChange = {emailChangeHandler}
                    />
                    <label>Password:</label>
                    <input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password"
                    value = {enteredPassword}
                    onChange = {passwordChangeHandler}
                    
                    />
                    <label>Verify Password:</label>
                    <input id="verifypassword" type="password" placeholder="Repeat your password, please"/>
                    <button type="submit">Sign Up!</button>
                </form>
            </div>
        </main>
      </div>
    )
}