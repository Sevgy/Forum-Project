import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as postService from '../../services/postService.js';
import * as commentService from '../../services/commentService.js';
import AuthContext from '../../context/authContext.js';
import useForm from '../../hooks/useForm.js';

import styles from './Thread.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Comment from './comment/Comment.jsx';


export default function Thread() {
    const { email } = useContext(AuthContext);
    const [thread, setThread] = useState({});
    const [comments, setComments] = useState([]);
    const { postId } = useParams();

    useEffect(() => {
        postService.getOne(postId)
            .then(setThread);
        commentService.getAll(postId)
            .then(setComments);
    }, [postId])

    const createCommentSubmitHandler = async (values) => {
        const newComment = await commentService.create(
            postId,
            values['text'],
        );

        console.log(values);

        setComments(state => [...state, { ...newComment, author: { email } }])
        console.log(comments);
    }

    const { values, onChange, onSubmit } = useForm(createCommentSubmitHandler, {
        text: '',
    })

    return (
        <div className={styles['thread-container']}>
            <div className={styles['post-info']}>
                <div className={styles['post-content-box']}>
                    <div className={styles['poster-info']}>
                        <p>Poster: John Doe</p>
                    </div>
                    <div className={styles['post-content']}>
                        <h2 className={styles['post-title']}>{thread.title}</h2>
                        <p className={styles['post-text']}>{thread.text}</p>
                    </div>
                </div>
            </div>

            <div className={styles['comments-container']}>
                {comments.map((comment) => (
                        <Comment key={comment._id} {...comment}/>
                    ))}
            </div>

            <div className={styles['add-comment-form']}>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Add comment</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            name="text"
                            onChange={onChange}
                            values={values['text']}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Post Comment
                    </Button>
                </Form>
            </div>
        </div>
    );
};