import { Col, Form, Row, InputGroup, Button } from "react-bootstrap";
import { Form as RRForm } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import { createCampground } from "../../../../server/controllers/campgrounds.cjs";

export async function action(request, params) {
    // const formData = request.formData()
    // const campground = Object.fromEntries(formData);
    // const fetchOptions = { // (3)
    //     method: 'POST', // (4)
    //     body: campground // (5)
    // };
    // console.log(campground)
    // return fetch("http://localhost:3000/api/campgrounds", fetchOptions)
}

export default function CampgroundCreateNew() {
    const [validated, setValidated] = useState(false);

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState();
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        const formData = new FormData()
        formData.append('title', title);
        formData.append('location', location);
        for (let i = 0; i < image.length; i++) {
            formData.append('image', image[i])
        }
        formData.append('price', price);
        formData.append('description', description);
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        try {
            const data = await axios.post('http://localhost:3000/api/campgrounds', formData, config)
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
    };
    
    return (
        <>
            <Row className="mt-4">
                <h1 className="text-center">New Campground</h1>
                <Col md={6} className="offset-md-3">
                    <Form
                        action="/campgrounds"
                        // method="POST"
                        validated={validated}
                        onSubmit={handleSubmit}
                        noValidate
                        encType={"multipart/form-data"}
                        // onChange={handleChange}
                    >
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="title">Title</Form.Label>
                            <Form.Control
                                type="text"
                                id="title"
                                name={"campground[title]"}
                                onChange={(e) => { setTitle(e.target.value) }}
                                required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="location">Location</Form.Label>
                            <Form.Control
                                type="text"
                                id="location"
                                name={"campground[location]"}
                                onChange={(e) => { setLocation(e.target.value) }}
                                required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="image">Image</Form.Label>
                            <Form.Control
                                type="file"
                                id="image"
                                name={"campground[image]"}
                                onChange={(e) => { console.log(e.target.files) || setImage(e.target.files) }}
                                multiple
                                required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="price">Price</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    id="price"
                                    placeholder="0.00"
                                    aria-label="price"
                                    aria-describedby="price-label"
                                    name={"campground[price]"}
                                    onChange={(e) => { setPrice(e.target.value) }}
                                    required 
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </InputGroup> 
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="description">Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                id="description"
                                name={"campground[description]"}
                                onChange={(e) => { setDescription(e.target.value) }}
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <div className="mb-3"></div>
                        <Button variant="success" type="submit">Add campground</Button>
                    </Form>
                </Col>
            </Row>
        </>
    )
}