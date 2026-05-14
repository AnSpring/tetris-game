import { SHAPES, PIECE_TYPES } from '../config/constants.js'

// Create a piece object
export function createPiece(type, x = 3, y = 0, rotation = 0) {
  return {
    type,
    x,
    y,
    rotation,
    shape: SHAPES[type][rotation],
  }
}

// Rotate piece clockwise
export function rotatePieceCW(piece) {
  const newRotation = (piece.rotation + 1) % 4
  return {
    ...piece,
    rotation: newRotation,
    shape: SHAPES[piece.type][newRotation],
  }
}

// Rotate piece counter-clockwise
export function rotatePieceCCW(piece) {
  const newRotation = (piece.rotation + 3) % 4 // +3 is same as -1 mod 4
  return {
    ...piece,
    rotation: newRotation,
    shape: SHAPES[piece.type][newRotation],
  }
}

// Get a random piece type
export function getRandomPieceType() {
  return PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)]
}

// 7-bag randomizer implementation
let currentBag = []

export function getNextPieceFromBag() {
  if (currentBag.length === 0) {
    // Create new bag with all 7 pieces
    currentBag = [...PIECE_TYPES]
    // Shuffle the bag (Fisher-Yates)
    for (let i = currentBag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[currentBag[i], currentBag[j]] = [currentBag[j], currentBag[i]]
    }
  }
  return currentBag.pop()
}

// Reset the bag (for new game)
export function resetBag() {
  currentBag = []
}

// Spawn a new piece at the top center of the field
export function spawnPiece(type) {
  // I-piece spawns at x=3, others at x=3 (centered for 10-width field)
  const x = type === 'I' ? 3 : 3
  const y = 0
  return createPiece(type, x, y, 0)
}
