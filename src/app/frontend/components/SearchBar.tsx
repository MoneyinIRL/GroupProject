import React, { useState } from 'react';
import AddItemModal from './AddItemModal';
import styles from './SearchBar.module.css';
import { searchMovies } from '../../api/tmdb'; // check this path
import searchIcon from "../images/SearchIcon.png";
import filterIcon from "../images/FilterIcon.png";
import { searchMovies } from '../../api/tmdb'; 

export default function SearchBar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<{ id: number; title: string; release_date: string; poster_path: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    return (
        <div className={styles.SearchBar}>
            <div className={styles.searchGroup}>
                <button onClick={handleSearchClick}>
                    <img src={searchIcon.src} alt="Search Items" />
                </button>
                <input
                    className={styles.searchInput}
                    name="Search Text"
                    placeholder="Search for a movie..."
                    value={query}
                    onChange={handleSearchChange}
                />
            </div>
            <div className={styles.resultsContainer}>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    results.map((movie) => (
                        <div key={movie.id} className={styles.resultItem}>
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
            <div className={styles.searchGroup}>
                <button>
                    <img src={filterIcon.src} alt="Filter Items" />
                </button>
                <button className={styles.newButton} onClick={openModal}>
                    Add New...
                </button>
            </div>
            <AddItemModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}
