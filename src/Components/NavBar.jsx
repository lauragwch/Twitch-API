import { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaBell, FaCommentDots, FaUser, FaCompass } from "react-icons/fa";


const NavBar = () => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    return (
        <Navbar expand='lg' expanded={expanded}>
            <Container fluid>
                <Navbar.Brand onClick={() => navigate('/')}>TWITCH</Navbar.Brand>
                <Navbar.Toggle onClick={() => setExpanded(expanded ? false : true)} />
                <Navbar.Collapse id='basic-navbar-nav' className="justify-content-start">

                    <Nav className=''>
                        <Nav.Link onClick={() => { navigate('/games'); setExpanded(false); }}>Jeux</Nav.Link>
                    </Nav>

                    <Form className="d-flex mx-auto col-5 gap-2 justify-content-center">
                        <FormControl type="search" placeholder="Search" className="searchBar col-12" />
                        <Button>
                            <FaSearch />
                        </Button>
                    </Form>

                    <Nav className="ml-auto">
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
