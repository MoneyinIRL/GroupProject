import React, { useState } from 'react';
import styles from './AddItemModal.module.css';

interface AddItemModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose }) => {
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

    interface FormData {
        title: string;
        services: string[];
        genres: string[];
        description: string;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: FormData = {
            title,
            services,
            genres,
            description,
        };
        console.log(formData);

        setTitle('');
        setServices([]);
        setGenres(['', '', '']);
        setDescription('');

        onClose();
    };

    return (
        isOpen && (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.imagePlaceholder}>Add Image</div>
                        <input
                            type="text"
                            placeholder="Title of Movie/Show..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={styles.input}
                        />

                        <label>Available on...</label>
                        <div className={styles.services}>
                            {['netflix', 'prime', 'disney', 'hulu'].map((service) => (
                                <button
                                    key={service}
                                    type="button"
                                    className={`${styles.serviceIcon} ${
                                        services.includes(service) ? styles.selected : ''
                                    }`}
                                    onClick={() => handleServiceToggle(service)}
                                >
                                    {service.charAt(0).toUpperCase()}
                                </button>
                            ))}
                        </div>

                        <label>Genres</label>
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
                                    className={styles.input}
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
        )
    );
};

export default AddItemModal;
