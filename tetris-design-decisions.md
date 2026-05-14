# Tetris - Design Decisions & Technical Specification

**Created:** 2026-05-13  
**Status:** Explore phase complete, ready for proposal

---

## Project Overview

Browser-based, full-featured Tetris game with Soviet visual aesthetic and modern sound design.

**Purpose:** Personal project for enjoyment  
**Target:** Web browser (desktop-focused)

---

## Technology Stack

### Core
- **Frontend Framework:** React
- **Rendering:** Canvas 2D API
- **State Management:** useReducer (game logic) + Context API (settings)
- **Audio:** Howler.js
- **Build Tool:** (TBD - Vite/CRA)

### Rationale
- **React:** Component-based UI for menus, score, controls while keeping canvas rendering imperative
- **useReducer:** Centralized game logic with clear action types, easier testing, supports time-travel debugging
- **Canvas:** Full control over rendering, better performance for game loop, visual effects
- **Howler.js:** Simpler than Web Audio API, handles cross-browser audio well

---

## Game Mechanics

### Core Rules
- **Field:** 10 columns × 20 rows
- **Pieces:** 7 classic tetrominoes (I, O, T, S, Z, J, L)
- **Rotation:** Simple rotation around center point
- **Randomizer:** 7-bag system (all 7 pieces before repeat - fairer than pure random)
- **Gravity:** Pieces fall automatically, speed increases with level

### Controls & Features

| Feature | Implementation | Notes |
|---------|---------------|-------|
| Move Left/Right | Arrow keys or A/D | With DAS (Delayed Auto Shift) |
| Soft Drop | Down arrow or S | +1 point per cell |
| Hard Drop | Spacebar | Instant drop, +2 points per cell |
| Rotate CW | Up arrow or W | Clockwise |
| Rotate CCW | Z or Q | Counter-clockwise |
| Hold Piece | C or Shift | Store current piece, swap with held |
| Pause | P or Esc | Pause game |

### DAS (Delayed Auto Shift)
- **Initial delay:** 170ms (classic feel)
- **Auto-repeat rate:** 30ms between repeats
- Allows precise single-tap or hold-for-speed control

### Scoring System (Classic)

```
Lines Cleared:
- 1 line  = 40 × level
- 2 lines = 100 × level
- 3 lines = 300 × level
- 4 lines (TETRIS!) = 1200 × level

Drop Bonus:
- Soft drop: +1 per cell
- Hard drop: +2 per cell
```

### Progression
- **Level up:** Every 10 lines cleared
- **Gravity speed:** Increases with each level
- **Starting level:** User can select 1-10 at game start

---

## Visual Design - Soviet Aesthetic

### Color Palette (Muted/Desaturated)

| Piece | Color | Hex (example) |
|-------|-------|---------------|
| I | Dark Cyan | #3a7ca5 |
| O | Dark Yellow | #d4a017 |
| T | Dark Purple | #6a4c93 |
| S | Dark Green | #2d6a4f |
| Z | Dark Red | #9d4c4c |
| J | Dark Blue | #3d5a80 |
| L | Dark Orange | #c77d3e |

### Block Styling
- **Size:** 30×30px per cell (scalable)
- **Border:** Thick (2-3px), darker shade of fill color
- **Fill:** Solid color or subtle gradient
- **Ghost piece:** Outline only, 30% opacity

### Layout
```
┌─────────────────────────────────┐
│  TETRIS                         │
├──────────┬──────────────────────┤
│  HOLD    │                      │
│  ┌────┐  │     GAME FIELD       │
│  │    │  │      10×20           │
│  └────┘  │                      │
│          │                      │
│  SCORE   │                      │
│  000000  │                      │
│          │                      │
│  LINES   │                      │
│  000     │                      │
│          │                      │
│  LEVEL   ├──────────────────────┤
│  01      │  NEXT                │
│          │  ┌────┐              │
│          │  │    │              │
│          │  └────┘              │
└──────────┴──────────────────────┘
```

