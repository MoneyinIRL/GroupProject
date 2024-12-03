import React, { useState } from 'react';
import styles from './AddItemModal.module.css';
import { useSession } from 'next-auth/react';

interface AddItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSaveMovie: (movie: any) => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, onSaveMovie }) => {
    const { data: session } = useSession();
    const [title, setTitle] = useState('');
    const [services, setServices] = useState<string[]>([]);
    const [genres, setGenres] = useState(['', '', '']);
    const [description, setDescription] = useState('');

    const handleServiceToggle = (service: string) => {
        if (services.includes(service)) {
            setServices(services.filter((s) => s !== service));
        } else {
            setServices([...services, service]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const movie = {
            title,
            services,
            genres: genres.map((genre) => genre.name || genre), 
            description,
        };

        if (session) {
            try {
                const response = await fetch('/api/saveMovie', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(movie),
                });

                if (!response.ok) {
                    throw new Error('Failed to save movie');
                }

                const data = await response.json();
                console.log('Movie saved successfully!', data);

                // Update state immediately
                onSaveMovie(data.movie);

            } catch (error) {
                console.error('Movie could not be saved.', error);
            }
        }

        setTitle('');
        setServices([]);
        setGenres(['', '', '']);
        setDescription('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Add a Movie</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.input}
                    />
                    <div className={styles.services}>
                        <label>
                            <input
                                type="checkbox"
                                checked={services.includes('Netflix')}
                                onChange={() => handleServiceToggle('Netflix')}
                            />
                            Netflix
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={services.includes('Hulu')}
                                onChange={() => handleServiceToggle('Hulu')}
                            />
                            Hulu
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={services.includes('Prime')}
                                onChange={() => handleServiceToggle('Prime')}
                            />
                            Prime
                        </label>
                    </div>
                    <div className={styles.genres}>
                        {genres.map((genre, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder={`Genre ${index + 1}`}
                                value={genre}
                                onChange={(e) =>
                                    setGenres(
                                        genres.map((g, i) => (i === index ? e.target.value : g))
                                    )
                                }
                                className={styles.genreInput}
                            />
                        ))}
                    </div>
                    <textarea
                        placeholder="Brief description of movie/show..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles.textarea}
                    />
                    <div className={styles.buttonGroup}>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>
                            Cancel
                        </button>
                        <button type="submit" className={styles.addButton}>
                            Add to Watchlist
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItemModal;
