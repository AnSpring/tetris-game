import { useState, useEffect } from 'react'
import { loadGameStats } from '../../utils/localStorage.js'
import './Stats.css'

function Stats({ currentScore, highScore }) {
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    totalLines: 0,
    bestLevel: 0,
    totalScore: 0,
  })

  useEffect(() => {
    const savedStats = loadGameStats()
    setStats(savedStats)
  }, [])

  const avgScore = stats.gamesPlayed > 0
    ? Math.floor(stats.totalScore / stats.gamesPlayed)
    : 0

  return (
    <div className="stats-panel">
      <div className="stats-header">YOUR STATS</div>

      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-label">HIGH SCORE</div>
          <div className="stat-number highlight">{highScore.toString().padStart(6, '0')}</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">GAMES</div>
          <div className="stat-number">{stats.gamesPlayed}</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">AVG SCORE</div>
          <div className="stat-number">{avgScore.toString().padStart(6, '0')}</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">BEST LVL</div>
          <div className="stat-number">{stats.bestLevel.toString().padStart(2, '0')}</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">TOTAL LINES</div>
          <div className="stat-number">{stats.totalLines}</div>
        </div>
      </div>

      {currentScore > highScore && (
        <div className="beating-record">
          🔥 BEATING RECORD! +{(currentScore - highScore).toString()}
        </div>
      )}
    </div>
  )
}

export default Stats
