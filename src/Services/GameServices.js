import axios from "axios";
import { TOKEN } from "../config";

// Récupérer les catégories les plus populaires
function fetchTopGames() {
    return axios.get("https://api.twitch.tv/helix/games/top?first=100", {
        headers: {
          'Authorization': `Bearer ` + TOKEN,
          'Client-ID': 'by9gj34dxacttetmnaz3w0m3bqdbkw',
          'Content-Type': 'application/json'
        }
      })
}

export default {
    fetchTopGames
}