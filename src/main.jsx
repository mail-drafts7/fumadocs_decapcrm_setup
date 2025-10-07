import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import AdminPage from './AdminPage.jsx'
import './index.css'

function AppWithRouter() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
        <Route path="/gettingstarted" element={<App isDarkMode={isDarkMode} toggleTheme={toggleTheme} currentPage="getting-started" />} />
        <Route path="/testing" element={<App isDarkMode={isDarkMode} toggleTheme={toggleTheme} currentPage="testing" />} />
        <Route path="/apicontract" element={<App isDarkMode={isDarkMode} toggleTheme={toggleTheme} currentPage="api-contract" />} />
        <Route path="/admin" element={<AdminPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
      </Routes>
    </Router>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWithRouter />
  </React.StrictMode>
)
