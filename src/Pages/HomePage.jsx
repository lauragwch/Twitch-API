import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import StreamServices from "../Services/StreamServices";
import GameServices from "../Services/GameServices";
import 'react-multi-carousel/lib/styles.css';
import CarouselStream from "../Components/CarouselStream";

const HomePage = () => {
    const [streamers, setStreamers] = useState([])

    const fecthStreamers = async () => {
        try {
            const response = await StreamServices.fetchStreamers()
            const responseBis = await GameServices.fetchGames()
            setStreamers(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fecthStreamers()
    }, [])

    return <>
        <Container className="mt-4 d-flex justify-content-center">
            <CarouselStream/>
        </Container>
    </>;
}

export default HomePage;