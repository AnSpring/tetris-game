## Why

This project creates a browser-based Tetris game for personal enjoyment, combining classic gameplay with a distinct Soviet visual aesthetic and modern sound design. It serves as both an engaging implementation of a timeless game and an exploration of nostalgic retro design.

## What Changes

- **NEW**: Full-featured browser-based Tetris game with React frontend and Canvas 2D rendering
- **NEW**: Classic Tetris mechanics (10×20 field, 7 tetrominoes, line clearing, scoring)
- **NEW**: Soviet-inspired visual design with muted color palette and minimal animation style
- **NEW**: Audio system with minimal techno music and retro sound effects (Howler.js)
- **NEW**: Advanced controls including DAS, hold piece, ghost piece, hard/soft drop
- **NEW**: Game progression system with levels, scoring, and high score persistence
- **NEW**: Responsive UI with game field, next piece preview, hold piece, and statistics

## Capabilities

### New Capabilities

- `game-mechanics`: Core Tetris gameplay - piece spawning, movement, rotation, collision detection, line clearing, and 7-bag randomizer
- `game-rendering`: Canvas-based rendering system for game field, pieces, ghost piece, grid, and visual effects
- `game-state`: State management using useReducer for game logic (field, pieces, score, level, game status)
- `input-controls`: Keyboard input handling with DAS (Delayed Auto Shift), soft/hard drop, rotation, hold, and pause
- `scoring-progression`: Scoring system (classic rules) and level progression with increasing gravity
- `audio-system`: Sound effects and background music using Howler.js with volume controls
- `ui-components`: React UI components for score display, next/hold piece previews, game controls, menus
- `persistence`: localStorage integration for high scores and game settings

### Modified Capabilities

<!-- No existing capabilities are being modified - this is a new project -->

## Impact

**New Code:**
- Complete React application structure with components, game logic, and styling
- Canvas rendering engine and game loop implementation
- Audio asset management and playback system
- localStorage utilities for persistence

**Dependencies:**
- React (component framework)
- Howler.js (audio library)
- Build tooling (Vite or Create React App)
- Google Fonts (Press Start 2P or VT323 for typography)

**Assets Required:**
- 8 sound effect files (move, rotate, drop, line clear, tetris, level up, game over, soft drop)
- Background music track (minimal techno, looping)
- No external images (all visual elements rendered on canvas)

**No Breaking Changes** - This is a new standalone project with no existing systems to modify.
