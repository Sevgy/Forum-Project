import styles from './Login.module.css';

export default function Login() {
    return (
        <div className={styles['login-background']}>
            <div className={styles['login-container']}>
                <div className={styles['login-form-container']}>
                    <h2>Login to Your Account</h2>
                    {/* Add your login form here */}
                    <form>
                        {/* Your login form fields go here */}
                    </form>
                </div>
            </div>
        </div>
    );
};