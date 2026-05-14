function Level({ level }) {
  return (
    <div className="stat-display">
      <div className="stat-label">LEVEL</div>
      <div className="stat-value">{level.toString().padStart(2, '0')}</div>
    </div>
  )
}

export default Level
