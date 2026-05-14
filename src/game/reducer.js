import { FIELD_WIDTH, FIELD_HEIGHT } from '../config/constants.js'
import { createEmptyField, lockPieceInField, findCompletedLines, clearLines, calculateGhostPosition } from './field.js'
import { spawnPiece, getNextPieceFromBag, resetBag, rotatePieceCW, rotatePieceCCW } from './pieces.js'
import { tryMoveLeft, tryMoveRight, tryMoveDown, tryRotate, canSpawn } from './physics.js'
import { calculateLineScore, calculateSoftDropScore, calculateHardDropScore, calculateLevel } from './scoring.js'

// Initial state structure
export const initialState = {
  field: createEmptyField(),
  currentPiece: null,
  nextPiece: null,
  heldPiece: null,
  canHold: true,
  score: 0,
  lines: 0,
  level: 1,
  gameStatus: 'menu', // 'menu', 'playing', 'paused', 'gameover'
  highScore: 0,
  clearingLines: [], // Lines being cleared (for animation)
  flashFrames: 0, // Frame counter for flash effects
  levelUpFlash: 0, // Level up flash intensity (0-1)
  // Extended stats tracking
  stats: {
    singleClears: 0,
    doubleClears: 0,
    tripleClears: 0,
    tetrisClears: 0,
    piecesPlaced: 0,
    hardDrops: 0,
    softDrops: 0,
    holds: 0,
    maxCombo: 0,
    currentCombo: 0,
    startTime: null,
  },
}

// Action types
export const ACTIONS = {
  MOVE_LEFT: 'MOVE_LEFT',
  MOVE_RIGHT: 'MOVE_RIGHT',
  MOVE_DOWN: 'MOVE_DOWN',
  ROTATE_CW: 'ROTATE_CW',
  ROTATE_CCW: 'ROTATE_CCW',
  HARD_DROP: 'HARD_DROP',
  HOLD_PIECE: 'HOLD_PIECE',
  TICK: 'TICK',
  LOCK_PIECE: 'LOCK_PIECE',
  CLEAR_LINES: 'CLEAR_LINES',
  LEVEL_UP: 'LEVEL_UP',
  GAME_OVER: 'GAME_OVER',
  PAUSE: 'PAUSE',
  RESUME: 'RESUME',
  NEW_GAME: 'NEW_GAME',
}

