import { FIELD_WIDTH, FIELD_HEIGHT, BLOCK_SIZE, COLORS, SHAPES } from '../config/constants.js'
import { calculateGhostPosition } from './field.js'

// Render the entire game state
export function render(ctx, gameState) {
  // Clear canvas
  ctx.fillStyle = '#0a0a0a'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  // Render field background and grid
  renderFieldBackground(ctx)

  // Render locked pieces
  renderField(ctx, gameState.field, gameState.clearingLines, gameState.flashFrames)

  // Render ghost piece (if current piece exists)
  if (gameState.currentPiece) {
    renderGhostPiece(ctx, gameState.field, gameState.currentPiece)
  }

  // Render current piece
  if (gameState.currentPiece) {
    renderPiece(ctx, gameState.currentPiece)
  }

  // Level up flash effect
  if (gameState.levelUpFlash && gameState.levelUpFlash > 0) {
    ctx.fillStyle = `rgba(255, 255, 255, ${gameState.levelUpFlash * 0.3})`
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }
}

// Render field background with grid
export function renderFieldBackground(ctx) {
  // Draw background
  ctx.fillStyle = COLORS.EMPTY
  ctx.fillRect(0, 0, FIELD_WIDTH * BLOCK_SIZE, FIELD_HEIGHT * BLOCK_SIZE)

  // Draw subtle grid lines without glow
  ctx.strokeStyle = COLORS.GRID
  ctx.lineWidth = 1
  ctx.shadowBlur = 0

  // Vertical lines
  for (let x = 0; x <= FIELD_WIDTH; x++) {
    ctx.beginPath()
    ctx.moveTo(x * BLOCK_SIZE, 0)
    ctx.lineTo(x * BLOCK_SIZE, FIELD_HEIGHT * BLOCK_SIZE)
    ctx.stroke()
  }

  // Horizontal lines
  for (let y = 0; y <= FIELD_HEIGHT; y++) {
    ctx.beginPath()
    ctx.moveTo(0, y * BLOCK_SIZE)
    ctx.lineTo(FIELD_WIDTH * BLOCK_SIZE, y * BLOCK_SIZE)
    ctx.stroke()
  }

  // Reset shadow
  ctx.shadowBlur = 0
}

// Render locked pieces in the field
export function renderField(ctx, field, clearingLines = [], flashFrames = 0) {
  field.forEach((row, y) => {
    // Check if this line is being cleared
    const isClearing = clearingLines.includes(y)

    row.forEach((cell, x) => {
      if (cell !== 0) {
        if (isClearing && flashFrames % 2 === 0) {
          // Flash effect: alternate between white and normal color
          renderBlock(ctx, x, y, '#ffffff')
        } else {
          renderBlock(ctx, x, y, COLORS[cell])
        }
      }
    })
  })
}

// Render active piece
export function renderPiece(ctx, piece) {
  piece.shape.forEach((row, dy) => {
    row.forEach((cell, dx) => {
      if (cell) {
        const x = piece.x + dx
        const y = piece.y + dy
        if (y >= 0) { // Only render if visible
          renderBlock(ctx, x, y, COLORS[piece.type])
        }
      }
    })
  })
}

// Render ghost piece (outline only, 30% opacity)
export function renderGhostPiece(ctx, field, piece) {
  const ghostY = calculateGhostPosition(field, piece)

  piece.shape.forEach((row, dy) => {
    row.forEach((cell, dx) => {
      if (cell) {
        const x = piece.x + dx
        const y = ghostY + dy
        if (y >= 0) { // Only render if visible
          renderGhostBlock(ctx, x, y, COLORS[piece.type])
        }
      }
    })
  })
}

// Render a single block with border (30x30px, 2-3px border)
export function renderBlock(ctx, x, y, color) {
  const pixelX = x * BLOCK_SIZE
  const pixelY = y * BLOCK_SIZE

  // Subtle neon glow effect
  ctx.shadowBlur = 8
  ctx.shadowColor = color

  // Inner fill
  ctx.fillStyle = color
  ctx.fillRect(pixelX + 3, pixelY + 3, BLOCK_SIZE - 6, BLOCK_SIZE - 6)

  // Outer glow layer (more subtle)
  ctx.shadowBlur = 12
  ctx.globalAlpha = 0.4
  ctx.fillStyle = color
  ctx.fillRect(pixelX + 1, pixelY + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2)
  ctx.globalAlpha = 1.0

  // Border with subtle glow
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  ctx.shadowBlur = 6
  ctx.strokeRect(pixelX, pixelY, BLOCK_SIZE, BLOCK_SIZE)

  // Reset shadow
  ctx.shadowBlur = 0
}

// Render ghost block (outline only, 30% opacity)
export function renderGhostBlock(ctx, x, y, color) {
  const pixelX = x * BLOCK_SIZE
  const pixelY = y * BLOCK_SIZE

  // Subtle ghost outline with glow
  ctx.shadowBlur = 5
  ctx.shadowColor = color
  ctx.strokeStyle = color
  ctx.globalAlpha = 0.3
  ctx.lineWidth = 2
  ctx.strokeRect(pixelX + 2, pixelY + 2, BLOCK_SIZE - 4, BLOCK_SIZE - 4)
  ctx.globalAlpha = 1.0
  ctx.shadowBlur = 0
}

// Darken a color by a factor
function darkenColor(color, factor) {
  // Parse hex color
  const r = parseInt(color.slice(1, 3), 16)
  const g = parseInt(color.slice(3, 5), 16)
  const b = parseInt(color.slice(5, 7), 16)

  // Darken
  const newR = Math.floor(r * (1 - factor))
  const newG = Math.floor(g * (1 - factor))
  const newB = Math.floor(b * (1 - factor))

  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
}

// Render small piece preview (for next/hold piece)
export function renderPiecePreview(ctx, pieceType, x, y, scale = 0.8) {
  if (!pieceType) return

  const shape = SHAPES[pieceType][0] // Always use rotation 0 for preview

  const previewBlockSize = BLOCK_SIZE * scale

  shape.forEach((row, dy) => {
    row.forEach((cell, dx) => {
      if (cell) {
        const pixelX = x + dx * previewBlockSize
        const pixelY = y + dy * previewBlockSize

        // Fill
        ctx.fillStyle = COLORS[pieceType]
        ctx.fillRect(pixelX, pixelY, previewBlockSize, previewBlockSize)

        // Border
        ctx.strokeStyle = darkenColor(COLORS[pieceType], 0.3)
        ctx.lineWidth = 2
        ctx.strokeRect(pixelX, pixelY, previewBlockSize, previewBlockSize)
      }
    })
  })
}
