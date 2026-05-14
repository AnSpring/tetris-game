import { useEffect, useRef } from 'react'
import { render } from '../game/renderer.js'
import { updateDAS } from '../game/input.js'
import { FIELD_WIDTH, FIELD_HEIGHT, BLOCK_SIZE, getGravitySpeed } from '../config/constants.js'
import { ACTIONS } from '../game/reducer.js'

function Canvas({ gameState, dispatch }) {
  const canvasRef = useRef(null)
  const gameLoopRef = useRef(null)
  const lastTimeRef = useRef(0)
  const accumulatorRef = useRef(0)
  const gravityTimerRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    // Set canvas size
    canvas.width = FIELD_WIDTH * BLOCK_SIZE
    canvas.height = FIELD_HEIGHT * BLOCK_SIZE

    const TICK_RATE = 1000 / 60 // 60 FPS

    const gameLoop = (currentTime) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime
      }

      const deltaTime = currentTime - lastTimeRef.current
      lastTimeRef.current = currentTime
      accumulatorRef.current += deltaTime

      // Fixed timestep updates
      while (accumulatorRef.current >= TICK_RATE) {
        // Update DAS (Delayed Auto Shift)
        if (gameState.gameStatus === 'playing') {
          updateDAS(dispatch, ACTIONS)
        }

        // Update gravity timer
        if (gameState.gameStatus === 'playing' && gameState.currentPiece) {
          gravityTimerRef.current += TICK_RATE
          const gravitySpeed = getGravitySpeed(gameState.level)

          if (gravityTimerRef.current >= gravitySpeed) {
            dispatch({ type: ACTIONS.TICK })
            gravityTimerRef.current = 0
          }
        }

        accumulatorRef.current -= TICK_RATE
      }

      // Render
      render(ctx, gameState)

      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    // Start game loop
    gameLoopRef.current = requestAnimationFrame(gameLoop)

    // Cleanup
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameState, dispatch])

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: '3px solid #00ffff',
        imageRendering: 'pixelated',
        boxShadow: '0 0 15px rgba(0, 255, 255, 0.4), inset 0 0 10px rgba(0, 255, 255, 0.05)',
      }}
    />
  )
}

export default Canvas
