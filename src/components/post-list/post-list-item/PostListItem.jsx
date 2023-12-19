import { Link } from "react-router-dom";
import styles from './PostListItem.module.css';

export default function PostListItem({
    _id,
    title,
    text,
    email,
}) {
    function truncateText(text, limit) {
        return text.length > limit ? `${text.slice(0, limit)}...` : text;
    }

    const truncatedText = truncateText(text, 150);

    return (
        <div className={styles['post-list-item']}>
            <Link to={`/posts/${_id}`} className={styles['post-link']}>
                <h3 className={styles['post-title']}>{title}</h3>
                <p className={styles['post-content']}>{truncatedText}</p>
                <div className={styles['post-meta']}>
                    <span>Author: {email}</span>
                    {/* <span>Posted on: Not determined yet</span> */}
                </div>
            </Link>
        </div>
    );
};