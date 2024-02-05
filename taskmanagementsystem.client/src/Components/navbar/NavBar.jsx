import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from 'react-router-dom';
import MediumLogo from '../CommonComponents/MediumLogo';

function NavBar() {
    return (
        <Navbar fixed="top" expand="md" className="nav-bg mb-3 px-md-5">
            <Container fluid>
                <Navbar.Brand as={NavLink} to="/"><MediumLogo /></Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-md`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-md`}
                    aria-labelledby={`offcanvasNavbar-md`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbar-md`}>
                            ToTask
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 gap-5 pe-3">
                            <Nav.Link as={NavLink} to="/" className="nav-item">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/login" className="nav-item">Login</Nav.Link>
                            <Nav.Link as={NavLink} to="/register" className="nav-item">Register</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default NavBar;