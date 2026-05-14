import { useState } from 'react'
import Settings from './Settings.jsx'
import Statistics from './Statistics.jsx'
import './Menu.css'

function Menu({ onStartGame, highScore }) {
  const [startLevel, setStartLevel] = useState(1)
  const [showControls, setShowControls] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showStatistics, setShowStatistics] = useState(false)

  const handleStart = () => {
    onStartGame(startLevel)
  }

  // If showing statistics, render only that
  if (showStatistics) {
    return <Statistics onBack={() => setShowStatistics(false)} />
  }

  return (
    <div className="menu-container">
      <h1 className="game-title">TETRIS</h1>

      {!showControls ? (
        <div className="menu-content">
          <div className="high-score">
            HIGH SCORE: {highScore.toString().padStart(6, '0')}
          </div>

          <div className="level-selector">
            <label htmlFor="level">STARTING LEVEL</label>
            <select
              id="level"
              value={startLevel}
              onChange={(e) => setStartLevel(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <button className="menu-button" onClick={handleStart}>
            START GAME
          </button>

          <button className="menu-button secondary" onClick={() => setShowControls(true)}>
            VIEW CONTROLS
          </button>

          <button className="menu-button secondary" onClick={() => setShowStatistics(true)}>
            STATISTICS
          </button>

          <button className="menu-button secondary" onClick={() => setShowSettings(true)}>
            SETTINGS
          </button>
        </div>
      ) : (
        <div className="controls-screen">
          <h2>CONTROLS</h2>
          <div className="controls-list">
            <div className="control-item">
              <span>← / A</span>
              <span>Move Left</span>
            </div>
            <div className="control-item">
              <span>→ / D</span>
              <span>Move Right</span>
            </div>
            <div className="control-item">
              <span>↓ / S</span>
              <span>Soft Drop</span>
            </div>
            <div className="control-item">
              <span>SPACE</span>
              <span>Hard Drop</span>
            </div>
            <div className="control-item">
              <span>↑ / W</span>
              <span>Rotate CW</span>
            </div>
            <div className="control-item">
              <span>Z / Q</span>
              <span>Rotate CCW</span>
            </div>
            <div className="control-item">
              <span>C / SHIFT</span>
              <span>Hold Piece</span>
            </div>
            <div className="control-item">
              <span>P / ESC</span>
              <span>Pause</span>
            </div>
          </div>
          <button className="menu-button" onClick={() => setShowControls(false)}>
            BACK
          </button>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <Settings onClose={() => setShowSettings(false)} />
      )}
    </div>
  )
}

export default Menu
