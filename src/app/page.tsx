'use client'

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import NavBar from './frontend/components/NavBar';
import Splash from './frontend/components/Splash';
import SearchBar from './frontend/components/SearchBar';
import MovieList from './frontend/components/MovieList';
import Footer from './frontend/components/Footer';

export default function Home() {
    const { data: session } = useSession();
    const [movies, setMovies] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        
        const fetchMovies = async () => {
            // Clear movies when session changes
            setMovies([]);
            
            if (!session) return;
            
            try {
                const response = await fetch('/api/movies');
                if (response.ok && mounted) {
                    const data = await response.json();
                    setMovies(data);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
        
        return () => {
            mounted = false;
        };
    }, [session]); 

    // check for duplicates
    const isDuplicate = (newMovie: any, existingMovies: any[]) => {
        return existingMovies.some(movie => {
            // Check by movieId (from TMDB)
            if (movie.movieId === newMovie.movieId) {
                return true;
            }
            
            // Check by title (case-insensitive)
            const sameTitle = movie.title?.toLowerCase() === newMovie.title?.toLowerCase();
            
            // If same title, check if it belongs to same user
            if (sameTitle && movie.userId === newMovie.userId) {
                return true;
            }
            
            return false;
        });
    };

    const handleAddMovie = async (movie: any) => {
        if (!session || isLoading) return;

        const movieData = {
            userId: session.user?.id,
            movieId: movie.id,
            title: movie.title,
            overview: movie.overview,
            poster_path: movie.poster_path,
            genres: movie.genres?.map((g: any) => typeof g === 'string' ? g : g.name) || []
        };

        // Check for duplicates before saving
        const isDuplicateMovie = isDuplicate(movieData, movies);
        if (isDuplicateMovie) {
            console.log('Movie already exists in your list');
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch('/api/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movieData),
            });

            if (!response.ok) {
                throw new Error('Failed to save movie');
            }

            const { movie: savedMovie } = await response.json();
            
            // Immediately update the UI with the new movie
            setMovies(prevMovies => [...prevMovies, savedMovie]);

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddMovieOld = async (movie: any) => {
        if (!session || isLoading) return;

        const movieData = {
            userId: session.user?.id,
            movieId: movie.id,
            title: movie.title,
            overview: movie.overview,
            poster_path: movie.poster_path,
            genres: movie.genres?.map((g: any) => typeof g === 'string' ? g : g.name) || []
        };

        try {
            const checkResponse = await fetch('/api/movies');
            if (checkResponse.ok) {
                const currentMovies = await checkResponse.json();
                if (isDuplicate(movieData, currentMovies)) {
                    console.log('Movie already exists in your list');
                    return;
                }
            }

            setIsLoading(true);

            const saveResponse = await fetch('/api/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movieData),
            });

            if (!saveResponse.ok) {
                throw new Error('Failed to save movie');
            }

            const { movie: savedMovie } = await saveResponse.json();
            
            // Update movies state with new movie
            setMovies(prevMovies => [...prevMovies, savedMovie]);

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteMovie = (movieId: string) => {
        setMovies(prevMovies => prevMovies.filter(movie => movie._id !== movieId));
    };

    return (
        <div className="container-full">
            <div className="content-wrapper">
                <NavBar />
                <Splash />
                <div className="px-4">
                    {session && <SearchBar onMovieSelect={handleAddMovieOld} />}
                    <MovieList movies={movies} onDeleteMovie={handleDeleteMovie} />
                </div>
                <Footer />
            </div>
        </div>
    );
}
