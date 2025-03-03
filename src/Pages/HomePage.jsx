import { Container, Row, Col, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import StreamServices from "../Services/StreamServices";
import GameServices from "../Services/GameServices";
import 'react-multi-carousel/lib/styles.css';
import CarouselStream from "../Components/CarouselStream";
import StreamerCard from "../Components/StreamerCard";
import GameCard from "../Components/GameCard";


//Const qui permet d'effectuer une recherche
const HomePage = ({ searchQuery }) => {
    const [topStreams, setTopStreams] = useState([]);
    const [topGames, setTopGames] = useState([]);
    const [recommendedStreams, setRecommendedStreams] = useState([]);
    const [gameSpecificStreams, setGameSpecificStreams] = useState([]);

    // ID du jeu spécifique (exemple : Valorant = 516575)
    const specificGameId = "516575";

    const fetchData = async () => {
        try {
            const [
                topStreamsResponse,
                topGamesResponse,
                recommendedResponse,
                gameSpecificResponse

            ] = await Promise.all([ // On attend que toutes les requêtes soient terminées
                StreamServices.fetchStreamers(), // Streams les plus regardés
                GameServices.fetchTopGames(), // Catégories populaires
                StreamServices.fetchStreamersByLanguage(), // Recommandés FR
                StreamServices.fetchStreamersByGame(specificGameId) // Jeu spécifique
            ]);

            setTopStreams(topStreamsResponse.data.data.slice(0, 9));
            setTopGames(topGamesResponse.data.data.slice(0, 12));
            setRecommendedStreams(recommendedResponse.data.data.slice(0, 6));
            setGameSpecificStreams(gameSpecificResponse.data.data.slice(0, 6));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Structure des sections à afficher
    const sections = [
        { title: "Streams les plus regardés", streams: topStreams },
        { title: "Catégories les plus populaires", streams: topGames, isGames: true },
        { title: "Chaînes recommandées (FR)", streams: recommendedStreams },
        { title: "Streams Valorant", streams: gameSpecificStreams }
    ];

    return (
        <>
            <Container className="mt-4 d-flex justify-content-center">
                <CarouselStream />
            </Container>

            <Container className="mt-5">
                {sections.map((section, index) => (
                    <div key={index} className="mb-5 ">
                        <h2 className="mb-4">{section.title}</h2>
                        <Row xs={1} md={2} lg={3} className="g-4 d-flex justify-content-center"> {/*pour que ce soit responsive*/}
                            {section.streams.map((item) => {
                                console.log(item);

                                if (section.isGames) {
                                    return <GameCard key={item.id} game={item} />
                                }
                                else {
                                    return <StreamerCard key={item.id} streamer={item} />
                                }
                            }

                            )}
                        </Row>
                    </div>
                ))}
            </Container>
        </>
    );
};

export default HomePage;