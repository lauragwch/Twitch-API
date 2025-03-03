import { useEffect, useState } from "react"
import { Container, Image } from "react-bootstrap"
import { useParams } from "react-router-dom"
import StreamServices from "../Services/StreamServices"
import UserServices from "../Services/UserServices"
import VideoServices from "../Services/VideoServices"

const VideoPage = () => {

    const { id, videoId } = useParams()
    const [streamer, setStreamer] = useState([])
    const [video, setVideo] = useState([])

    const fetchStreamerByUserLogin = async () => {
        try {
            const response = await UserServices.fetchStreamerByUserLogin(id)
            const responseBis = await StreamServices.fetchStreamerById(response.data.data[0].id)
            const repsonseTer = await VideoServices.fetchVideoById(videoId)
            setStreamer({ ...response.data.data[0], ...responseBis.data.data[0] })
            setVideo(repsonseTer.data.data[0])
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchStreamerByUserLogin()
    }, [])

    return <>
        <Container className="mt-1">
            <iframe
                style={{ width: "85%", aspectRatio: "16/9" }}
                id="inlineFrameExample"
                title="Inline Frame Example"
                src={"https://player.twitch.tv/?video=" + videoId + "&parent=localhost"}>
            </iframe>
            <div className="d-flex flex-column gap-2" style={{ width: "85%" }}>
                <div className="d-flex">
                    <div className="col-1 d-flex align-items-center p-1">
                        <Image fluid style={{ borderRadius: "250px" }} src={streamer.profile_image_url} />
                    </div>
                    <div className="d-flex flex-column col-11 gap-1">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2 style={{ fontSize: "1rem" }}>{streamer.display_name}</h2>
                            <div className="d-flex gap-2">
                                <p>👥 {video.view_count}</p>
                                <p>🕑 {video.duration}</p>
                            </div>
                        </div>
                        <p style={{ fontSize: "0.9rem" }}>{video.title}</p>
                        <div className="d-flex align-items-center gap-2">
                            <p className="m-0" style={{ color: "orange" }}>Rediffusion du {video.created_at ? video.created_at.split("T")[0] : null}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p>Concernant {streamer.display_name}</p>
                    <div style={{ backgroundColor: "#202020", borderRadius: "0.4rem" }} className="p-3">
                        <p>{streamer.description}</p>
                    </div>
                </div>
            </div>
        </Container>
    </>;
}

export default VideoPage;