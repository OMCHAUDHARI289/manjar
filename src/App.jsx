import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import FloatingMusicPlayer from './components/FloatingMusicPlayer'
import BirthdayLanding from './pages/BirthdayLanding'
import FinalWishPage from './pages/FinalWishPage'
import LetterPage from './pages/LetterPage'
import PlaylistPage from './pages/PlaylistPage'
import WishPage from './pages/WishPage'
import './App.css'

function BirthdayMusicLayer() {
  const { pathname } = useLocation()
  const showMusic = pathname === '/wish' || pathname === '/letter'

  return showMusic ? <FloatingMusicPlayer /> : null
}

function App() {
  return (
    <Router>
      <BirthdayMusicLayer />
      <Routes>
        <Route path="/" element={<BirthdayLanding />} />
        <Route path="/wish" element={<WishPage />} />
        <Route path="/letter" element={<LetterPage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/final-wish" element={<FinalWishPage />} />
        <Route path="/cake-cutting" element={<Navigate to="/cak.htm" replace />} />
      </Routes>
    </Router>
  )
}

export default App
