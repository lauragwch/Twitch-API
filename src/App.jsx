import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import GamesPage from './Pages/GamesPage';
import NavBar from './Components/NavBar';
import SideMenu from './Components/SideMenu';
import GamePage from './Pages/GamePage';
import StreamerPage from './Pages/StreamerPage';
import VideoPage from './Pages/VideoPage';


function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <SideMenu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GamesPage />}/>
          <Route path="/game/:id" element={<GamePage />}/>
          <Route path="/streamer/:id" element={<StreamerPage />}/>
          <Route path="/video/:id/:videoId" element={<VideoPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App