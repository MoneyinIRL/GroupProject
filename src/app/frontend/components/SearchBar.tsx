import React, { useState } from 'react';
import AddItemModal from './AddItemModal';
import styles from './SearchBar.module.css';
import { searchMovies, getMovieDetails } from '../../api/tmdb';
import searchIcon from "../images/SearchIcon.png";
import filterIcon from "../images/FilterIcon.png";

export default function SearchBar({ onMovieSelect }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearchClick = async () => {
        if (query.trim()) {
            setIsLoading(true);
            const movies = await searchMovies(query.trim());
            setResults(movies.slice(0, 3)); // Limit to top 3 results
            setIsLoading(false);
        } else {
            setResults([]);
        }
    };

    const handleResultClick = async (movieId) => {
        const movieDetails = await getMovieDetails(movieId);
        
        // Save to database
        try {
            const response = await fetch('/api/saveMovie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    movieId: movieDetails.id,
                    title: movieDetails.title,
                    overview: movieDetails.overview,
                    poster_path: movieDetails.poster_path,
                    genres: movieDetails.genres.map(g => g.name)
                })
            });

            if (!response.ok) throw new Error('Failed to save movie');
            
            onMovieSelect(movieDetails);
        } catch (error) {
            console.error('Error saving movie:', error);
        }
    };

    return (
        <div className={styles.SearchBar}>
            <div className={styles.searchGroup}>
                <button className={styles.searchButton} onClick={handleSearchClick}>
                    <img src={searchIcon.src} alt="Search Items" />
                </button>
                <input
                    className={styles.searchInput}
                    name="Search Text"
                    placeholder="Search for a movie..."
                    value={query}
                    onChange={handleSearchChange}
                />
                <button className={styles.filterButton}>
                    <img src={filterIcon.src} alt="Filter Items" />
                </button>
            </div>
            <div className={styles.resultsContainer}>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    results.map((movie) => (
                        <div key={movie.id} className={styles.resultItem} onClick={() => handleResultClick(movie.id)}>
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                                className={styles.moviePoster}
                            />
                            <div className={styles.movieDetails}>
                                <h4>{movie.title}</h4>
                                <p>{movie.release_date}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
