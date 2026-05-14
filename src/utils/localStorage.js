// Prefixed keys for localStorage
const KEYS = {
  HIGH_SCORE: 'tetris_highScore',
  SOUND_VOLUME: 'tetris_soundVolume',
  MUSIC_VOLUME: 'tetris_musicVolume',
  SETTINGS: 'tetris_settings',
}

// High score functions
export function saveHighScore(score) {
  try {
    localStorage.setItem(KEYS.HIGH_SCORE, score.toString())
  } catch (error) {
    console.error('Failed to save high score:', error)
  }
}

export function loadHighScore() {
  try {
    const score = localStorage.getItem(KEYS.HIGH_SCORE)
    return score ? parseInt(score, 10) : 0
  } catch (error) {
    console.error('Failed to load high score:', error)
    return 0
  }
}

// Settings functions
export function saveSettings(settings) {
  try {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings))
  } catch (error) {
    console.error('Failed to save settings:', error)
  }
}

export function loadSettings() {
  try {
    const settings = localStorage.getItem(KEYS.SETTINGS)
    if (settings) {
      return JSON.parse(settings)
    }
  } catch (error) {
    console.error('Failed to load settings:', error)
  }

  // Return default settings if none found
  return {
    soundVolume: 0.5,
    musicVolume: 0.5,
  }
}

// Volume functions (kept for backwards compatibility)
export function saveSoundVolume(volume) {
  try {
    localStorage.setItem(KEYS.SOUND_VOLUME, volume.toString())
  } catch (error) {
    console.error('Failed to save sound volume:', error)
  }
}

export function loadSoundVolume() {
  try {
    const volume = localStorage.getItem(KEYS.SOUND_VOLUME)
    return volume !== null ? parseFloat(volume) : 0.5
  } catch (error) {
    console.error('Failed to load sound volume:', error)
    return 0.5
  }
}

export function saveMusicVolume(volume) {
  try {
    localStorage.setItem(KEYS.MUSIC_VOLUME, volume.toString())
  } catch (error) {
    console.error('Failed to save music volume:', error)
  }
}

export function loadMusicVolume() {
  try {
    const volume = localStorage.getItem(KEYS.MUSIC_VOLUME)
    return volume !== null ? parseFloat(volume) : 0.5
  } catch (error) {
    console.error('Failed to load music volume:', error)
    return 0.5
  }
}

// Check if localStorage is available
export function isLocalStorageAvailable() {
  try {
    const test = '__localStorage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (error) {
    return false
  }
}

// Game statistics functions
export function loadGameStats() {
  try {
    const stats = localStorage.getItem(KEYS.SETTINGS)
    if (stats) {
      const parsed = JSON.parse(stats)
      return {
        gamesPlayed: parsed.gamesPlayed || 0,
        totalLines: parsed.totalLines || 0,
        bestLevel: parsed.bestLevel || 0,
        totalScore: parsed.totalScore || 0,
      }
    }
  } catch (error) {
    console.error('Failed to load game stats:', error)
  }

  return {
    gamesPlayed: 0,
    totalLines: 0,
    bestLevel: 0,
    totalScore: 0,
  }
}

export function saveGameStats(stats) {
  try {
    const current = loadSettings()
    const updated = {
      ...current,
      gamesPlayed: stats.gamesPlayed,
      totalLines: stats.totalLines,
      bestLevel: stats.bestLevel,
      totalScore: stats.totalScore,
    }
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(updated))
  } catch (error) {
    console.error('Failed to save game stats:', error)
  }
}

export function updateGameStats(finalScore, finalLines, finalLevel) {
  try {
    const stats = loadGameStats()
    const updated = {
      gamesPlayed: stats.gamesPlayed + 1,
      totalLines: stats.totalLines + finalLines,
      bestLevel: Math.max(stats.bestLevel, finalLevel),
      totalScore: stats.totalScore + finalScore,
    }
    saveGameStats(updated)
    return updated
  } catch (error) {
    console.error('Failed to update game stats:', error)
    return stats
  }
}
