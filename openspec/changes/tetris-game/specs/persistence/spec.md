## ADDED Requirements

### Requirement: High score persistence
The system SHALL save the highest score to localStorage.

#### Scenario: High score save
- **WHEN** a game ends with a score higher than the stored high score
- **THEN** the system updates the high score in localStorage

#### Scenario: High score retrieval
- **WHEN** the game loads
- **THEN** the system retrieves the high score from localStorage

### Requirement: Settings persistence
The system SHALL save user settings to localStorage.

#### Scenario: Volume settings save
- **WHEN** the player changes sound or music volume
- **THEN** the system saves the volume settings to localStorage

#### Scenario: Settings retrieval
- **WHEN** the game loads
- **THEN** the system retrieves volume settings from localStorage

### Requirement: Default values
The system SHALL use default values when localStorage is empty.

#### Scenario: First-time load
- **WHEN** the game loads with no localStorage data
- **THEN** the system initializes with default high score (0) and default volume (50%)

### Requirement: localStorage key namespacing
The system SHALL use prefixed keys to avoid conflicts.

#### Scenario: Key naming
- **WHEN** saving data to localStorage
- **THEN** the system uses keys prefixed with "tetris_" (e.g., "tetris_highScore", "tetris_soundVolume")

### Requirement: JSON serialization
The system SHALL serialize complex settings as JSON.

#### Scenario: Settings save format
- **WHEN** saving settings to localStorage
- **THEN** the system serializes the settings object as JSON

#### Scenario: Settings load format
- **WHEN** loading settings from localStorage
- **THEN** the system parses the JSON string back to an object

### Requirement: Error handling
The system SHALL handle localStorage errors gracefully.

#### Scenario: localStorage unavailable
- **WHEN** localStorage is disabled or unavailable
- **THEN** the system continues functioning without persistence

#### Scenario: Parse errors
- **WHEN** localStorage contains invalid JSON
- **THEN** the system falls back to default values and logs the error

### Requirement: Real-time high score update
The system SHALL update the displayed high score immediately when beaten.

#### Scenario: High score display update
- **WHEN** the current game score exceeds the high score
- **THEN** the UI updates the high score display immediately
