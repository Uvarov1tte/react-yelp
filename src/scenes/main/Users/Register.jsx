import { useState } from 'react';
import { Card, Col, Container, Row, Button, Form } from "react-bootstrap";

export default function Register() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <>
            <Container>
                <Row className="d-flex justify-content-center align-items-center mt-5">
                    <Col md={6} xl={4}>
                        <Card className="shadow">
                            <Card.Img variant="top" src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                            <Card.Body>
                                <Card.Title>Log In</Card.Title>
                                <Form
                                    action="/register"
                                    method="POST"
                                    className="validated-form"
                                    validated={validated}
                                    onSubmit={handleSubmit}
                                    noValidate>
                                    <Form.Group className="mb-3" controlId="validationCustom01">
                                        <Form.Label htmlFor="username">Username</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            required
                                            type="text"
                                            placeholder="Username"
                                            defaultValue="username"
                                            id="username"
                                            name="username"
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="validationCustom01">
                                        <Form.Label htmlFor="email">Email</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            required
                                            type="text"
                                            placeholder="Email"
                                            defaultValue="email"
                                            id="email"
                                            name="email"
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="validationCustom01">
                                        <Form.Label htmlFor="username">Password</Form.Label>
                                        <Form.Control
                                            required
                                            type="password"
                                            placeholder="Password"
                                            defaultValue="password"
                                            id="password"
                                            name="password"
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Button className="d-grid" type="submit">register</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}