import styles from './Thread.module.css'

export default function Thread() {
    return (
        <div className={styles['thread-container']}>
            <div className={styles['post-info']}>
                <div className={styles['post-content-box']}>
                    <div className={styles['poster-info']}>
                        <p>Poster: John Doe</p>
                    </div>
                    <div className={styles['post-content']}>
                        <h2 className={styles['post-title']}>PlaceHolder</h2>
                        <p className={styles['post-text']}>PlaceHolder</p>
                    </div>
                </div>
            </div>

            <div className={styles['comments-container']}>
                {/* {comments.map((comment, index) => (
                    <Comment key={index} {...comment} />
                ))} */}
            </div>

            <div className={styles['add-comment-form']}>
                {/* Add your comment form here */}
                <form>
                    {/* Your comment form fields go here */}
                </form>
            </div>
        </div>
    );
};