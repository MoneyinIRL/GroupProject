import {ReactNode} from 'react';
import './button.css'



type ButtonProps = {
    type?: "button" | "submit" | "reset"
    onClick?: () => void;
    children:ReactNode;
    className?:string;
    

}

const Button = (props:ButtonProps) =>  {
    return(
        <button className = {props.className}
            type={props.type}
            onClick={props.onClick}
            



        >
        {props.children}
        </button>


    )


}

export default Button;