import { Link } from 'react-router-dom';

import styles from './NotFound.module.css';

export default function NotFound () {
    return(
        <div className={styles['not-found-container']}>
            <h1>404 Page Not Found</h1>
            <p>It seems like you lost your way</p>
            <p>
                <Link to="/">Click here to return</Link>
            </p>
        </div>
    );
};