import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm.js';

import * as postService from '../../services/postService.js';
import Path from '../../paths.js';

import styles from './PostCreate.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CreatePostFormKeys = {
    Title: 'title',
    Text: 'text',
}

export default function PostCreate() {
    const navigate = useNavigate();

    const createPostSubmitHandler = async (values) => {
        await postService.create(values)

        console.log(values);

        navigate(Path.Posts);
    }

    const { values, onChange, onSubmit } = useForm(createPostSubmitHandler, {
        [CreatePostFormKeys.Title]: '',
        [CreatePostFormKeys.Text]: '',
    })


    return (
        <div className={styles['create-post-background']}>
            <div className={styles['create-post-container']}>
                <div className={styles['create-post-form-container']}>
                    <h2>Create a New Post</h2>
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