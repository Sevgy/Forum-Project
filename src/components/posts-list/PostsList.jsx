import styles from './PostsList.module.css'


export default function PostsList() {
    return (
        <div className={styles['post-list-container']}>
      <div className={styles['post-list']}>
        <h2>Forum Posts</h2>
        <div className={styles.posts}>
          {/* {postsData.map((post) => (
            <Post key={post.id} post={post} />
          ))} */}
        </div>
      </div>
    </div>
    );
};