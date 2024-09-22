import { Button, Card, Col, Row } from "react-bootstrap";

export default function CampgroundCard({ campground }) {
    const isThereImage = campground && campground.image && campground.image.length > 0
    const imgPlaceholderUrl = "https://res.cloudinary.com/dutixedzl/image/upload/v1714556571/YelpCamp/tpsnvmlpzucljblo77iv.jpg"

    return (
        <>
            <Card className="mb-3">
                <Row>
                    <Col md={4}>
                        <Card.Img className="img-fluid" crossOrigin="anonymous" src={isThereImage ? campground.image[0].url : imgPlaceholderUrl } />
                    </Col>
                    <Col>
                        <Card.Body>
                            <Card.Title>{campground.title}</Card.Title>
                            <Card.Text>{campground.description}</Card.Text>
                            <Card.Text><small className="text-muted">{campground.location}</small></Card.Text>
                            <Button href={`/campgrounds/${campground.id}`} variant="primary">View {campground.title}</Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </>
    )
}