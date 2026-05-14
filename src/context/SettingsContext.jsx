import { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext()

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider')
  }
  return context
}

export function SettingsProvider({ children }) {
  const [soundVolume, setSoundVolume] = useState(0.5)
  const [musicVolume, setMusicVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [keyBindings, setKeyBindings] = useState({
    left: ['ArrowLeft', 'a', 'A'],
    right: ['ArrowRight', 'd', 'D'],
    down: ['ArrowDown', 's', 'S'],
    rotateUp: ['ArrowUp', 'w', 'W'],
    rotateDown: ['z', 'Z', 'q', 'Q'],
    hardDrop: [' '],
    hold: ['c', 'C', 'Shift'],
    pause: ['p', 'P', 'Escape'],
  })

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('tetris_settings')
      if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        if (settings.soundVolume !== undefined) setSoundVolume(settings.soundVolume)
        if (settings.musicVolume !== undefined) setMusicVolume(settings.musicVolume)
        if (settings.isMuted !== undefined) setIsMuted(settings.isMuted)
        if (settings.keyBindings) setKeyBindings(settings.keyBindings)
      }
    } catch (error) {
      console.error('Failed to load settings from localStorage:', error)
    }
  }, [])

  // Save settings to localStorage whenever they change
  useEffect(() => {
    try {
      const settings = {
        soundVolume,
        musicVolume,
        isMuted,
        keyBindings,
      }
      localStorage.setItem('tetris_settings', JSON.stringify(settings))
    } catch (error) {
      console.error('Failed to save settings to localStorage:', error)
    }
  }, [soundVolume, musicVolume, isMuted, keyBindings])

  const value = {
    soundVolume,
    setSoundVolume,
    musicVolume,
    setMusicVolume,
    isMuted,
    setIsMuted,
    keyBindings,
    setKeyBindings,
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}
