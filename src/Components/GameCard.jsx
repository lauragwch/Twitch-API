import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../Style/Cards.css";

const GameCard = ({ game }) => {
    const navigate = useNavigate()
    return <>
        <Card className="" style={{ width: '11rem', cursor: "pointer", border: "none" }} onClick={() => { navigate("/game/" + game.id) }}>
            <Card.Img className="homePageCardImg" style={{ maxHeight: "250px", objectFit: "contain" }} variant="top" src={game.box_art_url.replace("{width}x{height}", "285x380")} />
            <Card.Body className="d-flex flex-column justify-content-start p-0">
                <Card.Title className="text-center text-capitalize">{game.name}</Card.Title>
            </Card.Body>
        </Card>
    </>;
}

export default GameCard;