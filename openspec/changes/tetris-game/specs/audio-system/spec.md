## ADDED Requirements

### Requirement: Howler.js integration
The system SHALL use Howler.js library for audio playback.

#### Scenario: Audio library initialization
- **WHEN** the game loads
- **THEN** the system initializes Howler.js for sound management

### Requirement: Movement sound effect
The system SHALL play a sound when pieces move left or right.

#### Scenario: Movement audio feedback
- **WHEN** the player moves a piece horizontally
- **THEN** the system plays the move sound effect

### Requirement: Rotation sound effect
The system SHALL play a sound when pieces rotate.

#### Scenario: Rotation audio feedback
- **WHEN** the player rotates a piece
- **THEN** the system plays the rotate sound effect

### Requirement: Soft drop sound effect
The system SHALL play a sound during soft drop.

#### Scenario: Soft drop audio feedback
- **WHEN** the player uses soft drop
- **THEN** the system plays the soft-drop sound effect

### Requirement: Hard drop sound effect
The system SHALL play a sound when pieces hard drop and lock.

#### Scenario: Hard drop audio feedback
- **WHEN** the player uses hard drop
- **THEN** the system plays the hard-drop sound effect

### Requirement: Line clear sound effect
The system SHALL play a sound when 1-3 lines are cleared.

#### Scenario: Standard line clear audio
- **WHEN** the player clears 1, 2, or 3 lines
- **THEN** the system plays the line-clear sound effect

### Requirement: Tetris sound effect
The system SHALL play a special sound when 4 lines are cleared.

#### Scenario: Tetris audio feedback
- **WHEN** the player clears 4 lines simultaneously
- **THEN** the system plays the tetris sound effect (distinct from standard line clear)

### Requirement: Level up sound effect
The system SHALL play a sound when the player levels up.

#### Scenario: Level up audio feedback
- **WHEN** the player reaches a new level
- **THEN** the system plays the level-up sound effect

### Requirement: Game over sound effect
The system SHALL play a sound when the game ends.

#### Scenario: Game over audio feedback
- **WHEN** the game ends
- **THEN** the system plays the game-over sound effect

### Requirement: Background music
The system SHALL play looping minimal techno music during gameplay.

#### Scenario: Music playback
- **WHEN** the game is in playing state
- **THEN** the system plays the background music on loop

#### Scenario: Music pause
- **WHEN** the game is paused or in menu
- **THEN** the system pauses the background music

### Requirement: Sound volume control
The system SHALL allow adjusting sound effects volume from 0-100%.

#### Scenario: Sound volume adjustment
- **WHEN** the player changes the sound volume setting
- **THEN** all sound effects play at the specified volume level

### Requirement: Music volume control
The system SHALL allow adjusting music volume from 0-100%.

#### Scenario: Music volume adjustment
- **WHEN** the player changes the music volume setting
- **THEN** the background music plays at the specified volume level

### Requirement: Mute toggle
The system SHALL allow muting all audio.

#### Scenario: Mute activation
- **WHEN** the player enables mute
- **THEN** the system silences all sound effects and music

#### Scenario: Mute deactivation
- **WHEN** the player disables mute
- **THEN** the system resumes playing audio at the configured volume levels

### Requirement: Browser audio policy compliance
The system SHALL handle browser autoplay restrictions gracefully.

#### Scenario: User interaction requirement
- **WHEN** the game attempts to play audio before user interaction
- **THEN** the system waits for a user action (button click) before playing sounds
