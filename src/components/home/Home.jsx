import styles from './Home.module.css';

export default function Home() {
    return (
        <div className={styles['home-container']}>
            <header className={styles.header}>
                <h1>Welcome to Biceps Forum</h1>
            </header>
            <main className={styles['main-content']}>
                <p>Join the discussion and share your thoughts on training!</p>
            </main>
        </div>
    );
};