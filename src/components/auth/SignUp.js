import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { firestore } from '../../config/firebase';

export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const { signup } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match!");
        }

        setError("");
        setLoading(true);
        signup(emailRef.current.value, passwordRef.current.value)
            .then((res) => {
                return firestore.collection('users').doc(res.user.uid).set({
                    firstName: firstNameRef.current.value,
                    lastName: lastNameRef.current.value
                })
            }).then(() => {
                history.push('/');
                setLoading(false);
            }).catch(err => {
                setError(err.message);
                history.push('/');
                setLoading(false);
            })
    }

    return (
        <Container className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" ref={firstNameRef} required />
                            </Form.Group>
                            <Form.Group id="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" ref={lastNameRef} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required />
                            </Form.Group>
                            <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/signin">Log In</Link>
                </div>
            </div>
        </Container>
    )
}
