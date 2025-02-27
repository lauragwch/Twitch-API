import axios from "axios";

function fetchStreamers() {
    return axios.get("https://api.twitch.tv/helix/streams", {
        headers: {
          'Authorization': `Bearer 347snj7mxv1vpm8wtrt6cudda5wdbo`,
          'Client-ID': 'by9gj34dxacttetmnaz3w0m3bqdbkw',
          'Content-Type': 'application/json'
        }
      })
}

function fetchStreamersByGame(gameId) {
  return axios.get("https://api.twitch.tv/helix/streams?game_id=" + gameId, {
      headers: {
        'Authorization': `Bearer 347snj7mxv1vpm8wtrt6cudda5wdbo`,
        'Client-ID': 'by9gj34dxacttetmnaz3w0m3bqdbkw',
        'Content-Type': 'application/json'
      }
    })
}

export default {
    fetchStreamers,
    fetchStreamersByGame
}