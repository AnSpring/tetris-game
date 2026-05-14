import { DAS_DELAY, ARR } from '../config/constants.js'
import soundManager from '../audio/soundManager.js'

// Key state tracking
const keyState = {
  left: { pressed: false, time: 0, lastRepeat: 0 },
  right: { pressed: false, time: 0, lastRepeat: 0 },
  down: { pressed: false, time: 0, lastRepeat: 0 },
}

// Key mappings
export const KEY_BINDINGS = {
  // Movement
  LEFT: ['ArrowLeft', 'a', 'A'],
  RIGHT: ['ArrowRight', 'd', 'D'],
  DOWN: ['ArrowDown', 's', 'S'],

  // Rotation
  ROTATE_CW: ['ArrowUp', 'w', 'W'],
  ROTATE_CCW: ['z', 'Z', 'q', 'Q'],

  // Actions
  HARD_DROP: [' '], // Spacebar
  HOLD: ['c', 'C', 'Shift'],
  PAUSE: ['p', 'P', 'Escape'],
}

// Check if key matches an action
export function isKeyForAction(key, action) {
  return KEY_BINDINGS[action].includes(key)
}

// Initialize keyboard listeners
export function setupInputListeners(dispatch, actions) {
  const handleKeyDown = (e) => {
    const key = e.key
    const now = Date.now()

    // Prevent default for game keys
    if (Object.values(KEY_BINDINGS).flat().includes(key)) {
      e.preventDefault()
    }

    // Handle one-shot actions (no DAS)
    if (isKeyForAction(key, 'ROTATE_CW')) {
      dispatch({ type: actions.ROTATE_CW })
      soundManager.play('rotate')
      return
    }
    if (isKeyForAction(key, 'ROTATE_CCW')) {
      dispatch({ type: actions.ROTATE_CCW })
      soundManager.play('rotate')
      return
    }
    if (isKeyForAction(key, 'HARD_DROP')) {
      dispatch({ type: actions.HARD_DROP })
      soundManager.play('hardDrop')
      return
    }
    if (isKeyForAction(key, 'HOLD')) {
      dispatch({ type: actions.HOLD_PIECE })
      soundManager.play('move')
      return
    }
    if (isKeyForAction(key, 'PAUSE')) {
      dispatch({ type: actions.PAUSE })
      return
    }

    // Handle DAS actions (left/right/down)
    if (isKeyForAction(key, 'LEFT') && !keyState.left.pressed) {
      keyState.left.pressed = true
      keyState.left.time = now
      keyState.left.lastRepeat = now
      dispatch({ type: actions.MOVE_LEFT })
      soundManager.play('move')
    }
    if (isKeyForAction(key, 'RIGHT') && !keyState.right.pressed) {
      keyState.right.pressed = true
      keyState.right.time = now
      keyState.right.lastRepeat = now
      dispatch({ type: actions.MOVE_RIGHT })
      soundManager.play('move')
    }
    if (isKeyForAction(key, 'DOWN') && !keyState.down.pressed) {
      keyState.down.pressed = true
      keyState.down.time = now
      keyState.down.lastRepeat = now
      dispatch({ type: actions.MOVE_DOWN })
      soundManager.play('softDrop')
    }
  }

  const handleKeyUp = (e) => {
    const key = e.key

    // Reset DAS state
    if (isKeyForAction(key, 'LEFT')) {
      keyState.left.pressed = false
    }
    if (isKeyForAction(key, 'RIGHT')) {
      keyState.right.pressed = false
    }
    if (isKeyForAction(key, 'DOWN')) {
      keyState.down.pressed = false
    }
  }

  // Add listeners
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)

  // Return cleanup function
  return () => {
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)
  }
}

// Update DAS (call this in game loop)
export function updateDAS(dispatch, actions) {
  const now = Date.now()

  // Process left key
  if (keyState.left.pressed) {
    const elapsed = now - keyState.left.time
    if (elapsed >= DAS_DELAY) {
      const timeSinceRepeat = now - keyState.left.lastRepeat
      if (timeSinceRepeat >= ARR) {
        dispatch({ type: actions.MOVE_LEFT })
        soundManager.play('move')
        keyState.left.lastRepeat = now
      }
    }
  }

  // Process right key
  if (keyState.right.pressed) {
    const elapsed = now - keyState.right.time
    if (elapsed >= DAS_DELAY) {
      const timeSinceRepeat = now - keyState.right.lastRepeat
      if (timeSinceRepeat >= ARR) {
        dispatch({ type: actions.MOVE_RIGHT })
        soundManager.play('move')
        keyState.right.lastRepeat = now
      }
    }
  }

  // Process down key
  if (keyState.down.pressed) {
    const elapsed = now - keyState.down.time
    if (elapsed >= DAS_DELAY) {
      const timeSinceRepeat = now - keyState.down.lastRepeat
      if (timeSinceRepeat >= ARR) {
        dispatch({ type: actions.MOVE_DOWN })
        soundManager.play('softDrop')
        keyState.down.lastRepeat = now
      }
    }
  }
}

// Reset all key states (useful when pausing)
export function resetKeyStates() {
  keyState.left.pressed = false
  keyState.right.pressed = false
  keyState.down.pressed = false
}
