import './GameOver.css'

function GameOver({ score, lines, level, highScore, onRestart, onMainMenu }) {
  const isNewHighScore = score === highScore && score > 0

  return (
    <div className="gameover-overlay">
      <div className="gameover-screen">
        <h2>GAME OVER</h2>

        {isNewHighScore && (
          <div className="new-high-score">NEW HIGH SCORE!</div>
        )}

        <div className="final-stats">
          <div className="stat-row">
            <span>SCORE</span>
            <span>{score.toString().padStart(6, '0')}</span>
          </div>
          <div className="stat-row">
            <span>LINES</span>
            <span>{lines.toString().padStart(3, '0')}</span>
          </div>
          <div className="stat-row">
            <span>LEVEL</span>
            <span>{level.toString().padStart(2, '0')}</span>
          </div>
          <div className="stat-row highlight">
            <span>HIGH SCORE</span>
            <span>{highScore.toString().padStart(6, '0')}</span>
          </div>
        </div>

        <div className="gameover-buttons">
          <button className="menu-button" onClick={onRestart}>
            PLAY AGAIN
          </button>
          <button className="menu-button secondary" onClick={onMainMenu}>
            MAIN MENU
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameOver
