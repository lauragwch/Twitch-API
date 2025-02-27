import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const VideoCard = ({video, streamerId}) => {
    const navigate = useNavigate()
    return <>
        <Card className="" style={{ width: '22rem', cursor: "pointer", border: "none" }} onClick={() => { navigate("/video/" + streamerId + "/" + video.id) }}>
            <Card.Img style={{ maxHeight: "250px", objectFit: "contain" }} variant="top" src={video.thumbnail_url.replace("%{width}x%{height}", "440x248")} />
            <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title style={{fontSize: "1rem", height:"20px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}} className="text-capitalize">{video.title}</Card.Title>
                
                    <div className="d-flex justify-content-between">
                    <span>👥 {video.view_count} </span>
                    <span>🕑 {video.duration}</span>
                    </div>
            </Card.Body>
        </Card>
    </>;
}

export default VideoCard;