"use client";

import Header from './frontend/components/header';
import { useState } from 'react';
import './page.css';
import NavBar from './frontend/components/NavBar';
import Splash from './frontend/components/Splash';
import SearchBar from './frontend/components/SearchBar';
import MovieList from './frontend/components/MovieList';
import Footer from './frontend/components/Footer';
import axios from 'axios';

type movie = {
    id: number;
    genre: string;
    title: string;
    synopsis: string;
    imageUrl: string;
    platform: string;
};

const MOVIES_INIT: movie[] = [
    {
        id: 1,
        genre: 'action',
        title: 'Indiana Jones and the Temple of Doom',
        synopsis: 'In 1935, American archeologist Indiana Jones survives a murder attempt from Shanghai crime boss Lao Che, who hired him to retrieve the remains of Nurhaci. Indy flees from the city accompanied by his young orphan sidekick Short Round and nightclub singer Willie Scott, unaware that the plane they are traveling on is owned by Che....',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/10/Indiana_Jones_and_the_Temple_of_Doom_PosterB.jpg',
        platform: 'Netflix',
    },
];

export default function Home() {
    const [movies, setMovies] = useState<any[]>([]);

    const handleMovieSelect = async (movie: movie) => {
        setMovies((prevMovies) => {
            const newMovies = [...prevMovies];
            if (newMovies.length < 3) {
                newMovies.push(movie);
            } else {
                newMovies.shift();
                newMovies.push(movie);
            }
            return newMovies;
        });

        try {
            await axios.post('/api/saveMovie', movie);
        } catch (error) {
            console.error('Error saving movie:', error);
        }
    };

    const handleDeleteMovie = async (movieId: string) => {
        try {
            setMovies(prevMovies => prevMovies.filter(movie => movie.id.toString() !== movieId));
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    return (
        <div className="container-full">
            <div className="content-wrapper">
                <NavBar />
                <Splash />
                <SearchBar onMovieSelect={handleMovieSelect} />
                <MovieList 
                    movies={movies} 
                    onDeleteMovie={handleDeleteMovie}
                />
                <Footer />
            </div>
        </div>
    );
}