import styles from './Comment.module.css';

export default function Comment({
    text,
    owner: { email },
}) {
    return (
        <div className={styles['comment-box']}>
            <div className={styles['comment-info']}>
                <p className={styles['comment-text']}>Author:</p>
                <p className={styles['comment-email']}>{email}</p>
                <div className={styles['comment-buttons']}>
                    <button className={`${styles['comment-button']} ${styles['edit-button']}`}>Edit</button>
                    <button className={`${styles['comment-button']} ${styles['delete-button']}`}>Delete</button>
                </div>
            </div>
            <div className={styles['comment-divider']}></div>
            <div className={styles['comment-content']}>
                <p className={styles['comment-text']}>{text}</p>
            </div>
        </div>
    );
};