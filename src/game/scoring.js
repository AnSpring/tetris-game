import { SCORING } from '../config/constants.js'

// Calculate score for lines cleared
export function calculateLineScore(linesCleared, level) {
  switch (linesCleared) {
    case 1:
      return SCORING.SINGLE * level
    case 2:
      return SCORING.DOUBLE * level
    case 3:
      return SCORING.TRIPLE * level
    case 4:
      return SCORING.TETRIS * level
    default:
      return 0
  }
}

// Calculate score for soft drop
export function calculateSoftDropScore(cellsDropped) {
  return cellsDropped * SCORING.SOFT_DROP
}

// Calculate score for hard drop
export function calculateHardDropScore(cellsDropped) {
  return cellsDropped * SCORING.HARD_DROP
}

// Check if level should increase (every 10 lines)
export function shouldLevelUp(totalLines) {
  return totalLines > 0 && totalLines % 10 === 0
}

// Calculate new level based on total lines cleared
export function calculateLevel(totalLines) {
  return Math.floor(totalLines / 10) + 1
}
