import './Controls.css'

function Controls() {
  return (
    <div className="controls-display">
      <h3>CONTROLS</h3>
      <div className="controls-grid">
        <div className="control-hint">
          <span className="key">← →</span>
          <span className="action">Move</span>
        </div>
        <div className="control-hint">
          <span className="key">↑</span>
          <span className="action">Rotate</span>
        </div>
        <div className="control-hint">
          <span className="key">↓</span>
          <span className="action">Soft Drop</span>
        </div>
        <div className="control-hint">
          <span className="key">SPC</span>
          <span className="action">Hard Drop</span>
        </div>
        <div className="control-hint">
          <span className="key">C</span>
          <span className="action">Hold</span>
        </div>
        <div className="control-hint">
          <span className="key">P / ESC</span>
          <span className="action">Pause</span>
        </div>
      </div>
    </div>
  )
}

export default Controls
