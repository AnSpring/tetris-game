import React from 'react'

export default function Combo({ combo }) {
  if (combo <= 1) return null

  return (
    <div className="combo-display">
      <div className="combo-label">COMBO</div>
      <div className="combo-value">{combo}x</div>
    </div>
  )
}
