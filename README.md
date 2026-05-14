# Tetris Game

A browser-based Tetris game with a distinct Soviet visual aesthetic and modern gameplay features.

## Features

### Core Gameplay
- **Classic Tetris Mechanics**: 10×20 game field with 7 tetromino types (I, O, T, S, Z, J, L)
- **7-Bag Randomizer**: Fair piece distribution ensuring all 7 pieces appear before any repeat
- **Advanced Controls**: DAS (Delayed Auto Shift), hold piece, ghost piece preview
- **Scoring System**: Classic scoring with bonus points for soft/hard drops
- **Level Progression**: Difficulty increases every 10 lines cleared

### Visual Design
- **Soviet Aesthetic**: Muted color palette and minimal design
- **Pixel-Perfect Rendering**: Canvas 2D with discrete movement (no smooth transitions)
- **Retro Typography**: Press Start 2P font from Google Fonts
- **Near-Black Background**: #0a0a0a with subtle grid lines

### Controls

| Action | Keys |
|--------|------|
| Move Left | ← or A |
| Move Right | → or D |
| Soft Drop | ↓ or S |
| Hard Drop | SPACE |
| Rotate Clockwise | ↑ or W |
| Rotate Counter-clockwise | Z or Q |
| Hold Piece | C or SHIFT |
| Pause | P or ESC |

### Technical Features
- **60 FPS Game Loop**: Fixed timestep with requestAnimationFrame
- **DAS Input System**: 170ms initial delay, 30ms auto-repeat rate
- **High Score Persistence**: Saved to localStorage
- **React + Canvas Hybrid**: React UI components with Canvas 2D rendering
- **Centralized State Management**: useReducer for predictable state transitions

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development

### Project Structure

```
src/
├── components/          # React UI components
│   ├── UI/             # Reusable UI components (Score, Level, etc.)
│   ├── Canvas.jsx      # Game canvas wrapper with game loop
│   ├── Game.jsx        # Main game container
│   ├── Menu.jsx        # Start menu
│   └── GameOver.jsx    # Game over screen
├── game/               # Framework-agnostic game logic
│   ├── reducer.js      # Game state reducer with all actions
│   ├── engine.js       # Game loop and timing
│   ├── field.js        # Grid operations and line clearing
│   ├── pieces.js       # Tetromino definitions and 7-bag randomizer
│   ├── physics.js      # Movement, collision, rotation
│   ├── scoring.js      # Score calculation
│   ├── renderer.js     # Canvas rendering functions
│   └── input.js        # Keyboard handling with DAS
├── audio/              # Audio management (placeholder)
│   └── soundManager.js # Howler.js wrapper
├── context/            # React context providers
│   └── SettingsContext.jsx
├── config/             # Game constants
│   └── constants.js    # Field size, colors, shapes, speeds
└── utils/              # Utility functions
    └── localStorage.js # High score and settings persistence
```

### Game State

The game uses React's `useReducer` for centralized state management:

```javascript
{
  field: Array(20x10),      // Game field grid
  currentPiece: {...},      // Active falling piece
  nextPiece: string,        // Next piece type
  heldPiece: string|null,   // Held piece type
  canHold: boolean,         // Hold cooldown
  score: number,            // Current score
  lines: number,            // Total lines cleared
  level: number,            // Current level
  gameStatus: string,       // 'menu'|'playing'|'paused'|'gameover'
  highScore: number,        // All-time high score
}
```

### Rendering Pipeline

1. **Game Loop** (60 FPS fixed timestep)
   - Update DAS (Delayed Auto Shift)
   - Update gravity timer
   - Dispatch TICK action

2. **Render** (every frame)
   - Clear canvas
   - Render field background and grid
   - Render locked pieces
   - Render ghost piece (30% opacity outline)
   - Render current piece

## Game Mechanics

### Scoring

| Action | Points |
|--------|--------|
| 1 Line | 40 × level |
| 2 Lines | 100 × level |
| 3 Lines | 300 × level |
| 4 Lines (TETRIS!) | 1200 × level |
| Soft Drop | +1 per cell |
| Hard Drop | +2 per cell |

### Level Progression

- **Level up**: Every 10 lines cleared
- **Gravity speed**: Increases with each level (1000ms at level 1 → 50ms at level 15+)
- **Starting level**: User can select 1-10 at game start

### DAS (Delayed Auto Shift)

- **Initial delay**: 170ms before auto-repeat begins
- **Auto-repeat rate**: 30ms between repeats
- Allows precise single-tap control or fast hold-to-scan movement

## Technologies

- **React 18.3**: UI component framework
- **Vite 5.3**: Build tool and dev server
- **Canvas 2D API**: Game rendering
- **Howler.js 2.2**: Audio management (files not included)
- **localStorage**: High score and settings persistence

## Browser Support

Modern browsers with Canvas 2D and ES6+ support:
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)

## License

Personal project - all rights reserved.

## Credits

- **Design**: Soviet-inspired aesthetic with muted color palette
- **Font**: Press Start 2P by CodeMan38 (Google Fonts)
- **Audio**: Placeholder implementation (audio files not included)

---

**Status**: Fully playable MVP with core mechanics, rendering, and UI complete. Audio files and advanced polish features to be added in future updates.
