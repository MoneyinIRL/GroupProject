import styles from './SearchBar.module.css';

export default function SearchBar() {
    return (
    <div className={styles.SearchBar}>
        <div className={styles.searchGroup}>
            <button disabled> <img src="../images/SearchIcon.png" alt='Search Items' /> </button>
            <input 
                className={styles.searchInput}
                name="Search Text" 
                placeholder='Search...'
                disabled
            />
        </div>
        <div className={styles.searchGroup}>
            <button disabled> <img src="../images/FilterIcon.png" alt='Filter Items'/> </button>
            <button className={styles.newButton} disabled> Add New...</button>
        </div>
    </div>
    )
}