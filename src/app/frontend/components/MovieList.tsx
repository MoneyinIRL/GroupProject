import React, { useState, useEffect } from 'react';
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
        genres: ['Action', 'Thriller', 'Comedy'],
        synopsis: 'Placeholder Body Text, short synopsis of show or movie.',
    },
    {
        id: 3,
        title: 'Title of Movie 3',
        services: [
            { name: 'Netflix', icon: netflixIcon },
            { name: 'Hulu', icon: huluIcon },
            { name: 'Prime', icon: primeIcon }
        ],
        genres: ['Action', 'Thriller', 'Comedy'],
        synopsis: 'Placeholder Body Text, short synopsis of show or movie.',
    },
];

interface MovieListProps {
    movies: any[];
    onDeleteMovie: (movieId: string) => void;
}

export default function MovieList({ movies, onDeleteMovie }: MovieListProps) {
    const [displayMovies, setDisplayMovies] = useState(defaultMovies);

    useEffect(() => {
        // Update display movies when movies prop changes
        const updatedMovies = defaultMovies.map((defaultMovie, index) => {
            return movies[index] || defaultMovie;
        });
        setDisplayMovies(updatedMovies);
    }, [movies]);

    const handleDelete = async (movieId: number, index: number) => {
        try {
            const response = await fetch(`/api/movies/${movieId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete movie');
            }

            // Update local state first
            setDisplayMovies(prev => {
                const updated = [...prev];
                updated[index] = defaultMovies[index];
                return updated;
            });

            // Notify parent component
            onDeleteMovie(movieId.toString());
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    return (
        <div className={styles.movieList}>
            {displayMovies.map((movie, index) => (
                <div key={`movie-${index}`} className={styles.movieCard}>
                    {movie.id !== defaultMovies[index].id && (
                        <button 
                            className={styles.deleteButton}
                            onClick={() => handleDelete(movie.id, index)}
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
                                movie.genres.map((genre, index) => (
                                    <div key={index} className={styles.genreTag}>
                                        {genre.name || genre}
                                    </div>
                                ))
                            ) : (
                                <div>No genres available</div>
                            )}
                        </div>
                        <p className={styles.synopsis}>
                            {movie.synopsis || movie.overview || defaultMovies[index].synopsis}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
