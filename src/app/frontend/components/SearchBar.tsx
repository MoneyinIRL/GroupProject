import React, { useState } from 'react';
import AddItemModal from './AddItemModal';
import styles from './SearchBar.module.css';

export default function SearchBar() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className={styles.SearchBar}>
            <div className={styles.searchGroup}>
                <button disabled>
                    <img src="../images/SearchIcon.png" alt="Search Items" />
                </button>
                <input
                    className={styles.searchInput}
                    name="Search Text"
                    placeholder="Search..."
                    disabled
                />
            </div>
            <div className={styles.searchGroup}>
                <button disabled>
                    <img src="../images/FilterIcon.png" alt="Filter Items" />
                </button>
                <button className={styles.newButton} onClick={openModal}>
                    Add New...
                </button>
            </div>
            <AddItemModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}
