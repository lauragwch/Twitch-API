import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-multi-carousel/lib/styles.css';
import { Carousel, Container, Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import StreamServices from '../Services/StreamServices';

function CarouselStream() {
    const [streamers, setStreamers] = useState([])


    const fecthStreamers = async () => {
        try {
            const response = await StreamServices.fetchStreamers()
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
                return <Carousel.Item key={index}>
                    <Image fluid src={streamer.thumbnail_url.replace("{width}x{height}", "1280x720")} alt="" />
                    <Carousel.Caption>
                        <h3 style={{textShadow: "1px 1px 20px black"}}>{streamer.user_name}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            })
            }
        </Carousel>
        // </Container>
    );
}

export default CarouselStream;