import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Home.module.css';
import * as postService from '../../services/postService.js';

export default function Home() {
    const [recentPosts, setRecentPosts] = useState([]);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            try {
                const posts = await postService.getRecentPosts();
                setRecentPosts(posts);
            } catch (error) {
                console.error('Error fetching recent posts:', error);
            }
        };

        fetchRecentPosts();
    }, []);

    return (
        <div className={styles['home-container']}>
            <header className={styles.header}>
                <h1>Welcome to Biceps Forum</h1>
            </header>
            <main className={styles['main-content']}>
                <p>Join the discussion and share your thoughts on training!</p>

                <section className={styles['recent-posts']}>
                    <h2>Most Recent Posts</h2>
                    {recentPosts.length === 0 ? (
                        <p>No recent posts available.</p>
                    ) : (
                        recentPosts.map(post => (
                            // Wrap each post box with a Link to its thread
                            <Link key={post._id} to={`/posts/${post._id}`} className={styles['post-box-link']}>
                                <div className={styles['post-box']}>
                                    <h2>{post.title}</h2>
                                    <p className={styles['post-content']}>{post.text}</p>
                                    <p className={styles['post-author']}>Posted by: {post.email}</p>
                                </div>
                            </Link>
                        ))
                    )}
                </section>
            </main>
        </div>
    );
};