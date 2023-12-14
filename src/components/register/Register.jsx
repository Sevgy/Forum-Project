import styles from './Register.module.css';

export default function Register() {
    return (
        <div className={styles['register-background']}>
          <div className={styles['register-container']}>
            <div className={styles['register-form-container']}>
              <h2>Create an Account</h2>
              {/* Add your registration form here */}
              <form>
                {/* Your registration form fields go here */}
              </form>
            </div>
          </div>
        </div>
      );
}