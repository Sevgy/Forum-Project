import { useContext, useState } from 'react';

import AuthContext from '../../context/authContext.jsx';
import useForm from '../../hooks/useForm.js';

import styles from './Register.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';


const RegisterFormKeys = {
    Email: 'email',
    Password: 'password',
    ConfirmPassword: 'confirmPassword',
}

export default function Register() {
    const { registerSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(submitHandler, {
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.ConfirmPassword]: '',
    })

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        server: '',
    });

    async function submitHandler() {
        try {
            // Basic form validation
            const { email, password, confirmPassword } = values;
            const newErrors = {};

            if (!email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                newErrors.email = 'Invalid email format';
            }

            if (!password.trim()) {
                newErrors.password = 'Password is required';
            }


            if (password !== confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }

            // Update errors state
            setErrors(newErrors);

            // If there are validation errors, do not proceed with form submission
            if (Object.keys(newErrors).length === 0) {
                // If all validations pass, call the registerSubmitHandler
                await registerSubmitHandler(values);

                // If the registerSubmitHandler completes without errors, you can perform additional actions
                // For example, redirect to the home page
                navigate(Path.Home);
            }
        } catch (error) {
            console.error('Error during registration:', error);

            // Handle server errors
            setErrors({
                email: '',
                password: '',
                confirmPassword: '',
                server: 'An unexpected error occurred. Please try again later.',
            });
        }
    }

    return (
        <div className={styles['register-background']}>
            <div className={styles['register-container']}>
                <div className={styles['register-form-container']}>
                    <h2>Create an Account</h2>
                    {errors.email && <Alert variant="danger">{errors.email}</Alert>}
                    {errors.password && <Alert variant="danger">{errors.password}</Alert>}
                    {errors.confirmPassword && <Alert variant="danger">{errors.confirmPassword}</Alert>}
                    {errors.server && <Alert variant="danger">{errors.server}</Alert>}
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                onChange={onChange}
                                values={values[RegisterFormKeys.Email]}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={onChange}
                                values={values[RegisterFormKeys.Password]}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword2">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="confirmPassword"
                                onChange={onChange}
                                values={values[RegisterFormKeys.ConfirmPassword]}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}