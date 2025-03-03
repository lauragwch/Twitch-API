import axios from "axios";
import { TOKEN } from "../config";

// Récupérer les streams les plus regardés
function fetchStreamers() {
    return axios.get("https://api.twitch.tv/helix/streams?first=20", {
        headers: {
          'Authorization': `Bearer ` + TOKEN,
          'Client-ID': 'by9gj34dxacttetmnaz3w0m3bqdbkw',
          'Content-Type': 'application/json'
        }
      })
}

// Récupérer les chaînes recommandées par langue (français ici)
function fetchStreamersByLanguage() {
    return axios.get("https://api.twitch.tv/helix/streams?first=10&language=fr", {
        headers: {
          'Authorization': `Bearer ` + TOKEN,
          'Client-ID': 'by9gj34dxacttetmnaz3w0m3bqdbkw',
          'Content-Type': 'application/json'
        }
      })
}

// Récupérer les streams par ID de jeu
function fetchStreamersByGame(gameId) {
    return axios.get("https://api.twitch.tv/helix/streams?game_id=" + gameId + "&first=100", {
        headers: {
          'Authorization': `Bearer ` + TOKEN,
          'Client-ID': 'by9gj34dxacttetmnaz3w0m3bqdbkw',
          'Content-Type': 'application/json'
        }
      })
}

// Récupérer les streams par ID d'utilisateur
function fetchStreamerById(Id) {
    return axios.get("https://api.twitch.tv/helix/streams?user_id=" + Id, {
        headers: {
          'Authorization': `Bearer ` + TOKEN,
          'Client-ID': 'by9gj34dxacttetmnaz3w0m3bqdbkw',
          'Content-Type': 'application/json'
        }
      })
}

export default {
    fetchStreamers,
    fetchStreamersByLanguage,
    fetchStreamersByGame,
    fetchStreamerById
}