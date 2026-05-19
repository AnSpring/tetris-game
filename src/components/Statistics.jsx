import React, { useState, useEffect } from 'react'
import {
  getStatsSummary,
  resetExtendedStats,
  formatTime,
  formatDate,
} from '../utils/extendedStats'
import './Statistics.css'

export default function Statistics({ onBack }) {
  const [stats, setStats] = useState(null)
  const [showConfirmReset, setShowConfirmReset] = useState(false)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = () => {
    const summary = getStatsSummary()
    setStats(summary)
  }

  const handleReset = () => {
    if (resetExtendedStats()) {
      loadStats()
      setShowConfirmReset(false)
    }
  }

  if (!stats) {
    return <div className="statistics">Loading...</div>
  }

  const totalClears = stats.singleClears + stats.doubleClears + stats.tripleClears + stats.tetrisClears

  return (
    <div className="statistics">
      <div className="statistics-header">
        <button className="back-button" onClick={onBack}>
          <span style={{ fontSize: '16px' }}>←</span> Back
        </button>
        <h1 className="statistics-title">Extended Statistics</h1>
        <button
          className="reset-button"
          onClick={() => setShowConfirmReset(true)}
        >
          Reset
        </button>
      </div>

      {showConfirmReset && (
        <div className="confirm-modal">
          <div className="confirm-content">
            <h2>Reset All Statistics?</h2>
            <p>This will permanently delete all your game history and statistics.</p>
            <div className="confirm-buttons">
              <button className="confirm-yes" onClick={handleReset}>
                Yes, Reset
              </button>
              <button className="confirm-no" onClick={() => setShowConfirmReset(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="stats-grid">
        {/* Games Overview */}
        <div className="stat-card">
          <h2 className="stat-card-title">Games Overview</h2>
          <div className="stat-row">
            <span className="stat-label">Total Games</span>
            <span className="stat-value">{stats.totalGames}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Average Score</span>
            <span className="stat-value">{stats.averageScore.toLocaleString()}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Total Lines</span>
            <span className="stat-value">{stats.totalLinesCleared}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Pieces Placed</span>
            <span className="stat-value">{stats.piecesPlaced}</span>
          </div>
        </div>

        {/* Line Clears */}
        <div className="stat-card">
          <h2 className="stat-card-title">Line Clears</h2>
          <div className="stat-row">
            <span className="stat-label">Single</span>
            <span className="stat-value">{stats.singleClears}</span>
            <span className="stat-percent">
              {totalClears > 0 ? ((stats.singleClears / totalClears) * 100).toFixed(1) : 0}%
            </span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Double</span>
            <span className="stat-value">{stats.doubleClears}</span>
            <span className="stat-percent">
              {totalClears > 0 ? ((stats.doubleClears / totalClears) * 100).toFixed(1) : 0}%
            </span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Triple</span>
            <span className="stat-value">{stats.tripleClears}</span>
            <span className="stat-percent">
              {totalClears > 0 ? ((stats.tripleClears / totalClears) * 100).toFixed(1) : 0}%
            </span>
          </div>
          <div className="stat-row highlight">
            <span className="stat-label">Tetris</span>
            <span className="stat-value">{stats.tetrisClears}</span>
            <span className="stat-percent">
              {totalClears > 0 ? ((stats.tetrisClears / totalClears) * 100).toFixed(1) : 0}%
            </span>
          </div>
          <div className="stat-row summary">
            <span className="stat-label">Tetris Efficiency</span>
            <span className="stat-value">{stats.tetrisPercentage}%</span>
          </div>
        </div>

        {/* Time Statistics */}
        <div className="stat-card">
          <h2 className="stat-card-title">Time Statistics</h2>
          <div className="stat-row">
            <span className="stat-label">Total Play Time</span>
            <span className="stat-value">{formatTime(stats.totalPlayTime)}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Longest Game</span>
            <span className="stat-value">{formatTime(stats.longestGame)}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Average Game</span>
            <span className="stat-value">{formatTime(stats.averageGameTime)}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Current Streak</span>
            <span className="stat-value">{stats.currentStreak} days</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Longest Streak</span>
            <span className="stat-value">{stats.longestStreak} days</span>
          </div>
        </div>

        {/* Actions */}
        <div className="stat-card">
          <h2 className="stat-card-title">Actions</h2>
          <div className="stat-row">
            <span className="stat-label">Hard Drops</span>
            <span className="stat-value">{stats.hardDrops}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Soft Drops</span>
            <span className="stat-value">{stats.softDrops}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Holds</span>
            <span className="stat-value">{stats.holds}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Highest Combo</span>
            <span className="stat-value">{stats.highestCombo}</span>
          </div>
        </div>
      </div>

      {/* Recent Games History */}
      {stats.history && stats.history.length > 0 && (
        <div className="history-section">
          <h2 className="history-title">Recent Games</h2>
          <div className="history-table">
            <div className="history-header">
              <span>Date</span>
              <span>Score</span>
              <span>Lines</span>
              <span>Level</span>
              <span>Time</span>
            </div>
            {stats.history.map((game, index) => (
              <div key={game.timestamp || index} className="history-row">
                <span className="history-date">{formatDate(game.timestamp)}</span>
                <span className="history-score">{game.score?.toLocaleString() || 0}</span>
                <span className="history-lines">{game.lines || 0}</span>
                <span className="history-level">{game.level || 1}</span>
                <span className="history-time">{formatTime(game.playTime || 0)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
