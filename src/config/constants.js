// Game field dimensions
export const FIELD_WIDTH = 10
export const FIELD_HEIGHT = 20
export const BLOCK_SIZE = 30

// Tetromino colors (Neon Cyberpunk palette)
export const COLORS = {
  I: '#00ffff', // Neon Cyan
  O: '#ffff00', // Neon Yellow
  T: '#ff00ff', // Neon Magenta
  S: '#00ff00', // Neon Green
  Z: '#ff0080', // Neon Pink
  J: '#0080ff', // Neon Blue
  L: '#ff8000', // Neon Orange
  EMPTY: '#0a0a0a', // Deep black
  GRID: '#333344', // Dark gray-blue grid (subtle)
  GLOW: 'rgba(255, 0, 255, 0.5)', // Glow color
}

// Tetromino shapes as 2D arrays (4 rotation states each)
export const SHAPES = {
  I: [
    [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]],
    [[0,0,1,0], [0,0,1,0], [0,0,1,0], [0,0,1,0]],
    [[0,0,0,0], [0,0,0,0], [1,1,1,1], [0,0,0,0]],
    [[0,1,0,0], [0,1,0,0], [0,1,0,0], [0,1,0,0]],
  ],
  O: [
    [[1,1], [1,1]],
    [[1,1], [1,1]],
    [[1,1], [1,1]],
    [[1,1], [1,1]],
  ],
  T: [
    [[0,1,0], [1,1,1], [0,0,0]],
    [[0,1,0], [0,1,1], [0,1,0]],
    [[0,0,0], [1,1,1], [0,1,0]],
    [[0,1,0], [1,1,0], [0,1,0]],
  ],
  S: [
    [[0,1,1], [1,1,0], [0,0,0]],
    [[0,1,0], [0,1,1], [0,0,1]],
    [[0,0,0], [0,1,1], [1,1,0]],
    [[1,0,0], [1,1,0], [0,1,0]],
  ],
  Z: [
    [[1,1,0], [0,1,1], [0,0,0]],
    [[0,0,1], [0,1,1], [0,1,0]],
    [[0,0,0], [1,1,0], [0,1,1]],
    [[0,1,0], [1,1,0], [1,0,0]],
  ],
  J: [
    [[1,0,0], [1,1,1], [0,0,0]],
    [[0,1,1], [0,1,0], [0,1,0]],
    [[0,0,0], [1,1,1], [0,0,1]],
    [[0,1,0], [0,1,0], [1,1,0]],
  ],
  L: [
    [[0,0,1], [1,1,1], [0,0,0]],
    [[0,1,0], [0,1,0], [0,1,1]],
    [[0,0,0], [1,1,1], [1,0,0]],
    [[1,1,0], [0,1,0], [0,1,0]],
  ],
}

export const PIECE_TYPES = ['I', 'O', 'T', 'S', 'Z', 'J', 'L']

// Level speed configurations (gravity delay in ms)
export const LEVEL_SPEEDS = {
  1: 1000,
  2: 900,
  3: 800,
  4: 700,
  5: 600,
  6: 500,
  7: 400,
  8: 300,
  9: 200,
  10: 150,
  11: 130,
  12: 110,
  13: 90,
  14: 80,
  15: 70,
}

// Default gravity speed for levels beyond defined
export const getGravitySpeed = (level) => {
  if (level <= 15) return LEVEL_SPEEDS[level]
  return Math.max(50, 70 - (level - 15) * 2) // Continues to decrease, min 50ms
}

// DAS (Delayed Auto Shift) constants
export const DAS_DELAY = 170 // Initial delay before auto-repeat (ms)
export const ARR = 30 // Auto Repeat Rate - delay between repeats (ms)

// Scoring constants (line clear multipliers)
export const SCORING = {
  SINGLE: 40,    // 1 line × level
  DOUBLE: 100,   // 2 lines × level
  TRIPLE: 300,   // 3 lines × level
  TETRIS: 1200,  // 4 lines × level
  SOFT_DROP: 1,  // Per cell
  HARD_DROP: 2,  // Per cell
}
