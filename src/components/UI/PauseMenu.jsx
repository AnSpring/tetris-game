import { useState } from 'react'
import Settings from '../Settings.jsx'
import './PauseMenu.css'

function PauseMenu({ onResume, onRestart, onMainMenu }) {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div className="pause-overlay">
      <div className="pause-menu">
        <h2>PAUSED</h2>
        <div className="pause-buttons">
          <button className="menu-button" onClick={onResume}>
            RESUME
          </button>
          <button className="menu-button secondary" onClick={onRestart}>
            RESTART
          </button>
          <button className="menu-button secondary" onClick={() => setShowSettings(true)}>
            SETTINGS
          </button>
          <button className="menu-button secondary" onClick={onMainMenu}>
            MAIN MENU
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <Settings onClose={() => setShowSettings(false)} />
      )}
    </div>
  )
}

export default PauseMenu
