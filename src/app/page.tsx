"use client";


import Header from './frontend/components/header';
import Movies from './frontend/components/movies';
import { useState } from 'react';
import './page.css';
import NavBar from './frontend/components/NavBar';
import Splash from './frontend/components/Splash';
import SearchBar from './frontend/components/SearchBar';
import MovieList from './frontend/components/MovieList';
import Footer from './frontend/components/Footer';


type movie = {
      id: number;
      genre: string;
      title: string;
      synopsis: string;
      imageUrl: string;
      platform: string;

  };



const MOVIES_INIT:movie[] = [
  {
    id: 1,
    genre: 'action',
    title: 'Indiana Jones and the Temple of Doom',
    synopsis: 'In 1935, American archeologist Indiana Jones survives a murder attempt from Shanghai crime boss Lao Che, who hired him to retrieve the remains of Nurhaci. Indy flees from the city accompanied by his young orphan sidekick Short Round and nightclub singer Willie Scott, unaware that the plane they are traveling on is owned by Che....',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/10/Indiana_Jones_and_the_Temple_of_Doom_PosterB.jpg',
    platform:'Netflix',

    
  },



];





export default function Home() {
  const [moviesArray,setMoviesArray] = useState<movie[]>(MOVIES_INIT)
  const addMovieHandler = (update:movie) =>{
    console.log('At top component');
    console.log(update);
    setMoviesArray((prevMovies) => [
    ...prevMovies,
    {
      ...update,
    },




    ]);
    


  }

  //ok don't hate me but I redid the unauthenticated view to make it look closer to what's on Figma
  //all the original files are still in the ./frontend/ folder so we can have those in the authenticated view
  //  <Movies movies = {MOVIES_INIT} />
  return (
    <div className="container">
       
       <div style={{ height: '100%', width: '100%', overflow: 'scroll' }}>
       <NavBar />
        <Splash />
        <SearchBar />
        <MovieList />
        <Footer />
       </div>
      
    </div>
  );
}