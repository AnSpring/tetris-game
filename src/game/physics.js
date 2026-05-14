import { checkCollision } from './field.js'

// Try to move piece left
export function tryMoveLeft(field, piece) {
  const newPiece = { ...piece, x: piece.x - 1 }
  if (!checkCollision(field, newPiece)) {
    return newPiece
  }
  return piece
}

// Try to move piece right
export function tryMoveRight(field, piece) {
  const newPiece = { ...piece, x: piece.x + 1 }
  if (!checkCollision(field, newPiece)) {
    return newPiece
  }
  return piece
}

// Try to move piece down
export function tryMoveDown(field, piece) {
  const newPiece = { ...piece, y: piece.y + 1 }
  if (!checkCollision(field, newPiece)) {
    return newPiece
  }
  return piece
}

// Try to rotate piece (with wall kick if needed)
export function tryRotate(field, piece, rotatedPiece) {
  // Try basic rotation
  if (!checkCollision(field, rotatedPiece)) {
    return rotatedPiece
  }

  // Try wall kicks (simple implementation)
  const kicks = [
    { x: -1, y: 0 }, // Left
    { x: 1, y: 0 },  // Right
    { x: 0, y: -1 }, // Up
    { x: -2, y: 0 }, // Left 2
    { x: 2, y: 0 },  // Right 2
  ]

  for (const kick of kicks) {
    const kickedPiece = {
      ...rotatedPiece,
      x: rotatedPiece.x + kick.x,
      y: rotatedPiece.y + kick.y,
    }
    if (!checkCollision(field, kickedPiece)) {
      return kickedPiece
    }
  }

  // Rotation failed
  return piece
}

// Check if piece can spawn (for game over detection)
export function canSpawn(field, piece) {
  return !checkCollision(field, piece)
}
