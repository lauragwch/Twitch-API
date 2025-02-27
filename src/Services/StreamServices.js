import axios from "axios";
import { TOKEN } from "../config";

function fetchStreamers() {
    return axios.get("https://api.twitch.tv/helix/streams", {
        headers: {
          'Authorization': `Bearer `+TOKEN,
          'Client-ID': 'by9gj34dxacttetmnaz3w0m3bqdbkw',
          'Content-Type': 'application/json'
        }
      })
}

function fetchStreamersByGame(gameId) {
  return axios.get("https://api.twitch.tv/helix/streams?game_id=" + gameId, {
      headers: {
        'Authorization': `Bearer `+TOKEN,
        'Client-ID': 'by9gj34dxacttetmnaz3w0m3bqdbkw',
        'Content-Type': 'application/json'
      }
    })
}

function fetchStreamerById(Id) {
  return axios.get("https://api.twitch.tv/helix/streams?user_id=" + Id, {
      headers: {
        'Authorization': `Bearer `+TOKEN,
        'Client-ID': 'by9gj34dxacttetmnaz3w0m3bqdbkw',
        'Content-Type': 'application/json'
      }
    })
}




export default {
    fetchStreamers,
    fetchStreamersByGame,
    fetchStreamerById
}