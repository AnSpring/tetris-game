## ADDED Requirements

### Requirement: Score display component
The system SHALL display the current score with 6-digit formatting.

#### Scenario: Score rendering
- **WHEN** the game is running
- **THEN** the UI displays the score padded to 6 digits (e.g., "000042")

### Requirement: Lines display component
The system SHALL display the total lines cleared with 3-digit formatting.

#### Scenario: Lines rendering
- **WHEN** the game is running
- **THEN** the UI displays the lines count padded to 3 digits (e.g., "007")

### Requirement: Level display component
The system SHALL display the current level with 2-digit formatting.

#### Scenario: Level rendering
- **WHEN** the game is running
- **THEN** the UI displays the level padded to 2 digits (e.g., "03")

### Requirement: Next piece preview component
The system SHALL display the next piece to spawn.

#### Scenario: Next piece rendering
- **WHEN** the game is running
- **THEN** the UI displays the next tetromino shape in a preview box

### Requirement: Hold piece preview component
The system SHALL display the currently held piece.

#### Scenario: Empty hold display
- **WHEN** no piece is held
- **THEN** the UI displays an empty hold box

#### Scenario: Held piece rendering
- **WHEN** a piece is held
- **THEN** the UI displays the held tetromino shape in the hold box

### Requirement: Controls display component
The system SHALL show keyboard control hints.

#### Scenario: Controls reference
- **WHEN** the player views the UI
- **THEN** the system displays key bindings for movement, rotation, hold, pause, and drop

### Requirement: Pause menu component
The system SHALL display a pause menu when the game is paused.

#### Scenario: Pause menu display
- **WHEN** the game is paused
- **THEN** the UI overlays a pause menu with options to resume, restart, or return to main menu

### Requirement: Start menu component
The system SHALL display a start menu before gameplay.

#### Scenario: Main menu display
- **WHEN** the game loads
- **THEN** the UI displays a menu with options to start game, view controls, and adjust settings

#### Scenario: Starting level selection
- **WHEN** the player starts a new game from the menu
- **THEN** the UI allows selecting a starting level from 1 to 10

### Requirement: Game over screen component
The system SHALL display game over information when the game ends.

#### Scenario: Game over display
- **WHEN** the game ends
- **THEN** the UI displays final score, lines cleared, level reached, and high score

#### Scenario: Game over actions
- **WHEN** the game over screen is shown
- **THEN** the UI provides options to restart or return to main menu

### Requirement: High score display
The system SHALL display the highest score achieved.

#### Scenario: High score rendering
- **WHEN** viewing the main menu or game over screen
- **THEN** the UI displays the all-time high score

### Requirement: Retro typography
The system SHALL use retro pixel-style fonts for text elements.

#### Scenario: Font rendering
- **WHEN** rendering UI text
- **THEN** the system uses Press Start 2P or VT323 font from Google Fonts

### Requirement: Soviet aesthetic styling
The system SHALL use the defined Soviet color palette and minimal design.

#### Scenario: UI color scheme
- **WHEN** rendering UI components
- **THEN** the system uses near-black background (#0a0a0a), muted piece colors, and minimal borders

### Requirement: Layout positioning
The system SHALL position UI elements around the game field.

#### Scenario: Component layout
- **WHEN** the game UI renders
- **THEN** hold/score/lines/level display on the left, game field in center, next piece on bottom-right
