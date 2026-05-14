import { useReducer, useEffect, useRef } from 'react'
import { gameReducer, initialState, ACTIONS } from '../game/reducer.js'
import { setupInputListeners } from '../game/input.js'
import { saveHighScore, updateGameStats } from '../utils/localStorage.js'
import { addGameToHistory, updateExtendedStats } from '../utils/extendedStats.js'
import { useSettings } from '../context/SettingsContext.jsx'
import soundManager from '../audio/soundManager.js'
import Canvas from './Canvas.jsx'
import Score from './UI/Score.jsx'
import Lines from './UI/Lines.jsx'
import Level from './UI/Level.jsx'
import NextPiece from './UI/NextPiece.jsx'
import HoldPiece from './UI/HoldPiece.jsx'
import Controls from './UI/Controls.jsx'
import Combo from './UI/Combo.jsx'
import LiveStats from './UI/LiveStats.jsx'
import PauseMenu from './UI/PauseMenu.jsx'
import GameOver from './GameOver.jsx'
import TouchControls from './TouchControls.jsx'
import './Game.css'

function Game({ onMainMenu, startLevel, initialHighScore, onHighScoreUpdate }) {
  const [gameState, dispatch] = useReducer(gameReducer, {
    ...initialState,
    highScore: initialHighScore || 0,
  })
  const { soundVolume, musicVolume, isMuted } = useSettings()
  const prevGameStateRef = useRef(gameState)

  // Initialize audio on mount
  useEffect(() => {
    soundManager.init()
    soundManager.playMusic()

    return () => {
      soundManager.pauseMusic()
    }
  }, [])

  // Update audio settings
  useEffect(() => {
    soundManager.setSoundVolume(soundVolume)
    soundManager.setMusicVolume(musicVolume)
    if (isMuted) {
      soundManager.mute()
    } else {
      soundManager.unmute()
    }
  }, [soundVolume, musicVolume, isMuted])

  // Initialize game on mount
  useEffect(() => {
    dispatch({ type: ACTIONS.NEW_GAME, startLevel })
  }, [startLevel])

  // Setup input listeners
  useEffect(() => {
    const cleanup = setupInputListeners(dispatch, ACTIONS)
    return cleanup
  }, [])

  // Handle pause key separately
  useEffect(() => {
    const handlePause = (e) => {
      // P, Escape, or Space for pause/resume
      if (e.key === 'p' || e.key === 'P' || e.key === 'Escape' || e.key === ' ') {
        // Only handle Space for pause/resume, not for hard drop
        if (e.key === ' ') {
          // Space only pauses/resumes, doesn't trigger hard drop
          if (gameState.gameStatus === 'paused') {
            e.preventDefault()
            dispatch({ type: ACTIONS.RESUME })
            soundManager.resumeMusic()
            return
          }
          // If playing, let Space do hard drop (handled in input.js)
          // Don't pause on Space during gameplay
          return
        }

        // P and Escape always pause/resume
        if (gameState.gameStatus === 'playing') {
          dispatch({ type: ACTIONS.PAUSE })
          soundManager.pauseMusic()
        } else if (gameState.gameStatus === 'paused') {
          dispatch({ type: ACTIONS.RESUME })
          soundManager.resumeMusic()
        }
      }
    }

    window.addEventListener('keydown', handlePause)
    return () => window.removeEventListener('keydown', handlePause)
  }, [gameState.gameStatus])

  // Sound effects for game events
  useEffect(() => {
    const prev = prevGameStateRef.current

    // Lines cleared
    if (gameState.lines > prev.lines) {
      const linesCleared = gameState.lines - prev.lines
      if (linesCleared === 4) {
        soundManager.play('tetris')
      } else {
        soundManager.play('lineClear')
      }
    }

    // Level up
    if (gameState.level > prev.level) {
      soundManager.play('levelUp')
    }

    // Game over - save stats
    if (gameState.gameStatus === 'gameover' && prev.gameStatus !== 'gameover') {
      soundManager.play('gameOver')
      soundManager.pauseMusic()

      // Calculate play time
      const playTime = gameState.stats.startTime
        ? Math.floor((Date.now() - gameState.stats.startTime) / 1000)
        : 0

      // Save basic stats
      updateGameStats(gameState.score, gameState.lines, gameState.level)

      // Save extended stats
      const gameData = {
        score: gameState.score,
        lines: gameState.lines,
        level: gameState.level,
        playTime,
        singleClears: gameState.stats.singleClears,
        doubleClears: gameState.stats.doubleClears,
        tripleClears: gameState.stats.tripleClears,
        tetrisClears: gameState.stats.tetrisClears,
        piecesPlaced: gameState.stats.piecesPlaced,
        hardDrops: gameState.stats.hardDrops,
        softDrops: gameState.stats.softDrops,
        holds: gameState.stats.holds,
        maxCombo: gameState.stats.maxCombo,
      }

      addGameToHistory(gameData)
      updateExtendedStats(gameData)
    }

    // Update ref
    prevGameStateRef.current = gameState
  }, [gameState.lines, gameState.level, gameState.gameStatus, gameState.stats])

  const handleRestart = () => {
    dispatch({ type: ACTIONS.NEW_GAME, startLevel })
    soundManager.resumeMusic()
  }

  const handleResume = () => {
    dispatch({ type: ACTIONS.RESUME })
    soundManager.resumeMusic()
  }

  // Save high score when it changes
  useEffect(() => {
    if (gameState.highScore > 0 && gameState.highScore !== initialHighScore) {
      saveHighScore(gameState.highScore)
      if (onHighScoreUpdate) {
        onHighScoreUpdate(gameState.highScore)
      }
    }
  }, [gameState.highScore, initialHighScore, onHighScoreUpdate])

  return (
    <div className="game-wrapper">
      <div className="game-layout">
        {/* Left sidebar */}
        <div className="sidebar left">
          <HoldPiece pieceType={gameState.heldPiece} />
          <Score score={gameState.score} />
          <Lines lines={gameState.lines} />
          <Level level={gameState.level} />
          <LiveStats stats={gameState.stats} />
        </div>

        {/* Center - Game field */}
        <div className="game-center">
          <Canvas gameState={gameState} dispatch={dispatch} />
          <Combo combo={gameState.stats.currentCombo} />
        </div>

        {/* Right sidebar */}
        <div className="sidebar right">
          <NextPiece pieceType={gameState.nextPiece} />
          <Controls />
        </div>
      </div>

      {/* Overlays */}
      {gameState.gameStatus === 'paused' && (
        <PauseMenu
          onResume={handleResume}
          onRestart={handleRestart}
          onMainMenu={onMainMenu}
        />
      )}

      {gameState.gameStatus === 'gameover' && (
        <GameOver
          score={gameState.score}
          lines={gameState.lines}
          level={gameState.level}
          highScore={gameState.highScore}
          onRestart={handleRestart}
          onMainMenu={onMainMenu}
        />
      )}

      {/* Touch controls for mobile */}
      {gameState.gameStatus === 'playing' && (
        <TouchControls dispatch={dispatch} />
      )}
    </div>
  )
}

export default Game
