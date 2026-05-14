function Lines({ lines }) {
  return (
    <div className="stat-display">
      <div className="stat-label">LINES</div>
      <div className="stat-value">{lines.toString().padStart(3, '0')}</div>
    </div>
  )
}

export default Lines
