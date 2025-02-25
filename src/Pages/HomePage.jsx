import { Container } from "react-bootstrap";
import TestServices from "../Services/StreamServices";
import { useEffect, useState } from "react";
import StreamServices from "../Services/StreamServices";
import GameServices from "../Services/GameServices";
import CarouselStream from "../Components/CarouselStream";

const HomePage = () => {
    const [streamers, setStreamers] = useState([])

    const fecthStreamers = async () => {
        try {
            const response = await StreamServices.fetchStreamers()
            const responseBis = await GameServices.fetchGames()
            console.log(responseBis)
            // console.log(response.data.data)
            setStreamers(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fecthStreamers()
    }, [])

    return <>
        <Container>

            <h1>HomePage</h1>

            <CarouselStream/>


        </Container>
    </>;
}

export default HomePage;