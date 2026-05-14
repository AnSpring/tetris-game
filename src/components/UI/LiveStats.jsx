import React from 'react'
import './LiveStats.css'

export default function LiveStats({ stats }) {
  return (
    <div className="live-stats">
      <div className="live-stats-title">SESSION</div>
      <div className="live-stats-grid">
        <div className="live-stat-item">
          <span className="live-stat-label">Pieces</span>
          <span className="live-stat-value">{stats.piecesPlaced}</span>
        </div>
        <div className="live-stat-item">
          <span className="live-stat-label">Single</span>
          <span className="live-stat-value">{stats.singleClears}</span>
        </div>
        <div className="live-stat-item">
          <span className="live-stat-label">Double</span>
          <span className="live-stat-value">{stats.doubleClears}</span>
        </div>
        <div className="live-stat-item">
          <span className="live-stat-label">Triple</span>
          <span className="live-stat-value">{stats.tripleClears}</span>
        </div>
        <div className="live-stat-item highlight">
          <span className="live-stat-label">Tetris</span>
          <span className="live-stat-value">{stats.tetrisClears}</span>
        </div>
        <div className="live-stat-item combo">
          <span className="live-stat-label">Combo</span>
          <span className="live-stat-value">{stats.currentCombo}x</span>
        </div>
      </div>
    </div>
  )
}
