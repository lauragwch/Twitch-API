import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import GamesPage from './Pages/GamesPage';
import NavBar from './Components/NavBar';
import SideMenu from './Components/SideMenu';


function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <SideMenu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GamesPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App