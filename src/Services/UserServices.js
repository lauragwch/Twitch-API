import axios from "axios";
import { TOKEN } from "../config";

function fetchStreamerByUserLogin(userLogin) {
    return axios.get("https://api.twitch.tv/helix/users?login=" + userLogin, {
        headers: {
          'Authorization': `Bearer `+TOKEN,
          'Client-ID': 'by9gj34dxacttetmnaz3w0m3bqdbkw',
          'Content-Type': 'application/json'
        }
      })
  }

  function fetchFollowerByStreamerId(streamerId) {
    return axios.get("https://api.twitch.tv/helix/users/follows?to_id=" + streamerId, {
        headers: {
          'Authorization': `Bearer `+TOKEN,
          'Client-ID': 'by9gj34dxacttetmnaz3w0m3bqdbkw',
          'Content-Type': 'application/json'
        }
      })
  }

  export default {
    fetchStreamerByUserLogin,
    fetchFollowerByStreamerId
  }