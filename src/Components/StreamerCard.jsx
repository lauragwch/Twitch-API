import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StreamerCard = ({streamer}) => {
    const navigate = useNavigate()
    return <>
        <Card className="" style={{ width: '22rem', cursor: "pointer", border: "none" }} onClick={() => { navigate() }}>
            <Card.Img style={{ maxHeight: "250px", objectFit: "contain" }} variant="top" src={streamer.thumbnail_url.replace("{width}x{height}", "440x248")} />
            <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title style={{fontSize: "1rem", height:"20px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}} className="text-capitalize">{streamer.title}</Card.Title>
                <Card.Text className="d-flex justify-content-between">
                    <span>{streamer.user_name}</span>
                    <span>Spec. {streamer.viewer_count}</span>
                </Card.Text>
            </Card.Body>
        </Card>
    </>;
}

export default StreamerCard;