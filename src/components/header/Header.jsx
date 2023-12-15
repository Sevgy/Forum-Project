import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/authContext.js';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
    const {
        isAuthenticated,
        username,
    } = useContext(AuthContext)

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">BicepsForum</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/posts">Posts</Nav.Link>

                        {isAuthenticated && (
                            <>
                                <Nav.Link as={Link} to="posts/create">Create Posts</Nav.Link>
                                <Nav.Link as={Link} to="/logout">Log Out</Nav.Link>
                            </>
                        )}

                        {!isAuthenticated && (
                            <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                        
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};


