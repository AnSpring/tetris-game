# Tetris Game - Testing Checklist

## Test Status: In Progress

### 20.1 Test all 7 tetromino types spawn and rotate correctly
- [ ] I-piece spawns and rotates (4 rotation states)
- [ ] O-piece spawns (no rotation needed)
- [ ] T-piece spawns and rotates (4 rotation states)
- [ ] S-piece spawns and rotates (4 rotation states)
- [ ] Z-piece spawns and rotates (4 rotation states)
- [ ] J-piece spawns and rotates (4 rotation states)
- [ ] L-piece spawns and rotates (4 rotation states)

### 20.2 Test 7-bag randomizer ensures fair distribution
- [ ] Play for 21 pieces (3 bags)
- [ ] Verify each piece appears 3 times
- [ ] No piece repeats within same bag

### 20.3 Test collision detection (walls, floor, locked pieces)
- [ ] Cannot move through left wall
- [ ] Cannot move through right wall
- [ ] Cannot move through floor
- [ ] Cannot move through locked pieces
- [ ] Rotation blocked by walls
- [ ] Rotation blocked by locked pieces

### 20.4 Test line clearing (1, 2, 3, 4 lines)
- [ ] Single line clears correctly
- [ ] Double line clears correctly
- [ ] Triple line clears correctly
- [ ] Tetris (4 lines) clears correctly
- [ ] Rows above drop down after clear

### 20.5 Test scoring calculations
- [ ] 1 line = 40 × level points
- [ ] 2 lines = 100 × level points
- [ ] 3 lines = 300 × level points
- [ ] 4 lines = 1200 × level points
- [ ] Soft drop awards +1 per cell
- [ ] Hard drop awards +2 per cell

### 20.6 Test level progression (every 10 lines)
- [ ] Level increases at 10 lines
- [ ] Level increases at 20 lines
- [ ] Level increases at 30 lines

### 20.7 Test gravity speed increases with level
- [ ] Level 1 gravity is slow
- [ ] Level 5 gravity is faster
- [ ] Level 10 gravity is much faster

### 20.8 Test DAS (170ms delay, 30ms repeat)
- [ ] Single tap moves piece once
- [ ] Holding key triggers auto-repeat after delay
- [ ] Auto-repeat rate feels smooth

### 20.9 Test hold piece (swap, cooldown)
- [ ] Can hold first piece
- [ ] Hold swaps pieces correctly
- [ ] Cannot hold twice in one turn
- [ ] Can hold again after piece locks

### 20.10 Test ghost piece positioning
- [ ] Ghost shows at lowest valid position
- [ ] Ghost updates when piece moves
- [ ] Ghost has 30% opacity

### 20.11 Test pause/resume functionality
- [ ] P key pauses game
- [ ] ESC key pauses game
- [ ] Pause menu appears
- [ ] Resume works correctly
- [ ] Restart works correctly

### 20.12 Test game over condition (spawn collision)
- [ ] Game ends when pieces stack to top
- [ ] Game over screen appears
- [ ] Final score displayed
- [ ] High score updated if beaten

### 20.13 Test high score persistence
- [ ] High score saves to localStorage
- [ ] High score loads on refresh
- [ ] High score displays in menu
- [ ] High score displays in game over

### 20.14 Test settings persistence
- [ ] Settings save to localStorage
- [ ] Settings load on refresh

### 20.15 Test all audio triggers (SKIPPED - no audio files)
- [ ] N/A - Audio files not implemented

### 20.16 Test volume controls and mute (SKIPPED - no audio files)
- [ ] N/A - Audio files not implemented

### 20.17 Test on different browsers
- [ ] Chrome - Desktop
- [ ] Firefox - Desktop
- [ ] Safari - Desktop (macOS only)

## Notes
- All core mechanics functional
- Audio system implemented but no audio files loaded
- Game fully playable without audio

## Test Results
Date: 2026-05-13
Tester: Automated setup
Status: Ready for manual testing
