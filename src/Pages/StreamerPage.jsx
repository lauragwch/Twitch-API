import { useEffect, useState } from "react"
import { Button, Container, Image } from "react-bootstrap"
import { useParams } from "react-router-dom"
import StreamServices from "../Services/StreamServices"
import UserServices from "../Services/UserServices"
import VideoServices from "../Services/VideoServices"
import VideoCard from "../Components/VideoCard"

const StreamerPage = () => {

    const { id } = useParams()
    const [streamer, setStreamer] = useState([])
    const [streamerVideos, setStreamerVideos] = useState([])

    const fetchStreamerByUserLogin = async () => {
        try {
            const response = await UserServices.fetchStreamerByUserLogin(id)
            const responseBis = await StreamServices.fetchStreamerById(response.data.data[0].id)
            const responseTer = await  VideoServices.fetchVideoByStreamerId(response.data.data[0].id)
            setStreamer({ ...response.data.data[0], ...responseBis.data.data[0] })
            setStreamerVideos(responseTer.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    const getElapsedTime = (timestamp) => {
        const startTime = new Date(timestamp);
        const now = new Date();
        const diff = Math.floor((now - startTime) / 1000); // Différence en secondes

        const hours = Math.floor((diff % (3600 * 24)) / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;

        return `${hours}h ${minutes}m`;
    };

    useEffect(() => {
        fetchStreamerByUserLogin()
    }, [id])

    return <>
        <Container className="mt-4">
            <iframe
                style={{width: "85%", aspectRatio: "16/9"}}
                id="inlineFrameExample"
                title="Inline Frame Example"
                src={"https://player.twitch.tv/?channel=" + id + "&parent=localhost"}>
            </iframe>


            <div className="d-flex flex-column gap-2" style={{width: "85%"}}>
                <div className="d-flex">
                    <div className="col-1 d-flex align-items-center p-1">
                        <Image fluid style={{ borderRadius: "250px"}} src={streamer.profile_image_url} />
                    </div>
                    <div className="d-flex flex-column col-11 gap-1">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2 style={{fontSize:"1rem"}}>{streamer.display_name}</h2>
                            <div className="d-flex gap-2">
                                <p>👥 {streamer.viewer_count}</p>
                                <p>🕑 {getElapsedTime(streamer.started_at)}</p>
                            </div>
                        </div>
                        <p style={{fontSize:"0.9rem"}}>{streamer.title}</p>
                        <div className="d-flex align-items-center gap-2">
                            <p className="m-0" style={{ color: "orange" }}>{streamer.game_name}</p>
                            <div className="d-flex align-items-center gap-2">
                                {streamer.tags && streamer.tags.map((tag, index) => {
                                    return <Button key={index} variant="outline-light" style={{ padding: "3px", fontSize: "0.7rem" }}>{tag}</Button>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p>Concernant {streamer.display_name}</p>
                    <div style={{backgroundColor: "#202020", borderRadius: "0.4rem"}} className="p-3">
                        <p>{streamer.description}</p>
                    </div>
                </div>
                {streamerVideos ? <>
                    <div>
                    <p>Vidéos</p>
                    <div style={{backgroundColor: "#202020", borderRadius: "0.4rem"}} className="p-3 d-flex flex-wrap justify-content-evenly">
                        {streamerVideos && streamerVideos.map((video, index) => {
                            if (index != 0)
                            return <VideoCard key={index} video={video} streamerId={id} />
                        })}
                    </div>
                </div>
                </> : null}
                
            </div>
        </Container>
    </>;
}

export default StreamerPage;