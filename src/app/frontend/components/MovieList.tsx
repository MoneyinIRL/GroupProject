'use client'

import React from 'react';
import { useSession } from 'next-auth/react';
import styles from './MovieList.module.css';
import netflixIcon from '/src/app/frontend/images/netflix-icon.png';
import huluIcon from '/src/app/frontend/images/hulu-icon.png';
import primeIcon from '/src/app/frontend/images/prime-icon.png';

const defaultMovies = [
    {
        id: 1,
        title: 'Title of Movie 1',
        services: [
            { name: 'Netflix', icon: netflixIcon },
            { name: 'Hulu', icon: huluIcon },
            { name: 'Prime', icon: primeIcon }
        ],
        genres: ['Action', 'Thriller', 'Comedy'],
        synopsis: 'Placeholder Body Text, short synopsis of show or movie.',
    },
    {
        id: 2,
        title: 'Title of Movie 2',
        services: [
            { name: 'Netflix', icon: netflixIcon },
            { name: 'Hulu', icon: huluIcon },
            { name: 'Prime', icon: primeIcon }
        ],
        genres: ['Drama', 'Romance', 'Comedy'],
        synopsis: 'Another placeholder synopsis for this amazing movie.',
    },
    {
        id: 3,
        title: 'Title of Movie 3',
        services: [
            { name: 'Netflix', icon: netflixIcon },
            { name: 'Prime', icon: primeIcon }
        ],
        genres: ['Sci-Fi', 'Adventure', 'Action'],
        synopsis: 'One more placeholder synopsis for your viewing pleasure.',
    }
];

interface MovieListProps {
    movies: any[];
    onDeleteMovie: (movieId: string) => void;
}

export default function MovieList({ movies, onDeleteMovie }: MovieListProps) {
    const { data: session } = useSession();
    
    // Show user's movies if logged in and have movies, otherwise show defaults
    const displayMovies = session && movies.length > 0 ? movies : defaultMovies;

    const handleDelete = async (movieId: string) => {
        if (!session) return;
        
        try {
            
            const response = await fetch(`/api/movies/${movieId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to delete movie');
            }

            
            onDeleteMovie(movieId);
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    return (
        <div className={styles.movieList}>
            {displayMovies.map((movie, index) => (
                <div key={movie._id || `default-${index}`} className={styles.movieCard}>
                    {session && movie._id && (
                        <button 
                            className={styles.deleteButton}
                            onClick={() => handleDelete(movie._id)}
                        >
                            ✕
                        </button>
                    )}
                    <div className={styles.imagePlaceholder}>
                        {movie.poster_path ? (
                            <img 
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                                alt={movie.title} 
                            />
                        ) : (
                            'Image Placeholder'
                        )}
                    </div>
                    <div>
                        <h3 className={styles.title}>{movie.title}</h3>
                        <div className={styles.genres}>
                            {movie.genres && movie.genres.length > 0 ? (
                                movie.genres.map((genre: any, index: number) => (
                                    <div key={index} className={styles.genreTag}>
                                        {typeof genre === 'string' ? genre : genre.name}
                                    </div>
                                ))
                            ) : (
                                <div>No genres available</div>
                            )}
                        </div>
                        <p className={styles.synopsis}>
                            {movie.synopsis || movie.overview || defaultMovies[0].synopsis}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
