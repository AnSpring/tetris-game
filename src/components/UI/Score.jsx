function Score({ score }) {
  return (
    <div className="stat-display">
      <div className="stat-label">SCORE</div>
      <div className="stat-value">{score.toString().padStart(6, '0')}</div>
    </div>
  )
}

export default Score
