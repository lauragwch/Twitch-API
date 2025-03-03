import { useEffect, useState } from "react"
import { Button, Container, Image } from "react-bootstrap"
import { useParams } from "react-router-dom"
import StreamServices from "../Services/StreamServices"
import UserServices from "../Services/UserServices"
import VideoServices from "../Services/VideoServices"
import VideoCard from "../Components/VideoCard"
import TwitchPartner from "../assets/twitch_partner.png"

const StreamerPage = () => {

    const { id } = useParams()
    const [streamer, setStreamer] = useState([])
    const [streamerVideos, setStreamerVideos] = useState([])

    const fetchStreamerByUserLogin = async () => {
        try {
            const response = await UserServices.fetchStreamerByUserLogin(id)
            const responseBis = await StreamServices.fetchStreamerById(response.data.data[0].id)
            const responseTer = await VideoServices.fetchVideoByStreamerId(response.data.data[0].id)
            console.log(responseBis)
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
        <div className="d-flex">
            <div className="d-flex flex-column streamerPage">
                <iframe
                    style={{ width: "100%", aspectRatio: "16/9" }}
                    id="inlineFrameExample"
                    title="Inline Frame Example"
                    src={"https://player.twitch.tv/?channel=" + id + "&parent=localhost"}
                    allowFullScreen>
                </iframe>
                <div className="d-flex flex-column gap-2 p-3" style={{}}>
                    <div className="d-flex">
                        <div className="d-flex align-items-center p-1" style={{ position: "relative", display: "inline-block" }}>
                            <Image fluid style={{ borderRadius: "250px", maxWidth: "80px" }} src={streamer.profile_image_url} />
                            <Button style={{ position: "absolute", fontSize: "1rem", padding: "0px 3px", left: "50%", bottom: "-5px", transform: "translateX(-50%)" }} variant="danger">LIVE</Button>
                        </div>
                        <div className="d-flex flex-column gap-1" style={{ flexGrow: "1", paddingLeft: "10px" }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex gap-1">
                                    <h2 style={{ fontSize: "1rem" }}>{streamer.display_name}</h2>
                                    {streamer.broadcaster_type && streamer.broadcaster_type == "partner" ? <Image src={TwitchPartner} style={{ aspectRatio: "1/1", width: "16px" }} alt="logo twitch partenaire" /> : null}
                                </div>
                                <div className="d-flex gap-2">
                                    <p>👥 {streamer.viewer_count}</p>
                                    <p>🕑 {getElapsedTime(streamer.started_at)}</p>
                                </div>
                            </div>
                            <p style={{ fontSize: "0.9rem" }}>{streamer.title}</p>
                            <div className="d-flex align-items-center gap-2">
                                <p className="m-0" style={{ color: "orange" }}>{streamer.game_name}</p>
                                <div className="d-flex align-items-center gap-2 flex-wrap">
                                    {streamer.tags && streamer.tags.map((tag, index) => {
                                        return <Button key={index} variant="outline-light" style={{ padding: "3px", fontSize: "0.7rem" }}>{tag}</Button>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4>Concernant {streamer.display_name}</h4>
                        <div style={{ backgroundColor: "#202020", borderRadius: "0.4rem", overflow: "hidden", textOverflow: "ellipsis" }} className="p-3">
                            <p>{streamer.description}</p>
                        </div>
                    </div>
                    {streamerVideos ? <>
                        <div>
                            <h4>Vidéos</h4>
                            <div style={{ backgroundColor: "#202020", borderRadius: "0.4rem" }} className="p-3 d-flex flex-wrap justify-content-evenly">
                                {streamerVideos && streamerVideos.map((video, index) => {
                                    if (index != 0)
                                        return <VideoCard key={index} video={video} streamerId={id} />
                                })}
                            </div>
                        </div>
                    </> : null}

                </div>
            </div>
            <iframe id="twitch-chat-embed"
                src={"https://www.twitch.tv/embed/" + id + "/chat?parent=localhost&darkpopout"}
                style={{ height: "calc(100vh - 60px)", position: "fixed", right: "0px", overflow: "contain", borderLeft: "1px solid #444" }}
            >
            </iframe>
        </div>
    </>;
}

export default StreamerPage;