// Game reducer
export function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.NEW_GAME: {
      resetBag()
      const firstPiece = spawnPiece(getNextPieceFromBag())
      const secondPiece = getNextPieceFromBag()
      return {
        ...initialState,
        currentPiece: firstPiece,
        nextPiece: secondPiece,
        highScore: state.highScore,
        gameStatus: 'playing',
        level: action.startLevel || 1,
        stats: {
          ...initialState.stats,
          startTime: Date.now(),
        },
      }
    }

    case ACTIONS.MOVE_LEFT: {
      if (!state.currentPiece || state.gameStatus !== 'playing') return state
      return {
        ...state,
        currentPiece: tryMoveLeft(state.field, state.currentPiece),
      }
    }

    case ACTIONS.MOVE_RIGHT: {
      if (!state.currentPiece || state.gameStatus !== 'playing') return state
      return {
        ...state,
        currentPiece: tryMoveRight(state.field, state.currentPiece),
      }
    }

    case ACTIONS.MOVE_DOWN: {
      if (!state.currentPiece || state.gameStatus !== 'playing') return state
      const movedPiece = tryMoveDown(state.field, state.currentPiece)

      // If piece moved, award soft drop point
      if (movedPiece.y !== state.currentPiece.y) {
        return {
          ...state,
          currentPiece: movedPiece,
          score: state.score + calculateSoftDropScore(1),
          stats: {
            ...state.stats,
            softDrops: state.stats.softDrops + 1,
          },
        }
      }

      // If piece didn't move, lock it
      return gameReducer(state, { type: ACTIONS.LOCK_PIECE })
    }

    case ACTIONS.ROTATE_CW: {
      if (!state.currentPiece || state.gameStatus !== 'playing') return state
      const rotatedPiece = rotatePieceCW(state.currentPiece)
      return {
        ...state,
        currentPiece: tryRotate(state.field, state.currentPiece, rotatedPiece),
      }
    }

    case ACTIONS.ROTATE_CCW: {
      if (!state.currentPiece || state.gameStatus !== 'playing') return state
      const rotatedPiece = rotatePieceCCW(state.currentPiece)
      return {
        ...state,
        currentPiece: tryRotate(state.field, state.currentPiece, rotatedPiece),
      }
    }

    case ACTIONS.HARD_DROP: {
      if (!state.currentPiece || state.gameStatus !== 'playing') return state
      const ghostY = calculateGhostPosition(state.field, state.currentPiece)
      const dropDistance = ghostY - state.currentPiece.y
      const droppedPiece = { ...state.currentPiece, y: ghostY }

      // Lock the piece and award hard drop points
      const newState = {
        ...state,
        currentPiece: droppedPiece,
        score: state.score + calculateHardDropScore(dropDistance),
        stats: {
          ...state.stats,
          hardDrops: state.stats.hardDrops + 1,
        },
      }
      return gameReducer(newState, { type: ACTIONS.LOCK_PIECE })
    }

    case ACTIONS.HOLD_PIECE: {
      if (!state.currentPiece || !state.canHold || state.gameStatus !== 'playing') return state

      if (state.heldPiece === null) {
        // First hold - store current, spawn next
        const newPiece = spawnPiece(state.nextPiece)
        const newNext = getNextPieceFromBag()
        return {
          ...state,
          heldPiece: state.currentPiece.type,
          currentPiece: newPiece,
          nextPiece: newNext,
          canHold: false,
          stats: {
            ...state.stats,
            holds: state.stats.holds + 1,
          },
        }
      } else {
        // Swap with held piece
        const newPiece = spawnPiece(state.heldPiece)
        return {
          ...state,
          heldPiece: state.currentPiece.type,
          currentPiece: newPiece,
          canHold: false,
          stats: {
            ...state.stats,
            holds: state.stats.holds + 1,
          },
        }
      }
    }

    case ACTIONS.TICK: {
      if (!state.currentPiece || state.gameStatus !== 'playing') return state
      const movedPiece = tryMoveDown(state.field, state.currentPiece)

      if (movedPiece.y === state.currentPiece.y) {
        // Piece hit bottom, lock it
        return gameReducer(state, { type: ACTIONS.LOCK_PIECE })
      }

      return {
        ...state,
        currentPiece: movedPiece,
      }
    }

    case ACTIONS.LOCK_PIECE: {
      if (!state.currentPiece) return state

      // Lock piece into field
      const newField = lockPieceInField(state.field, state.currentPiece)

      // Check for completed lines
      const completedLines = findCompletedLines(newField)

      let newScore = state.score
      let newLines = state.lines
      let newLevel = state.level
      let clearedField = newField
      let newStats = {
        ...state.stats,
        piecesPlaced: state.stats.piecesPlaced + 1,
      }

      if (completedLines.length > 0) {
        // Clear lines and update score
        clearedField = clearLines(newField, completedLines)
        newScore += calculateLineScore(completedLines.length, state.level)
        newLines += completedLines.length

        // Check for level up (every 10 lines)
        newLevel = calculateLevel(newLines)

        // Update line clear statistics
        switch (completedLines.length) {
          case 1:
            newStats.singleClears += 1
            break
          case 2:
            newStats.doubleClears += 1
            break
          case 3:
            newStats.tripleClears += 1
            break
          case 4:
            newStats.tetrisClears += 1
            break
        }

        // Update combo
        newStats.currentCombo = state.stats.currentCombo + 1
        newStats.maxCombo = Math.max(newStats.maxCombo, newStats.currentCombo)
      } else {
        // Reset combo if no lines cleared
        newStats.currentCombo = 0
      }

      // Spawn next piece
      const newPiece = spawnPiece(state.nextPiece)
      const newNext = getNextPieceFromBag()

      // Check if new piece can spawn (game over check)
      if (!canSpawn(clearedField, newPiece)) {
        return {
          ...state,
          field: clearedField,
          currentPiece: null,
          score: newScore,
          lines: newLines,
          level: newLevel,
          gameStatus: 'gameover',
          highScore: Math.max(state.highScore, newScore),
          stats: newStats,
        }
      }

      return {
        ...state,
        field: clearedField,
        currentPiece: newPiece,
        nextPiece: newNext,
        canHold: true,
        score: newScore,
        lines: newLines,
        level: newLevel,
        stats: newStats,
      }
    }

    case ACTIONS.CLEAR_LINES: {
      // This action is handled within LOCK_PIECE
      return state
    }

    case ACTIONS.LEVEL_UP: {
      // Level up is handled within LOCK_PIECE based on lines cleared
      return state
    }

    case ACTIONS.GAME_OVER: {
      return {
        ...state,
        gameStatus: 'gameover',
        highScore: Math.max(state.highScore, state.score),
      }
    }

    case ACTIONS.PAUSE: {
      if (state.gameStatus === 'playing') {
        return { ...state, gameStatus: 'paused' }
      }
      return state
    }

    case ACTIONS.RESUME: {
      if (state.gameStatus === 'paused') {
        return { ...state, gameStatus: 'playing' }
      }
      return state
    }

    default:
      return state
  }
}
