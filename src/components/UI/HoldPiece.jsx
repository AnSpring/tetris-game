import { useEffect, useRef } from 'react'
import { renderPiecePreview } from '../../game/renderer.js'
import './styles.css'

function HoldPiece({ pieceType }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    // Clear canvas
    ctx.fillStyle = '#111'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Render piece preview
    if (pieceType) {
      renderPiecePreview(ctx, pieceType, 10, 10, 0.7)
    }
  }, [pieceType])

  return (
    <div>
      <div className="preview-label">HOLD</div>
      <div className="preview-box">
        <canvas ref={canvasRef} width="100" height="100" />
      </div>
    </div>
  )
}

export default HoldPiece
