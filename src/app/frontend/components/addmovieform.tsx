import { ChangeEvent, useState, FormEvent} from 'react';
import { movie } from "./types";
import Card from './card';
import styles from './addmovieform.module.css'
import Button from './button';
interface FormProps {

  onSaveSignupData: (enteredSignupData: movie) => void;

}
export const SubmitForm: React.FC<FormProps> = ({onSaveSignupData}) =>{
    const [enteredGenre,setEnteredGenre] = useState<string>(' ')
    const [enteredTitle,setEnteredTitle] = useState<string>(' ')
    const [enteredSynopsis,setEnteredSynopsis] = useState<string>(' ')
    const [enteredImageUrl,setEnteredImageUrl] = useState<string>(' ')
    const [enteredPlatform,setEnteredPlatform] = useState<string>(' ')
    const [id,setId] = useState<number>(2)



  
    const genreChangeHandler = (event: ChangeEvent<HTMLInputElement> ) => {
        setEnteredGenre(event.target.value)
    }
    const titleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEnteredTitle(event.target.value)
    }
    
    const synopsisChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEnteredSynopsis(event.target.value)
    }
    const imageUrlChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEnteredImageUrl(event.target.value)
    }
    const platformChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEnteredPlatform(event.target.value)
    }

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        setId((id)=> id+1)
        const movieUpdate = {
        id:id,
        genre:enteredGenre,
        title:enteredTitle,
        synopsis:enteredSynopsis,
        imageUrl:enteredImageUrl,
        platform:enteredPlatform




        };
        console.log(movieUpdate)
        onSaveSignupData(movieUpdate)
        setEnteredGenre('')
        setEnteredImageUrl('')
        setEnteredPlatform(' ')
        setEnteredSynopsis(' ')
        setEnteredTitle(' ')
        


    };






    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-3">
     <Card className={`${styles.input} w-full max-w-lg p-3 bg-white shadow-md rounded-md`}>
       <h1 className="text-4xl font-bold mb-6 text-center">Signup</h1>
        <form onSubmit={submitHandler}>
         <label htmlFor="genre">Genre</label>
          <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
            id="genre"
            type="text"
            value={enteredGenre}
            onChange={genreChangeHandler}  
            placeholder="Enter Genre"
          />
          <label htmlFor="title">Title</label>
          <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
            id="title"
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
            placeholder="Enter Title"
            required
          />
          <label htmlFor="synopsis">Synopsis</label>
          <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
            id="synopsis"
            type="text"
            value={enteredSynopsis}
            onChange={synopsisChangeHandler}
            placeholder="Enter synopsis"
          />
          <label htmlFor="imageUrl">ImageUrl</label>
          <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
            id="imageUrl"
            type="url"
            value={enteredImageUrl}
            onChange={imageUrlChangeHandler}
            placeholder="Enter image url"
            required
          />
          <label htmlFor="platform">Platform</label>
          <input className="border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
            id="platform"
            type="string"
            value={enteredPlatform}
            onChange={platformChangeHandler}
            placeholder="Enter platform"
          />
  
          <Button type="submit" className="button">Sign Up</Button>
        </form>
      </Card>
      </div>

    )
}
