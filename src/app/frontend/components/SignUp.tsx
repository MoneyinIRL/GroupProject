import Card from './card';
import styles from './LogInAndSignUp.module.css';
import { ChangeEvent, useState, FormEvent} from 'react';




export default function SignUp() {
    const [enteredUsername,setEnteredUsername] = useState<string>('');
    const [enteredPassword,setEnteredPassword] = useState<string>('');
    const [enteredEmail,setEnteredEmail] = useState<string>('');
    const [enteredVerifiedPassword,setEnteredVerifiedPassword] = useState<string>('');
    const [verifyPassword,setverifyPassword] = useState<boolean>(true);

    const usernameChangeHandler = (event: ChangeEvent<HTMLInputElement> ) => {
        setEnteredUsername(event.target.value)
    }
    const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEnteredPassword(event.target.value)
    }
    
    const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEnteredEmail(event.target.value)
    }

    const verifiedPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEnteredVerifiedPassword(event.target.value)
    }

    const  submitHandler = async (event: FormEvent) => {
        event.preventDefault();
        if (enteredPassword!=enteredVerifiedPassword){
            setverifyPassword(false);
            return false;
        }
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
        
        setverifyPassword(true)
        setEnteredUsername('')
        setEnteredPassword('')
        setEnteredEmail('')
        setEnteredVerifiedPassword('')
        

    }


    return (
        <div className={styles.LogSignBackground}>
        <Card className={styles.signUpCard}>
        <main>
            
                <h1 className={styles.signUpTitle}> Sign Up </h1>
                <form className={styles.signUpForm} onSubmit = {submitHandler}>
                    <div className={styles.signUpBox}>
                    <label className={styles.signUpSubTitle}>Username</label>
                    <input 
                    id="name" 
                    type="text" 
                    
                    value = {enteredUsername}
                    onChange = {usernameChangeHandler}
                    className={styles.input}
                    />
                    </div>
                    <div className = {styles.signUpBox}>
                    <label className={styles.signUpSubTitle}>Email</label>
                    <input 
                    id="email" 
                    type="email" 
                   
                    value = {enteredEmail}
                    onChange = {emailChangeHandler}
                    className = {styles.input}
                    />
                    </div>
                    <div className = {styles.signUpBox}>
                    <label className={styles.signUpSubTitle}>Password</label>
                    <input 
                    id="password" 
                    type="password" 
                    
                    value = {enteredPassword}
                    onChange = {passwordChangeHandler}
                    className = {styles.input}
                    
                    />
                    </div>
                    <div className = {styles.signUpBox}>
                    <label className={styles.signUpSubTitle}>Verify Password</label>
                    <input 
                    id="verifypassword" 
                    type="password" 
                    value =  {enteredVerifiedPassword}
                    className = {styles.input}
                    onChange = {verifiedPasswordChangeHandler}
                    />
                    </div>
                    <div className = {styles.register}>
                    
                    <button type="submit" className={styles.submitButton}>Register</button>
                    
                    </div>
                </form>
            
        </main>
        </Card>
      </div>
    )
}