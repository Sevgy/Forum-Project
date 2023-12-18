import { useContext } from 'react';
import { useState } from 'react';

import AuthContext from '../../../context/authContext.js';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styles from './Comment.module.css';

export default function Comment({
    comment,
    onDelete,
    onEdit,
}) {
    const { userId } = useContext(AuthContext)
    const [show, setShow] = useState(false);
    const [data, setData] = useState({
        text: comment.text,
    })

    const onChange = (e) => {
        setData(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () => {
        onDelete(comment._id);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        onEdit(comment._id, data)
    };

    return (
        <div className={styles['comment-box']}>
            <div className={styles['comment-info']}>
                <p className={styles['comment-text']}>Author:</p>
                <p className={styles['comment-email']}>{comment.owner.email}</p>
                {userId === comment._ownerId && (
                    <div className={styles['comment-buttons']}>
                        <Button variant="primary" onClick={handleShow}>
                            Edit
                        </Button>

                        <button className={`${styles['comment-button']} ${styles['delete-button']}`} onClick={handleDelete}>Delete</button>
                    </div>
                )}
            </div>
            <div className={styles['comment-divider']}></div>
            <div className={styles['comment-content']}>
                <p className={styles['comment-text']}>{comment.text}</p>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Add comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="text"
                                onChange={onChange}
                                value={data.text}
                            />
                        </Form.Group>

                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleEdit}>Edit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};