### Background & Typography
- **Background:** Near-black (#0a0a0a or #111)
- **Field background:** Subtle grid (#222)
- **Font:** Press Start 2P (Google Fonts) or VT323 for monospace retro feel

### Animation Style
- **Block movement:** Discrete/stepped (no smooth transitions - authentic Soviet feel)
- **Line clear:** Quick flash effect (2-3 frames)
- **Level up:** Brief screen flash
- **No** particle effects or modern flourishes

---

## Audio Design

### Library
**Howler.js** - handles cross-browser audio, easy volume control, sprite support

### Sound Effects Needed
- `move.mp3` - Piece moves left/right
- `rotate.mp3` - Piece rotates
- `soft-drop.mp3` - Soft drop
- `hard-drop.mp3` - Hard drop/lock
- `line-clear.mp3` - 1-3 lines cleared
- `tetris.mp3` - 4 lines cleared (special)
- `level-up.mp3` - Level increases
- `game-over.mp3` - Game ends

### Music
- **Style:** Minimal Techno
- **Format:** Looping background track
- **Volume:** Default 50%, user-adjustable
- **Controls:** Mute toggle, volume slider

---

## Architecture

### State Management with useReducer

**Game State Structure:**
```javascript
{
  field: Array(20).fill(Array(10).fill(0)), // 2D grid
  currentPiece: {
    type: 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L',
    x: number,
    y: number,
    rotation: 0 | 1 | 2 | 3,
    shape: number[][] // 2D array
  },
  nextPiece: {...},
  heldPiece: {...} | null,
  canHold: boolean, // prevents hold spam
  score: number,
  lines: number,
  level: number,
  gameStatus: 'menu' | 'playing' | 'paused' | 'gameover',
  highScore: number // from localStorage
}
```

**Reducer Actions:**
- `MOVE_LEFT`, `MOVE_RIGHT`, `MOVE_DOWN`
- `ROTATE_CW`, `ROTATE_CCW`
- `HARD_DROP`
- `HOLD_PIECE`
- `TICK` (gravity tick)
- `LOCK_PIECE` (piece lands)
- `CLEAR_LINES`
- `LEVEL_UP`
- `GAME_OVER`
- `PAUSE`, `RESUME`
- `NEW_GAME`

### Context for Settings
```javascript
{
  soundVolume: number (0-1),
  musicVolume: number (0-1),
  keyBindings: {...},
  highScores: [...] // localStorage persistence
}
```

### Project Structure

```
src/
├── components/
│   ├── Game.jsx              # Main game container
│   ├── Canvas.jsx            # Canvas wrapper with game loop
│   ├── UI/
│   │   ├── Score.jsx
│   │   ├── Level.jsx
│   │   ├── Lines.jsx
│   │   ├── NextPiece.jsx
│   │   ├── HoldPiece.jsx
│   │   ├── Controls.jsx      # Key hints
│   │   └── PauseMenu.jsx
│   ├── Menu.jsx              # Start menu
│   └── GameOver.jsx          # Game over screen
│
├── game/                     # Framework-agnostic game logic
│   ├── reducer.js            # Game state reducer
│   ├── engine.js             # Game loop, timing
│   ├── field.js              # Grid operations
│   ├── pieces.js             # Tetromino definitions
│   ├── physics.js            # Movement, collision, rotation
│   ├── scoring.js            # Score calculation
│   ├── renderer.js           # Canvas rendering
│   └── input.js              # Keyboard handling with DAS
│
├── audio/
│   ├── soundManager.js       # Howler.js wrapper
│   └── assets/               # Sound files
│       ├── sfx/
│       └── music/
│
├── context/
│   └── SettingsContext.jsx   # Global settings
│
├── config/
│   └── constants.js          # Game constants
│       - FIELD_WIDTH, FIELD_HEIGHT
│       - BLOCK_SIZE
│       - COLORS
│       - LEVEL_SPEEDS
│       - DAS_DELAY, ARR
│
├── utils/
│   └── localStorage.js       # High score persistence
│
└── App.jsx                   # Root component
```

### Game Loop Pattern

```javascript
// Canvas.jsx
useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  
  let lastTime = 0;
  let accumulator = 0;
  const TICK_RATE = 1000 / 60; // 60 FPS
  
  const gameLoop = (currentTime) => {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    accumulator += deltaTime;
    
    // Fixed timestep for physics
    while (accumulator >= TICK_RATE) {
      dispatch({ type: 'TICK' });
      accumulator -= TICK_RATE;
    }
    
    // Render
    render(ctx, gameState);
    
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };
  
  gameLoopRef.current = requestAnimationFrame(gameLoop);
  
  return () => cancelAnimationFrame(gameLoopRef.current);
}, [gameState, dispatch]);
```

---

## Implementation Phases (Draft)

### Phase 1: Foundation
- React app setup (Vite)
- Canvas component with basic rendering
- Game state structure (useReducer)
- Basic field rendering

### Phase 2: Core Mechanics
- Tetromino definitions
- Piece spawning & movement
- Collision detection
- Rotation system
- Line clearing

### Phase 3: Game Loop
- Gravity system
- Scoring
- Level progression
- Game over conditions

### Phase 4: Controls
- Keyboard input
- DAS implementation
- Hold piece
- Hard drop

### Phase 5: UI
- Score/level/lines display
- Next piece preview
- Hold piece display
- Ghost piece
- Pause menu

### Phase 6: Audio
- Howler.js integration
- Sound effects
- Background music
- Volume controls

### Phase 7: Polish
- Menu screen
- Game over screen
- High score (localStorage)
- Responsive design
- Visual effects (line clear flash)

### Phase 8: QoL
- Settings menu
- Key rebinding
- Starting level selection
- Mobile touch controls (optional)

---

## Open Questions / Future Considerations

- **Build tool:** Vite (recommended) vs Create React App
- **Music source:** Find CC-licensed minimal techno or commission/generate?
- **Sound effects:** Find free pack vs generate synthetic sounds?
- **Mobile support:** Touch controls + responsive layout? (Later phase)
- **Additional modes:** Marathon, Sprint (40 lines), Ultra (2 minutes)? (Future)

---

## Next Steps

1. Exit explore mode
2. Create OpenSpec change: `tetris-game` or use `/opsx:propose`
3. Generate proposal, design, and task breakdown
4. Begin implementation starting with Phase 1

---

**Notes:**
- All decisions prioritize authentic Soviet feel + modern playability
- Architecture separates concerns: React for UI, pure JS for game logic
- State management chosen for testability and debugging
- Visual style is specific enough to guide implementation
- Sound design balances retro aesthetic with modern audio quality
