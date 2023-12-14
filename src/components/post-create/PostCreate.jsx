import styles from './PostCreate.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function PostCreate() {
  return (
    <div className={styles['create-post-background']}>
      <div className={styles['create-post-container']}>
        <div className={styles['create-post-form-container']}>
          <h2>Create a New Post</h2>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Post Title</Form.Label>
              <Form.Control type="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Text</Form.Label>
              <Form.Control as="textarea" rows={4} />
            </Form.Group>
          </Form>

          <Button variant="primary" type="submit">
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};