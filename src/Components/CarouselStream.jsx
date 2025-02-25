import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-multi-carousel/lib/styles.css';
import { Carousel } from 'react-bootstrap';
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

        <Carousel
            prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" />}
            nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />}
        >

            {streamers && streamers.map((streamer, index) => {
                return <Carousel.Item key={index}>
                    <h2>{streamer.user_name}</h2>
                    <img  className="d-block w-50" src={streamer.thumbnail_url.replace("{width}x{height}", "450x300")} alt="" />
                </Carousel.Item>
            })

            }

        </Carousel>
    );
}

export default CarouselStream;