import { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaBell, FaCommentDots, FaUser, FaCompass } from "react-icons/fa";


const NavBar = () => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    return (
        <Navbar bg='black' variant='dark' expand='lg' expanded={expanded}>
            <Container fluid>
                <Navbar.Brand onClick={() => navigate('/')}>TWITCH</Navbar.Brand>

                <Navbar.Toggle onClick={() => setExpanded(expanded ? false : true)} />
                <Navbar.Collapse id='basic-navbar-nav'>

                    <Nav className='me-auto'>
                        <Nav.Link onClick={() => { navigate('/browse'); setExpanded(false); }}>Browse</Nav.Link>
                        <FaCompass size={18} className="me-2" /> Browse
                    </Nav>

                    <Form className="d-flex mx-auto">
                        <FormControl type="search" placeholder="Search" className="searchBar" />
                        <Button>
                            <FaSearch />
                        </Button>
                    </Form>

                    <Nav>
                        <Nav.Link href="#">
                            <FaBell size={20} />
                        </Nav.Link>
                        <Nav.Link href="#">
                            <FaCommentDots size={20} />
                        </Nav.Link>
                        <Nav.Link onClick={() => { navigate('/login'); setExpanded(false); }}>
                            <FaUser size={20} />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
