import React from 'react'
import './AdminPage.css'

function AdminPage({ isDarkMode, toggleTheme }) {
  return (
    <div className={`AdminPage ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      <div className="admin-container">
        <header className="admin-header">
          <h1>⚙️ Admin Dashboard</h1>
          <p>Welcome to the admin dashboard</p>
        </header>
      </div>
    </div>
  )
}

export default AdminPage
