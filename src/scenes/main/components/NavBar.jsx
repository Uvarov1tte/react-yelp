import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavBar() {
    return (
        <Navbar
            expand="md"
            className="bg-body-tertiary d-flex"
            data-bs-theme="dark"
            bg="dark"
            sticky="top"
        >
            <Container fluid>
                <Navbar.Brand href="/home">Yelp Camp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav
                        className="justify-content-end flex-grow-1 pe-3"
                        activeKey="/campgrounds">
                        <Nav.Item>
                            <Nav.Link href="/home">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/campgrounds">Campgrounds</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/campgrounds/new">New Campground</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <NavDropdown title="User" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                <NavDropdown.Item href="/register">
                                    Register
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}