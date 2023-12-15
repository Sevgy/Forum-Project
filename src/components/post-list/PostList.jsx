import { useEffect, useState } from 'react';

import * as postService from '../../services/postService.js';



import styles from './PostList.module.css'
import PostListItem from './post-list-item/PostListItem.jsx';

export default function PostsList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        postService.getAll()
            .then(result => setPosts(result));   
    }, []);

    return (
        <div className={styles['post-list-container']}>
            <div className={styles['post-list']}>
                <h2>Forum Posts</h2>
                <div className={styles.posts}>
                    {posts.map(post => (
                        <PostListItem key={post._id} {...post}/>
                    ))}
                </div>
            </div>
        </div>
    );
};