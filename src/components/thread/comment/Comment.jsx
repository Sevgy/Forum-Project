import styles from './Comment.module.css';

export default function Comment() {
    return (
        <div className={styles['comment-box']}>
            <div className={styles['comment-info']}>
                <p>Commenter: {author}</p>
            </div>
            <p>{text}</p>
        </div>
    );
};