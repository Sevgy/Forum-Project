import styles from './PostCreate.module.css';

export default function PostCreate() {
    return (
        <div className={styles['create-post-background']}>
          <div className={styles['create-post-container']}>
            <div className={styles['create-post-form-container']}>
              <h2>Create a New Post</h2>
              {/* Add your create post form here */}
              <form>
                {/* Your create post form fields go here */}
              </form>
            </div>
          </div>
        </div>
      );
};