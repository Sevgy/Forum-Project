import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as postService from '../../services/postService.js';
import AuthContext from '../../context/authContext.js'

import styles from './Thread.module.css'

export default function Thread() {
    const { email } = useContext(AuthContext);
    const [thread, setThread] = useState({});
    const { postId } = useParams();

    useEffect(() => {

        postService.getOne(postId)
            .then(setThread);

    }, [postId])

    return (
        <div className={styles['thread-container']}>
            <div className={styles['post-info']}>
                <div className={styles['post-content-box']}>
                    <div className={styles['poster-info']}>
                        <p>Poster: John Doe</p>
                    </div>
                    <div className={styles['post-content']}>
                        <h2 className={styles['post-title']}>{thread.title}</h2>
                        <p className={styles['post-text']}>{thread.text}</p>
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