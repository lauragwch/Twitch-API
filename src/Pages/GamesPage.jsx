import { useEffect, useState } from "react"
import GameCard from "../Components/GameCard"
import { Container } from "react-bootstrap"
import GameServices from "../Services/GameServices"

const GamesPage = () => {

    const [games, setGames] = useState([])

    const fetchGames = async () => {
        try {
            const response = await GameServices.fetchGames()
            setGames(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchGames()
    }, [])

    return <>
        <Container className="mt-4">
            <div className="d-flex flex-wrap justify-content-center gap-2">
                {games && games.map((game, index) => {
                    return <GameCard key={index} game={game} />
                })}
            </div>
        </Container>
    </>;
}

export default GamesPage;