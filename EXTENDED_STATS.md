# Extended Statistics Feature

## Overview
Extended statistics system tracks detailed gameplay data and displays comprehensive analytics for your Tetris sessions.

## Features

### 📊 Tracked Statistics

#### Line Clears
- **Single, Double, Triple, Tetris** - Count and percentage of each clear type
- **Tetris Efficiency** - Percentage of lines cleared with Tetris (4 lines at once)

#### Games Overview
- **Total Games Played**
- **Average Score** - Mean score across all games
- **Total Lines Cleared** - Cumulative lines from all games
- **Pieces Placed** - Total number of pieces placed

#### Time Statistics
- **Total Play Time** - Cumulative time spent playing
- **Longest Game** - Duration of your longest session
- **Average Game Time** - Mean game duration
- **Current Streak** - Consecutive days played
- **Longest Streak** - Record consecutive days

#### Actions
- **Hard Drops** - Number of instant drops
- **Soft Drops** - Number of accelerated drops
- **Holds** - Number of piece holds used
- **Highest Combo** - Maximum consecutive line clears

### 📜 Game History
- Last 50 games saved with details:
  - Date/timestamp
  - Final score
  - Lines cleared
  - Level reached
  - Play time

### 🎮 In-Game Features
- **Real-time Combo Display** - Shows current combo multiplier during gameplay
- **Automatic Stats Tracking** - All actions tracked automatically during play

## Storage
- All statistics stored in browser localStorage
- Statistics persist across sessions
- Separate keys for extended stats and game history

## Usage

### Viewing Statistics
1. From main menu, click **STATISTICS** button
2. View comprehensive stats across multiple categories
3. Scroll to see recent game history

### Resetting Statistics
1. Open Statistics screen
2. Click **Reset** button (top right)
3. Confirm deletion - this cannot be undone

## Data Structure

### Extended Stats Object
```javascript
{
  singleClears: number,
  doubleClears: number,
  tripleClears: number,
  tetrisClears: number,
  totalPlayTime: number (seconds),
  longestGame: number (seconds),
  averageGameTime: number (seconds),
  averageScore: number,
  highestCombo: number,
  piecesPlaced: number,
  hardDrops: number,
  softDrops: number,
  holds: number,
  currentStreak: number (days),
  longestStreak: number (days),
  lastPlayed: timestamp
}
```

### Game History Entry
```javascript
{
  score: number,
  lines: number,
  level: number,
  playTime: number (seconds),
  singleClears: number,
  doubleClears: number,
  tripleClears: number,
  tetrisClears: number,
  piecesPlaced: number,
  hardDrops: number,
  softDrops: number,
  holds: number,
  maxCombo: number,
  timestamp: number,
  date: ISO string
}
```

## Technical Details

### Files Added
- `src/utils/extendedStats.js` - Stats management logic
- `src/components/Statistics.jsx` - Stats display component
- `src/components/Statistics.css` - Stats styling
- `src/components/UI/Combo.jsx` - In-game combo display

### Files Modified
- `src/game/reducer.js` - Added stats tracking to game state
- `src/components/Game.jsx` - Integration with stats system
- `src/components/Menu.jsx` - Added Statistics button
- `src/components/Game.css` - Added combo display styles

### LocalStorage Keys
- `tetris_extendedStats` - Main statistics object
- `tetris_gameHistory` - Array of game history entries (max 50)

## Performance
- Minimal overhead during gameplay
- Stats saved only at game over
- Efficient localStorage usage with JSON serialization

## Future Enhancements
Possible additions:
- Export stats to CSV/JSON
- Charts and graphs
- Achievements system
- Online leaderboards
- Social sharing
