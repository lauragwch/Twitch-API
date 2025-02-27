import { useEffect, useState } from "react"
import GameCard from "../Components/GameCard"
import { Container } from "react-bootstrap"
import GameServices from "../Services/GameServices"
import { useParams } from "react-router-dom"
import StreamServices from "../Services/StreamServices"
import StreamerCard from "../Components/StreamerCard"

const GamePage = () => {

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
            <div className="d-flex flex-wrap justify-content-center gap-2">
                {streamers && streamers.map((streamer, index) => {
                    return <StreamerCard key={index} streamer={streamer} />
                })}
            </div>
        </Container>
    </>;
}

export default GamePage;