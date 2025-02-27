import axios from "axios";
import { TOKEN } from "../config";

function fetchVideoByStreamerId(streamerId) {
    return axios.get("https://api.twitch.tv/helix/videos?user_id=" + streamerId, {
        headers: {
          'Authorization': `Bearer `+TOKEN,
          'Client-ID': 'by9gj34dxacttetmnaz3w0m3bqdbkw',
          'Content-Type': 'application/json'
        }
      })
}

function fetchVideoById(videoId) {
  return axios.get("https://api.twitch.tv/helix/videos?id=" + videoId, {
      headers: {
        'Authorization': `Bearer `+TOKEN,
        'Client-ID': 'by9gj34dxacttetmnaz3w0m3bqdbkw',
        'Content-Type': 'application/json'
      }
    })
}

export default {
    fetchVideoByStreamerId,
    fetchVideoById
}