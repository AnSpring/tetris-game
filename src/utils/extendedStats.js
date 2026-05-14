// Extended statistics tracking for Tetris

const KEYS = {
  EXTENDED_STATS: 'tetris_extendedStats',
  GAME_HISTORY: 'tetris_gameHistory',
}

const MAX_HISTORY_ENTRIES = 50 // Keep last 50 games

// Initialize extended stats structure
export function initExtendedStats() {
  return {
    // Line clear statistics
    singleClears: 0,
    doubleClears: 0,
    tripleClears: 0,
    tetrisClears: 0,

    // Time statistics
    totalPlayTime: 0, // in seconds
    longestGame: 0,
    averageGameTime: 0,

    // Score statistics
    averageScore: 0,
    highestCombo: 0,

    // Piece statistics
    piecesPlaced: 0,
    hardDrops: 0,
    softDrops: 0,
    holds: 0,

    // Session info
    lastPlayed: null,
    currentStreak: 0, // Days played in a row
    longestStreak: 0,
  }
}

// Load extended stats
export function loadExtendedStats() {
  try {
    const stats = localStorage.getItem(KEYS.EXTENDED_STATS)
    if (stats) {
      return JSON.parse(stats)
    }
  } catch (error) {
    console.error('Failed to load extended stats:', error)
  }
  return initExtendedStats()
}

// Save extended stats
export function saveExtendedStats(stats) {
  try {
    localStorage.setItem(KEYS.EXTENDED_STATS, JSON.stringify(stats))
  } catch (error) {
    console.error('Failed to save extended stats:', error)
  }
}

// Load game history
export function loadGameHistory() {
  try {
    const history = localStorage.getItem(KEYS.GAME_HISTORY)
    if (history) {
      return JSON.parse(history)
    }
  } catch (error) {
    console.error('Failed to load game history:', error)
  }
  return []
}

// Save game history
export function saveGameHistory(history) {
  try {
    // Keep only the last MAX_HISTORY_ENTRIES games
    const trimmedHistory = history.slice(-MAX_HISTORY_ENTRIES)
    localStorage.setItem(KEYS.GAME_HISTORY, JSON.stringify(trimmedHistory))
  } catch (error) {
    console.error('Failed to save game history:', error)
  }
}

// Add a game to history
export function addGameToHistory(gameData) {
  const history = loadGameHistory()
  const entry = {
    ...gameData,
    timestamp: Date.now(),
    date: new Date().toISOString(),
  }
  history.push(entry)
  saveGameHistory(history)
  console.log('Game added to history. Total games:', history.length)
  console.log('History:', history)
  return history
}

// Update extended stats after a game
export function updateExtendedStats(gameData) {
  const stats = loadExtendedStats()
  // Load history AFTER the game has been added to it
  const history = loadGameHistory()

  // Update line clear statistics
  stats.singleClears += gameData.singleClears || 0
  stats.doubleClears += gameData.doubleClears || 0
  stats.tripleClears += gameData.tripleClears || 0
  stats.tetrisClears += gameData.tetrisClears || 0

  // Update time statistics
  stats.totalPlayTime += gameData.playTime || 0
  stats.longestGame = Math.max(stats.longestGame, gameData.playTime || 0)
  // totalGames should include the current game that was just added
  const totalGames = history.length
  stats.averageGameTime = totalGames > 0 ? stats.totalPlayTime / totalGames : 0

  // Update score statistics - calculate from history that already includes current game
  const totalScore = history.reduce((sum, game) => sum + (game.score || 0), 0)
  stats.averageScore = totalGames > 0 ? Math.floor(totalScore / totalGames) : 0
  stats.highestCombo = Math.max(stats.highestCombo, gameData.maxCombo || 0)

  // Update piece statistics
  stats.piecesPlaced += gameData.piecesPlaced || 0
  stats.hardDrops += gameData.hardDrops || 0
  stats.softDrops += gameData.softDrops || 0
  stats.holds += gameData.holds || 0

  // Update streak
  stats.lastPlayed = Date.now()
  updateStreak(stats)

  saveExtendedStats(stats)
  console.log('Extended stats updated:', stats)
  console.log('Total games from history:', totalGames)
  return stats
}

// Update playing streak
function updateStreak(stats) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayTime = today.getTime()

  if (!stats.lastPlayed) {
    stats.currentStreak = 1
  } else {
    const lastPlayedDate = new Date(stats.lastPlayed)
    lastPlayedDate.setHours(0, 0, 0, 0)
    const lastPlayedTime = lastPlayedDate.getTime()

    const daysDiff = Math.floor((todayTime - lastPlayedTime) / (1000 * 60 * 60 * 24))

    if (daysDiff === 0) {
      // Same day, keep current streak
    } else if (daysDiff === 1) {
      // Next day, increment streak
      stats.currentStreak += 1
    } else {
      // Streak broken
      stats.currentStreak = 1
    }
  }

  stats.longestStreak = Math.max(stats.longestStreak, stats.currentStreak)
}

// Get statistics summary
export function getStatsSummary() {
  const stats = loadExtendedStats()
  const history = loadGameHistory()

  const totalGames = history.length
  const totalLinesCleared = stats.singleClears + stats.doubleClears * 2 +
                            stats.tripleClears * 3 + stats.tetrisClears * 4

  const tetrisPercentage = totalLinesCleared > 0
    ? ((stats.tetrisClears * 4) / totalLinesCleared * 100).toFixed(1)
    : 0

  return {
    ...stats,
    totalGames,
    totalLinesCleared,
    tetrisPercentage,
    history: history.slice(-10).reverse(), // Last 10 games, newest first
  }
}

// Reset all extended statistics
export function resetExtendedStats() {
  try {
    localStorage.removeItem(KEYS.EXTENDED_STATS)
    localStorage.removeItem(KEYS.GAME_HISTORY)
    return true
  } catch (error) {
    console.error('Failed to reset extended stats:', error)
    return false
  }
}

// Format time in seconds to readable string
export function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`
  } else {
    return `${secs}s`
  }
}

// Format date to readable string
export function formatDate(timestamp) {
  const date = new Date(timestamp)
  const now = new Date()
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return 'Today'
  } else if (diffDays === 1) {
    return 'Yesterday'
  } else if (diffDays < 7) {
    return `${diffDays} days ago`
  } else {
    return date.toLocaleDateString()
  }
}
