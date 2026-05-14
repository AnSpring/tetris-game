import { ACTIONS } from '../game/reducer.js'
import soundManager from '../audio/soundManager.js'
import './TouchControls.css'

function TouchControls({ dispatch }) {
  const handleButton = (action) => {
    dispatch({ type: action })

    // Play appropriate sound
    switch (action) {
      case ACTIONS.MOVE_LEFT:
      case ACTIONS.MOVE_RIGHT:
        soundManager.play('move')
        break
      case ACTIONS.MOVE_DOWN:
        soundManager.play('softDrop')
        break
      case ACTIONS.ROTATE_CW:
      case ACTIONS.ROTATE_CCW:
        soundManager.play('rotate')
        break
      case ACTIONS.HARD_DROP:
        soundManager.play('hardDrop')
        break
      case ACTIONS.HOLD_PIECE:
        soundManager.play('move')
        break
    }
  }

  return (
    <div className="touch-controls">
      {/* Left side - Movement */}
      <div className="touch-left">
        <div className="touch-dpad">
          <button
            className="touch-btn touch-up"
            onTouchStart={() => handleButton(ACTIONS.ROTATE_CW)}
          >
            ↑
          </button>
          <div className="touch-row">
            <button
              className="touch-btn touch-left"
              onTouchStart={() => handleButton(ACTIONS.MOVE_LEFT)}
            >
              ←
            </button>
            <button
              className="touch-btn touch-down"
              onTouchStart={() => handleButton(ACTIONS.MOVE_DOWN)}
            >
              ↓
            </button>
            <button
              className="touch-btn touch-right"
              onTouchStart={() => handleButton(ACTIONS.MOVE_RIGHT)}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="touch-right">
        <button
          className="touch-btn touch-action"
          onTouchStart={() => handleButton(ACTIONS.ROTATE_CCW)}
        >
          ⟲
        </button>
        <button
          className="touch-btn touch-action"
          onTouchStart={() => handleButton(ACTIONS.HARD_DROP)}
        >
          DROP
        </button>
        <button
          className="touch-btn touch-action"
          onTouchStart={() => handleButton(ACTIONS.HOLD_PIECE)}
        >
          HOLD
        </button>
      </div>
    </div>
  )
}

export default TouchControls
