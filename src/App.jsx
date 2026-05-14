import { useState, useReducer, useEffect } from 'react'
import { gameReducer, initialState } from './game/reducer.js'
import { loadHighScore } from './utils/localStorage.js'
import { SettingsProvider } from './context/SettingsContext.jsx'
import Menu from './components/Menu.jsx'
import Game from './components/Game.jsx'
import GameOver from './components/GameOver.jsx'
import './App.css'

function App() {
  const [appState, setAppState] = useState('menu') // 'menu', 'playing'
  const [startLevel, setStartLevel] = useState(1)
  const [highScore, setHighScore] = useState(0)
  const [gameState] = useReducer(gameReducer, initialState)

  // Load high score from localStorage on mount
  useEffect(() => {
    const savedHighScore = loadHighScore()
    setHighScore(savedHighScore)
  }, [])

  const handleStartGame = (level) => {
    setStartLevel(level)
    setAppState('playing')
  }

  const handleMainMenu = () => {
    setAppState('menu')
  }

  return (
    <SettingsProvider>
      <div className="app">
        {appState === 'menu' && (
          <Menu
            onStartGame={handleStartGame}
            highScore={highScore}
          />
        )}

        {appState === 'playing' && (
          <>
            <Game
              onMainMenu={handleMainMenu}
              startLevel={startLevel}
              initialHighScore={highScore}
              onHighScoreUpdate={setHighScore}
            />
            {/* GameOver overlay is handled within Game component */}
          </>
        )}
      </div>
    </SettingsProvider>
  )
}

export default App
