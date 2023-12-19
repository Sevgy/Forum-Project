import { useContext, useState } from 'react';
import useForm from '../../hooks/useForm.js';
import AuthContext from '../../context/authContext.jsx';

import styles from './Login.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const LoginFormKeys = {
    Email: 'email',
    Password: 'password',
};

export default function Login() {
    const { loginSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(submitHandler, {
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        server: '',
    });

    async function submitHandler() {
        try {
            // Basic form validation
            const { email, password } = values;
            const newErrors = {};

            if (!email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                newErrors.email = 'Invalid email format';
            }

            if (!password.trim()) {
                newErrors.password = 'Password is required';
            }

            // Update errors state
            setErrors(newErrors);

            // If there are validation errors, do not proceed with form submission
            if (Object.keys(newErrors).length === 0) {
                // If all validations pass, call the loginSubmitHandler
                await loginSubmitHandler(values);

                // If the loginSubmitHandler completes without errors, you can perform additional actions
                navigate(Path.Home);
            }
        } catch (error) {
            console.error('Error during login:', error);

            if (error.code === 403) {
                // Forbidden (login or password don't match)
                setErrors({
                    email: '',
                    password: 'Login or password don\'t match',
                    server: '',
                });
            } else {
                // Other server errors
                setErrors({
                    email: '',
                    password: '',
                    server: 'An unexpected error occurred. Please try again later.',
                });
            }
        }
    }

    return (
        <div className={styles['login-background']}>
            <div className={styles['login-container']}>
                <div className={styles['login-form-container']}>
                    <h2>Login to Your Account</h2>
                    {errors.email && <Alert variant="danger">{errors.email}</Alert>}
                    {errors.password && <Alert variant="danger">{errors.password}</Alert>}
                    {errors.server && <Alert variant="danger">{errors.server}</Alert>}
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name={LoginFormKeys.Email}
                                onChange={onChange}
                                value={values[LoginFormKeys.Email]}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        {errors.email && <div className="text-danger">{errors.email}</div>}

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name={LoginFormKeys.Password}
                                onChange={onChange}
                                value={values[LoginFormKeys.Password]}
                            />
                        </Form.Group>
                        {errors.password && <div className="text-danger">{errors.password}</div>}

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};