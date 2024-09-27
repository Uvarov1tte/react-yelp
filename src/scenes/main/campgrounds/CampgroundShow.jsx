/* eslint-disable react-refresh/only-export-components */
import { Button, Card, Carousel, Col, ListGroup, Row } from "react-bootstrap"
import { useLoaderData, useParams } from "react-router-dom"
import { useState, useEffect } from "react";

export async function loader({ params }) {
    const campgroundId = params.id
    const fetchUrl = `http://localhost:3000/api/campgrounds/${campgroundId}`
    const campground = await fetch(fetchUrl)
    return campground
}

export default function CampgroundShow() {

    const { campground } = useLoaderData()
    // console.log(campground)
    const isThereImage = campground && campground.image && campground.image.length > 0
    const imgPlaceholderUrl = "https://res.cloudinary.com/dutixedzl/image/upload/v1727016001/Yelp-Camp-React/colin-moldenhauer-XwXGgBPZ9rQ-unsplash_l71xkf.jpg"
    // if (isThereImage) {
    //     console.log(campground.image[0])
    // } else {
    //     console.log("no image")
    // }
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <Row>
                <Col>
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        {/* <img crossOrigin="anonymous" src={campground.image[0].url} className="d-block w-100" alt="" /> */}
                        {
                            isThereImage ? (campground.image.map((img, i) => (
                                <Carousel.Item key={img._id}>
                                    <img crossOrigin="anonymous" src={img.url} className="d-block w-100" alt="" />
                                </Carousel.Item>
                            ))) : (
                                <Carousel.Item>
                                    <img crossOrigin="anonymous" src={imgPlaceholderUrl} className="d-block w-100" alt="" />
                                    <Carousel.Caption>
                                        <h3>No Image available</h3>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                        }
                    </Carousel>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>{campground.title}</Card.Title>
                            <Card.Text>{campground.description}</Card.Text>
                        </Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>{campground.location}</ListGroup.Item>
                            {/* <ListGroup.Item>Submitted by {campground.author.username}</ListGroup.Item> */}
                            <ListGroup.Item>${campground.price} / night</ListGroup.Item>
                        </ListGroup>
                        <Card.Footer className="text-muted"> 2 days ago</Card.Footer>
                        <Card.Body>
                            <Button variant="info" href={`/campgrounds/${campground.id}/edit`}>Edit</Button>
                            <form className="d-inline" action={`/campgrounds/${campground.id}?_method=DELETE`} method="POST">
                                <button className="btn btn-danger">Delete</button>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <div>Reviews</div>
                </Col>
            </Row>
        </>
    )
}