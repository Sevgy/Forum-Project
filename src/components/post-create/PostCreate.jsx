import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import useForm from '../../hooks/useForm.js';
import * as postService from '../../services/postService.js';
import Path from '../../paths.js';
import AuthContext from '../../context/authContext.jsx';

import styles from './PostCreate.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const CreatePostFormKeys = {
    Title: 'title',
    Text: 'text',
}

export default function PostCreate() {
    const { email } = useContext(AuthContext)
    const navigate = useNavigate();

    const [errorMessages, setErrorMessages] = useState({
        title: '',
        text: '',
    });

    const createPostSubmitHandler = async (values) => {
        // Reset previous error messages
        setErrorMessages({
            title: '',
            text: '',
        });

        // Check if title and text are empty
        if (!values.title.trim()) {
            // Set an error message for the title
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                title: 'Title is required',
            }));
            return;
        }

        if (!values.text.trim()) {
            // Set an error message for the text
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                text: 'Text is required',
            }));
            return;
        }

        // Continue with the post creation if title and text are not empty
        values['email'] = email;
        await postService.create(values);

        console.log(values);

        navigate(Path.Posts);
    };

    const { values, onChange, onSubmit } = useForm(createPostSubmitHandler, {
        [CreatePostFormKeys.Title]: '',
        [CreatePostFormKeys.Text]: '',
    });


    return (
        <div className={styles['create-post-background']}>
            <div className={styles['create-post-container']}>
                <div className={styles['create-post-form-container']}>
                    <h2>Create a New Post</h2>
                    {errorMessages.title && (
                        <Alert variant="danger">{errorMessages.title}</Alert>
                    )}
                    {errorMessages.text && (
                        <Alert variant="danger">{errorMessages.text}</Alert>
                    )}
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Post Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                onChange={onChange}
                                values={values[CreatePostFormKeys.Title]}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="text"
                                onChange={onChange}
                                values={values[CreatePostFormKeys.Text]}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Form>

                </div>
            </div>
        </div>
    );
};