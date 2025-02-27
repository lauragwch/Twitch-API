import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './Pages/HomePage';
import GamesPage from './Pages/GamesPage';
import NavBar from './Components/NavBar';
import SideMenu from './Components/SideMenu';
import GamePage from './Pages/GamePage';
import StreamerPage from './Pages/StreamerPage';


function App() {
  const [searchQuery, setSearchQuery] = useState("");


  return (
    <>
      <BrowserRouter>
        <NavBar onSearch={setSearchQuery}/>
        <SideMenu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GamesPage />}/>
          <Route path="/game/:id" element={<GamePage />}/>
          <Route path="/streamer/:id" element={<StreamerPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App