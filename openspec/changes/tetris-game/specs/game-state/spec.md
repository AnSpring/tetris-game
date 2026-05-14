## ADDED Requirements

### Requirement: Centralized state management
The system SHALL manage game state using React useReducer hook.

#### Scenario: State initialization
- **WHEN** the game component mounts
- **THEN** the system initializes the game state with default values

### Requirement: Game field state
The system SHALL maintain a 2D array representing the 10×20 game field.

#### Scenario: Field state structure
- **WHEN** accessing the game field
- **THEN** the state contains a 20-row by 10-column array with 0 for empty cells and piece type IDs for locked pieces

### Requirement: Current piece state
The system SHALL track the active piece's type, position, rotation, and shape.

#### Scenario: Active piece data
- **WHEN** a piece is falling
- **THEN** the state contains the piece type, x/y coordinates, rotation angle (0-3), and 2D shape array

### Requirement: Next piece state
The system SHALL maintain the next piece to be spawned.

#### Scenario: Next piece preview
- **WHEN** the game is running
- **THEN** the state contains the next piece type and shape for preview display

### Requirement: Hold piece state
The system SHALL track the currently held piece and whether holding is allowed.

#### Scenario: Hold piece data
- **WHEN** a piece is held
- **THEN** the state contains the held piece type and a canHold boolean

#### Scenario: Hold cooldown
- **WHEN** a piece is held
- **THEN** the state sets canHold to false until the next piece spawns

### Requirement: Score state
The system SHALL maintain the current score.

#### Scenario: Score tracking
- **WHEN** the game is running
- **THEN** the state contains the current score as an integer

### Requirement: Lines cleared state
The system SHALL track the total number of lines cleared.

#### Scenario: Lines count
- **WHEN** lines are cleared
- **THEN** the state increments the total lines cleared

### Requirement: Level state
The system SHALL track the current difficulty level.

#### Scenario: Level tracking
- **WHEN** the game is running
- **THEN** the state contains the current level as an integer

### Requirement: Game status state
The system SHALL track whether the game is in menu, playing, paused, or game over state.

#### Scenario: Status transitions
- **WHEN** game status changes
- **THEN** the state updates to one of: 'menu', 'playing', 'paused', 'gameover'

### Requirement: High score state
The system SHALL maintain the highest score achieved.

#### Scenario: High score tracking
- **WHEN** the game ends
- **THEN** the state updates the high score if the current score exceeds it

### Requirement: Action-based state updates
The system SHALL update state only through typed reducer actions.

#### Scenario: State mutation control
- **WHEN** the game logic needs to change state
- **THEN** the system dispatches a typed action (MOVE_LEFT, ROTATE_CW, TICK, etc.)

#### Scenario: Predictable state transitions
- **WHEN** an action is dispatched
- **THEN** the reducer returns a new state object without mutating the previous state
