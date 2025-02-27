import axios from 'axios';
import { TOKEN } from '../config';

function fetchFollowedStreams(userId) {
    return axios.get(`https://api.twitch.tv/helix/streams/followed?user_id=${userId}`, {
        headers: {
            'Authorization': `Bearer ` + TOKEN,
            'Client-ID': 'by9gj34dxacttetmnaz3w0m3bqdbkw',
            'Content-Type': 'application/json'
        }
    })


}

export default {
    fetchFollowedStreams
}