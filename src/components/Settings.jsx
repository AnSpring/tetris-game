import { useState } from 'react'
import { useSettings } from '../context/SettingsContext.jsx'
import './Settings.css'

function Settings({ onClose }) {
  const { soundVolume, setSoundVolume, musicVolume, setMusicVolume, isMuted, setIsMuted } = useSettings()
  const [localSoundVolume, setLocalSoundVolume] = useState(soundVolume)
  const [localMusicVolume, setLocalMusicVolume] = useState(musicVolume)
  const [localMuted, setLocalMuted] = useState(isMuted)

  const handleSave = () => {
    setSoundVolume(localSoundVolume)
    setMusicVolume(localMusicVolume)
    setIsMuted(localMuted)
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <div className="settings-overlay">
      <div className="settings-modal">
        <h2>SETTINGS</h2>

        <div className="settings-content">
          {/* Sound Volume */}
          <div className="setting-item">
            <label htmlFor="sound-volume">
              SOUND VOLUME
              <span className="volume-value">{Math.round(localSoundVolume * 100)}%</span>
            </label>
            <input
              id="sound-volume"
              type="range"
              min="0"
              max="100"
              value={localSoundVolume * 100}
              onChange={(e) => setLocalSoundVolume(e.target.value / 100)}
              disabled={localMuted}
              className="volume-slider"
            />
          </div>

          {/* Music Volume */}
          <div className="setting-item">
            <label htmlFor="music-volume">
              MUSIC VOLUME
              <span className="volume-value">{Math.round(localMusicVolume * 100)}%</span>
            </label>
            <input
              id="music-volume"
              type="range"
              min="0"
              max="100"
              value={localMusicVolume * 100}
              onChange={(e) => setLocalMusicVolume(e.target.value / 100)}
              disabled={localMuted}
              className="volume-slider"
            />
          </div>

          {/* Mute Toggle */}
          <div className="setting-item checkbox-item">
            <label htmlFor="mute-toggle">
              <input
                id="mute-toggle"
                type="checkbox"
                checked={localMuted}
                onChange={(e) => setLocalMuted(e.target.checked)}
              />
              MUTE ALL AUDIO
            </label>
          </div>

          <div className="audio-note">
            Using synthesized 8-bit style sounds. Adjust volume to your preference!
          </div>
        </div>

        <div className="settings-buttons">
          <button className="menu-button" onClick={handleSave}>
            SAVE
          </button>
          <button className="menu-button secondary" onClick={handleCancel}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
