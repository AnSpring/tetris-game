## ADDED Requirements

### Requirement: Game field dimensions
The system SHALL provide a 10-column by 20-row game field for piece placement.

#### Scenario: Field initialization
- **WHEN** a new game starts
- **THEN** the system creates an empty 10×20 grid

### Requirement: Tetromino piece types
The system SHALL support seven tetromino types: I, O, T, S, Z, J, and L pieces.

#### Scenario: All piece types available
- **WHEN** the game generates pieces
- **THEN** the system uses only the seven standard tetromino shapes

### Requirement: 7-bag randomizer
The system SHALL use a 7-bag randomizer to ensure all seven piece types appear before any repeat.

#### Scenario: Fair piece distribution
- **WHEN** the system generates 7 pieces
- **THEN** each of the seven tetromino types appears exactly once

#### Scenario: Bag refill
- **WHEN** all 7 pieces from the current bag are used
- **THEN** the system generates a new shuffled bag of 7 pieces

### Requirement: Piece spawning
The system SHALL spawn new pieces at the top center of the game field.

#### Scenario: New piece appears
- **WHEN** the previous piece locks in place
- **THEN** the system spawns the next piece at column 3-4, row 0

### Requirement: Horizontal movement
The system SHALL allow pieces to move left and right within field boundaries.

#### Scenario: Valid left movement
- **WHEN** the user presses the left arrow key and the piece is not at the left edge
- **THEN** the piece moves one column to the left

#### Scenario: Valid right movement
- **WHEN** the user presses the right arrow key and the piece is not at the right edge
- **THEN** the piece moves one column to the right

#### Scenario: Blocked horizontal movement
- **WHEN** the user attempts to move the piece beyond the field boundary or into an occupied cell
- **THEN** the piece does not move

### Requirement: Rotation
The system SHALL support clockwise and counter-clockwise rotation of pieces around their center point.

#### Scenario: Clockwise rotation
- **WHEN** the user presses the up arrow key and rotation does not cause collision
- **THEN** the piece rotates 90 degrees clockwise

#### Scenario: Counter-clockwise rotation
- **WHEN** the user presses the Z key and rotation does not cause collision
- **THEN** the piece rotates 90 degrees counter-clockwise

#### Scenario: Blocked rotation
- **WHEN** rotation would place the piece outside boundaries or in an occupied cell
- **THEN** the piece does not rotate

### Requirement: Gravity
The system SHALL automatically move pieces downward at a rate determined by the current level.

#### Scenario: Automatic descent
- **WHEN** the gravity timer expires
- **THEN** the piece moves down one row

#### Scenario: Gravity speed increases with level
- **WHEN** the player reaches a higher level
- **THEN** the gravity timer interval decreases

### Requirement: Soft drop
The system SHALL allow players to manually accelerate piece descent.

#### Scenario: Manual soft drop
- **WHEN** the user holds the down arrow key
- **THEN** the piece moves down faster than gravity speed

### Requirement: Hard drop
The system SHALL allow players to instantly drop pieces to the lowest available position.

#### Scenario: Instant drop
- **WHEN** the user presses the spacebar
- **THEN** the piece immediately moves to the lowest position and locks

### Requirement: Collision detection
The system SHALL detect collisions between pieces and field boundaries or locked pieces.

#### Scenario: Bottom collision
- **WHEN** a piece reaches the bottom row or a locked piece below
- **THEN** the piece locks in place

#### Scenario: Side collision
- **WHEN** a piece attempts to move into an occupied cell or beyond field boundaries
- **THEN** the movement is prevented

### Requirement: Line clearing
The system SHALL detect and clear completely filled horizontal lines.

#### Scenario: Single line clear
- **WHEN** a piece locks and creates exactly one complete horizontal line
- **THEN** the system removes that line and shifts rows above it down

#### Scenario: Multiple line clear
- **WHEN** a piece locks and creates 2, 3, or 4 complete lines
- **THEN** the system removes all complete lines simultaneously and shifts remaining rows down

#### Scenario: No line clear
- **WHEN** a piece locks and no complete lines exist
- **THEN** the system does not clear any lines

### Requirement: Game over condition
The system SHALL end the game when a new piece cannot spawn without collision.

#### Scenario: Spawn collision triggers game over
- **WHEN** a new piece spawns and its starting position overlaps with locked pieces
- **THEN** the game ends and displays the game over screen
