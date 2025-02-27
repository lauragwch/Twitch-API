import { useEffect, useState } from "react"
import GameCard from "../Components/GameCard"
import { Container } from "react-bootstrap"
import GameServices from "../Services/GameServices"
import { useParams } from "react-router-dom"
import StreamServices from "../Services/StreamServices"
import StreamerCard from "../Components/StreamerCard"

const StreamerPage = () => {

    const { id } = useParams()
    const [streamers, setStreamers] = useState([])

    const fetchStreamersByGame = async () => {
        try {
            const response = await StreamServices.fetchStreamersByGame(id)
            console.log(response.data.data)
            setStreamers(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchStreamersByGame()
    }, [])

    return <>
        <Container className="mt-4">
            <h1>streamer page{id}</h1>
        </Container>
    </>;
}

export default StreamerPage;