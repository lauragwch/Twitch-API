import { Container } from "react-bootstrap";
import TestServices from "../Services/StreamServices";
import { useEffect, useState } from "react";
import StreamServices from "../Services/StreamServices";
import GameServices from "../Services/GameServices";

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

            { streamers && streamers.map((streamer, index) => {
                return <div key={index}>
                    <h2>{streamer.user_name}</h2>
                    <img src={streamer.thumbnail_url.replace("{width}x{height}", "450x300")} alt="" />
                </div>
            })

            }
        </Container>
    </>;
}
 
export default HomePage;