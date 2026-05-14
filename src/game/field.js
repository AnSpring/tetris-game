import { FIELD_WIDTH, FIELD_HEIGHT } from '../config/constants.js'

// Create empty field
export function createEmptyField() {
  return Array(FIELD_HEIGHT).fill(null).map(() => Array(FIELD_WIDTH).fill(0))
}

// Check if a cell is empty
export function isCellEmpty(field, x, y) {
  if (y < 0 || y >= FIELD_HEIGHT || x < 0 || x >= FIELD_WIDTH) {
    return false // Out of bounds
  }
  return field[y][x] === 0
}

// Lock piece into field
export function lockPieceInField(field, piece) {
  const newField = field.map(row => [...row])

  piece.shape.forEach((row, dy) => {
    row.forEach((cell, dx) => {
      if (cell) {
        const fieldY = piece.y + dy
        const fieldX = piece.x + dx
        if (fieldY >= 0 && fieldY < FIELD_HEIGHT && fieldX >= 0 && fieldX < FIELD_WIDTH) {
          newField[fieldY][fieldX] = piece.type
        }
      }
    })
  })

  return newField
}

// Find completed lines
export function findCompletedLines(field) {
  const completedLines = []

  field.forEach((row, y) => {
    if (row.every(cell => cell !== 0)) {
      completedLines.push(y)
    }
  })

  return completedLines
}

// Clear lines and drop rows above
export function clearLines(field, linesToClear) {
  if (linesToClear.length === 0) {
    return field
  }

  // Remove completed lines
  const newField = field.filter((_, y) => !linesToClear.includes(y))

  // Add empty rows at the top
  const emptyRows = linesToClear.length
  for (let i = 0; i < emptyRows; i++) {
    newField.unshift(Array(FIELD_WIDTH).fill(0))
  }

  return newField
}

// Calculate ghost piece position (where piece would land with hard drop)
export function calculateGhostPosition(field, piece) {
  let ghostY = piece.y

  // Keep moving down until collision
  while (!checkCollision(field, { ...piece, y: ghostY + 1 })) {
    ghostY++
  }

  return ghostY
}

// Check if piece collides with field or boundaries
export function checkCollision(field, piece) {
  for (let dy = 0; dy < piece.shape.length; dy++) {
    for (let dx = 0; dx < piece.shape[dy].length; dx++) {
      if (piece.shape[dy][dx]) {
        const fieldX = piece.x + dx
        const fieldY = piece.y + dy

        // Check boundaries
        if (fieldX < 0 || fieldX >= FIELD_WIDTH || fieldY >= FIELD_HEIGHT) {
          return true
        }

        // Check collision with locked pieces (ignore if above field)
        if (fieldY >= 0 && field[fieldY][fieldX] !== 0) {
          return true
        }
      }
    }
  }

  return false
}
