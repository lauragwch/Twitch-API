import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import StreamServices from "../Services/StreamServices";
import Select from "react-select";

const NavBar = () => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [streamers, setStreamers] = useState([]);
    const [filteredStreamers, setFilteredStreamers] = useState([]);

    //Je creer une const qui dit que je veux un tableau vide
    const [options, setOptions] = useState([]);

    const fetchStreamers = async () => {
        try {
            const response = await StreamServices.fetchStreamers();
            // console.log(response.data.data);

            // Je creer le tableau vide
            const optionsTab = [];

            // J'indique ce que je veux dans le tableau (le chemin depuis le console.log de l'api)
            response.data.data.map(stream => {

                // Je push dans le tableau lesquelles des valeurs recupérées je veux afficher
                optionsTab.push({ value: stream.user_login, label: stream.user_name });
            });

            // Je lui dis que le tableau que je viens de creer est celui que je veux afficher donc options = optionsTab;
            setOptions(optionsTab);
            setStreamers(response.data.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des streamers:", error);
        }
    };

    useEffect(() => {
        fetchStreamers()
    }
        , [])

    useEffect(() => {
        if (searchQuery) {
            const filtered = streamers.filter(stream =>
                stream.user_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredStreamers(filtered);
        } else {
            setFilteredStreamers(streamers);
        }
    }, [searchQuery, streamers]);

    const handleSelectChange = (selectedOption) => {
        if (selectedOption) {
            navigate("/streamer/" + selectedOption.value);
        }
    };

    return (
        <Navbar expand='lg' expanded={expanded} className="justify-content-center fixed-top" style={{height: "60px", }}>
            <Container fluid className="d-flex justify-content-center">
                <Navbar.Brand onClick={() => navigate('/')}>TWITCH</Navbar.Brand>
                <Navbar.Toggle onClick={() => setExpanded(expanded ? false : true)} />
                <Navbar.Collapse id='basic-navbar-nav' >

                    <Nav className=''>
                        <Nav.Link style={{backgroundColor: "#202020"}} className="text-center" onClick={() => { navigate('/games'); setExpanded(false); }}>Jeux</Nav.Link>
                    </Nav>

                    <div style={{position: "absolute", right: "calc(50% - 200px)"}}>
                    <Select
                        options={options}
                        styles={{ container: (base) => ({ ...base, width: 400 }) }}
                        onChange={handleSelectChange}
                        placeholder="Rechercher un streamer..."
                        isClearable
                    />
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
