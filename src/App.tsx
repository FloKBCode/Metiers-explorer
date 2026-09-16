import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import MetiersListe from './pages/MetiersListe'
import MetierDetail from './pages/MetierDetail'
import Comparateur from './pages/Comparateur'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  return (
    <Routes>
      {/* Layout englobe toutes les routes grâce à l'Outlet */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="metiers" element={<MetiersListe />} />
        <Route path="metiers/:codeRome" element={<MetierDetail />} />
        <Route path="comparateur" element={<Comparateur />} />
        {/* Route 404 : capte toute URL non définie */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App