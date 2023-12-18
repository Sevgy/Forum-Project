import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import * as postService from '../../services/postService.js';
import Path from '../../paths.js';
import AuthContext from '../../context/authContext.js';

import styles from './PostEdit.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function PostCreate() {
    const navigate = useNavigate();
    const { postId } = useParams();
    const { email } = useContext(AuthContext)
    const [post, setPost] = useState({
        title: '',
        text: '',
    })

    useEffect(() => {
        postService.getOne(postId)
            .then(result => {
                setPost(result);
            });
    }, [postId]);

    const onChange = (e) => {
        setPost(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const editPostSubmitHandler = async (e) => {
        e.preventDefault();

        post['email'] = email
        await postService.edit(postId, post);

        navigate(Path.Posts);
    }


    return (
        <div className={styles['create-post-background']}>
            <div className={styles['create-post-container']}>
                <div className={styles['create-post-form-container']}>
                    <h2>Edit a Post</h2>
                    <Form onSubmit={editPostSubmitHandler}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Post Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                onChange={onChange}
                                values={post.title}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="text"
                                onChange={onChange}
                                values={post.text}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Edit
                        </Button>
                    </Form>

                </div>
            </div>
        </div>
    );
};