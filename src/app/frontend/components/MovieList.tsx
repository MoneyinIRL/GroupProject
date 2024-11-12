import React from 'react';
import styles from './MovieList.module.css';
import netflixIcon from '/src/app/frontend/images/netflix-icon.png';
import huluIcon from '/src/app/frontend/images/hulu-icon.png';
import primeIcon from '/src/app/frontend/images/prime-icon.png';

const movies = [
    {
        id: 1,
        title: 'Title of Movie 1',
        services: [
            netflixIcon, 
            huluIcon, 
            primeIcon
        ],
        genres: ['Action', 'Thriller', 'Comedy'],
        synopsis: 'Placeholder Body Text, short synopsis of show or movie.',
    },
    {
        id: 2,
        title: 'Title of Movie 2',
        services: [
            netflixIcon, 
            huluIcon, 
            primeIcon
        ],
        genres: ['Action', 'Thriller', 'Comedy'],
        synopsis: 'Placeholder Body Text, short synopsis of show or movie.',
    },
    {
        id: 3,
        title: 'Title of Movie 3',
        services: [
            netflixIcon, 
            huluIcon, 
            primeIcon
        ],
        genres: ['Action', 'Thriller', 'Comedy'],
        synopsis: 'Placeholder Body Text, short synopsis of show or movie.',
    },
];

export default function MovieList() {
    return (
        <div className={styles.movieList}>
            {movies.map((movie) => (
                <div key={movie.id} className={styles.movieCard}>
                    <div className={styles.imagePlaceholder}> {/* Placeholder for movie image */}</div>
                    <div>
                        <h3 className={styles.title}>{movie.title}</h3>
                        <div className={styles.services}>
                            {movie.services.map((service, index) => (
                                <div key={index} className={styles.serviceIcon}>
                                    <img src={service as unknown as string} alt="Service Icon" style={{ width: '100%' }} />
                                </div>
                            ))}
                        </div>
                        <div className={styles.genres}>
                            {movie.genres.map((genre, index) => (
                                <div key={index} className={styles.genreTag}>
                                    {genre}
                                </div>
                            ))}
                        </div>
                        <p className={styles.synopsis}>{movie.synopsis}</p>
                        <button className={styles.editButton}>Edit Content</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
