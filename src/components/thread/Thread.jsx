import { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import * as postService from '../../services/postService.js';
import * as commentService from '../../services/commentService.js';
import AuthContext from '../../context/authContext.jsx';
import useForm from '../../hooks/useForm.js';

import Comment from './comment/Comment.jsx';

import styles from './Thread.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Thread() {
    const navigate = useNavigate();
    const initialValues = {
        text: ""
    }
    const { email, userId, isAuthenticated } = useContext(AuthContext);
    const [thread, setThread] = useState({});
    const [comments, setComments] = useState([]);
    const { postId } = useParams();

    useEffect(() => {
        postService.getOne(postId)
            .then(setThread);

        commentService.getAll(postId)
            .then(setComments);
    }, [postId])

    const createCommentSubmitHandler = async (values, resetValues) => {

        if (!values.text.trim()) {
            // If comment text is empty, show an alert and do not proceed with form submission
            alert('Comment text cannot be empty');
            return;
        }

        const newComment = await commentService.create(
            postId,
            values['text'],
        );

        console.log(newComment);

        setComments(state => [...state, { ...newComment, owner: { email } }]);
        resetValues();
    };

    const deleteCommentButtonHandler = async (commentId) => {
        const hasConfirmed = confirm(`Are you sure you want to delete your comment`);

        if (hasConfirmed) {
            await commentService.removeComment(commentId);
            setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
        }
    };

    const editCommentButtonHandler = async (commentId, data) => {

       

        data['postId'] = postId;
        await commentService.edit(commentId, data)
            .then((editedComment) => {

                console.log('Comment edited successfully:', editedComment);

                setComments((prevComments) =>
                    prevComments.map((comment) =>
                        comment._id === commentId ? { ...comment, text: editedComment.text, _id: editedComment._id } : comment
                    )
                );
            })
            .catch((error) => {

                console.error('Error editing comment:', error);
            })


    };

    const deleteThreadButtonHandler = async () => {
        const hasConfirmed = confirm(`Are you sure you want to delete ${thread.title}`);

        if (hasConfirmed) {
            await postService.removePost(postId);

            navigate('/posts');
        }
    };

    const { values, onChange, onSubmit } = useForm(createCommentSubmitHandler, initialValues);


    return (
        <div className={styles['thread-container']}>
            <div className={styles['post-info']}>
                <div className={styles['post-content-box']}>
                    <div className={styles['poster-info']}>
                        <p>Poster:{thread.email} </p>
                        {userId === thread._ownerId && (
                            <div className={styles['comment-buttons']}>
                                <Link to={`/posts/${postId}/edit`} className={`${styles['comment-button']} ${styles['edit-button']}`}>Edit</Link>
                                <button
                                    className={`${styles['comment-button']} ${styles['delete-button']}`}
                                    onClick={deleteThreadButtonHandler}
                                >Delete</button>
                            </div>
                        )}
                    </div>
                    <div className={styles['post-content']}>
                        <h2 className={styles['post-title']}>{thread.title}</h2>
                        <p className={styles['post-text']}>{thread.text}</p>
                    </div>
                </div>
            </div>

            <div className={styles['comments-container']}>
                {comments.map(comment => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                        onDelete={deleteCommentButtonHandler}
                        onEdit={editCommentButtonHandler}
                    />
                ))}
            </div>

            <div className={styles['add-comment-form']}>
                {isAuthenticated && (
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Add comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="text"
                                onChange={onChange}
                                value={values['text']}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Post Comment
                        </Button>
                    </Form>
                )}

                {!isAuthenticated && (
                    <h5>Log in to comment</h5>
                )}
            </div>
        </div>
    );
};