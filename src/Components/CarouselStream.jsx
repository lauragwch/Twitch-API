import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-multi-carousel/lib/styles.css';
import { Carousel, Container, Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import StreamServices from '../Services/StreamServices';
import { Navigate, useNavigate } from 'react-router-dom';

function CarouselStream() {
    const [streamers, setStreamers] = useState([])
    const navigate = useNavigate()


    const fecthStreamers = async () => {
        try {
            const response = await StreamServices.fetchStreamers()
            console.log(response.data.data)
            setStreamers(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fecthStreamers()
    }, [])


    return (

        // <Container>
        <Carousel
            style={{maxWidth: "700px"}}
            prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" />}
            nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />}
        >
            {streamers && streamers.map((streamer, index) => {
                return <Carousel.Item key={index} style={{cursor: "pointer"}} onClick={() => { navigate("/streamer/" + streamer.user_login) }}>
                    <Image fluid src={streamer.thumbnail_url.replace("{width}x{height}", "1280x720")}  alt="" />
                    <Carousel.Caption className='m-0 ' style={{backgroundColor: "#202020c9", bottom: "0px", left:"0", width: "100%", borderTop: "1px solid #444"}}>
                        <h3 style={{textShadow: "1px 1px 20px black", color: "white", fontSize:"1.4rem"}}>{streamer.user_name}</h3>
                        <h3 style={{textShadow: "1px 1px 20px black", color: "lightgrey", fontSize:"0.9rem"}}>{streamer.title}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            })
            }
        </Carousel>
        
        // </Container>
    );
}

export default CarouselStream;