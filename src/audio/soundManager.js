// Sound manager with Web Audio API synthesized sounds
class SoundManager {
  constructor() {
    this.audioContext = null
    this.soundVolume = 0.5
    this.musicVolume = 0.5
    this.isMuted = false
    this.initialized = false
    this.musicOscillator = null
    this.musicGain = null
    this.musicPlaying = false
  }

  // Initialize Web Audio API (call after user interaction)
  init() {
    if (this.initialized) return

    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      this.initialized = true
      console.log('Sound manager initialized (Web Audio API synthesized sounds)')
    } catch (error) {
      console.error('Failed to initialize Web Audio API:', error)
    }
  }

  // Create a simple beep sound
  beep(frequency, duration, volume = 1) {
    if (!this.initialized || this.isMuted) return

    try {
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      oscillator.frequency.value = frequency
      oscillator.type = 'square' // 8-bit style

      const finalVolume = this.soundVolume * volume * 0.3 // Lower overall volume
      gainNode.gain.setValueAtTime(finalVolume, this.audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)

      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + duration)
    } catch (error) {
      console.error('Failed to play beep:', error)
    }
  }

  // Play a sound effect by name
  play(soundName) {
    if (!this.initialized || this.isMuted) return

    try {
      switch (soundName) {
        case 'move':
          this.beep(200, 0.05)
          break
        case 'rotate':
          this.beep(300, 0.08)
          break
        case 'softDrop':
          this.beep(150, 0.03)
          break
        case 'hardDrop':
          this.beep(100, 0.15)
          setTimeout(() => this.beep(150, 0.1), 50)
          break
        case 'lineClear':
          this.beep(400, 0.1)
          setTimeout(() => this.beep(500, 0.1), 100)
          setTimeout(() => this.beep(600, 0.15), 200)
          break
        case 'tetris':
          // Special sound for 4-line clear
          this.beep(500, 0.1)
          setTimeout(() => this.beep(600, 0.1), 100)
          setTimeout(() => this.beep(700, 0.1), 200)
          setTimeout(() => this.beep(800, 0.2), 300)
          break
        case 'levelUp':
          this.beep(600, 0.1)
          setTimeout(() => this.beep(700, 0.1), 100)
          setTimeout(() => this.beep(800, 0.2), 200)
          break
        case 'gameOver':
          this.beep(400, 0.2)
          setTimeout(() => this.beep(350, 0.2), 200)
          setTimeout(() => this.beep(300, 0.2), 400)
          setTimeout(() => this.beep(200, 0.4), 600)
          break
      }
    } catch (error) {
      console.error(`Failed to play sound: ${soundName}`, error)
    }
  }

  // Start background music (simple loop)
  playMusic() {
    if (!this.initialized || this.isMuted || this.musicPlaying) return

    try {
      // Create a simple arpeggiated melody
      this.musicPlaying = true
      this.playMusicLoop()
    } catch (error) {
      console.error('Failed to play music:', error)
    }
  }

  playMusicLoop() {
    if (!this.musicPlaying || this.isMuted) return

    // Simple chord progression in C minor
    const melody = [
      264, 330, 396, 330, // Cm
      297, 352, 440, 352, // Gm
      248, 330, 396, 330, // Ab
      297, 352, 440, 352, // Gm
    ]

    const noteDuration = 0.15
    const loopDuration = melody.length * noteDuration * 1000

    melody.forEach((freq, i) => {
      setTimeout(() => {
        if (this.musicPlaying && !this.isMuted) {
          const oscillator = this.audioContext.createOscillator()
          const gainNode = this.audioContext.createGain()

          oscillator.connect(gainNode)
          gainNode.connect(this.audioContext.destination)

          oscillator.frequency.value = freq
          oscillator.type = 'triangle'

          const volume = this.musicVolume * 0.1 // Very quiet background
          gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + noteDuration)

          oscillator.start(this.audioContext.currentTime)
          oscillator.stop(this.audioContext.currentTime + noteDuration)
        }
      }, i * noteDuration * 1000)
    })

    // Loop
    setTimeout(() => {
      if (this.musicPlaying) {
        this.playMusicLoop()
      }
    }, loopDuration)
  }

  // Pause background music
  pauseMusic() {
    this.musicPlaying = false
  }

  // Resume background music
  resumeMusic() {
    if (!this.musicPlaying) {
      this.playMusic()
    }
  }

  // Set sound volume
  setSoundVolume(volume) {
    this.soundVolume = Math.max(0, Math.min(1, volume))
  }

  // Set music volume
  setMusicVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume))
  }

  // Mute all audio
  mute() {
    this.isMuted = true
    this.pauseMusic()
  }

  // Unmute all audio
  unmute() {
    this.isMuted = false
  }

  // Toggle mute
  toggleMute() {
    if (this.isMuted) {
      this.unmute()
    } else {
      this.mute()
    }
  }
}

// Create singleton instance
const soundManager = new SoundManager()

export default soundManager
