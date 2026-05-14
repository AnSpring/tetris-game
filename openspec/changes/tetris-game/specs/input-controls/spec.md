## ADDED Requirements

### Requirement: Left/right movement keys
The system SHALL allow piece movement using arrow keys or A/D keys.

#### Scenario: Left arrow movement
- **WHEN** the user presses the left arrow or A key
- **THEN** the system attempts to move the piece one column left

#### Scenario: Right arrow movement
- **WHEN** the user presses the right arrow or D key
- **THEN** the system attempts to move the piece one column right

### Requirement: Soft drop control
The system SHALL allow soft drop using down arrow or S key.

#### Scenario: Soft drop activation
- **WHEN** the user holds the down arrow or S key
- **THEN** the piece falls faster than normal gravity

### Requirement: Hard drop control
The system SHALL allow instant drop using the spacebar.

#### Scenario: Hard drop execution
- **WHEN** the user presses the spacebar
- **THEN** the piece immediately drops to the lowest position and locks

### Requirement: Clockwise rotation control
The system SHALL allow clockwise rotation using up arrow or W key.

#### Scenario: Clockwise rotation
- **WHEN** the user presses the up arrow or W key
- **THEN** the system rotates the piece 90 degrees clockwise

### Requirement: Counter-clockwise rotation control
The system SHALL allow counter-clockwise rotation using Z or Q key.

#### Scenario: Counter-clockwise rotation
- **WHEN** the user presses the Z or Q key
- **THEN** the system rotates the piece 90 degrees counter-clockwise

### Requirement: Hold piece control
The system SHALL allow holding the current piece using C or Shift key.

#### Scenario: Hold swap
- **WHEN** the user presses C or Shift and holding is allowed
- **THEN** the system swaps the current piece with the held piece

#### Scenario: Initial hold
- **WHEN** the user presses C or Shift with no held piece
- **THEN** the system stores the current piece and spawns the next piece

#### Scenario: Hold cooldown enforcement
- **WHEN** the user attempts to hold after already holding this turn
- **THEN** the system ignores the input

### Requirement: Pause control
The system SHALL allow pausing the game using P or Escape key.

#### Scenario: Pause activation
- **WHEN** the user presses P or Escape during gameplay
- **THEN** the system pauses the game and displays the pause menu

#### Scenario: Pause resumption
- **WHEN** the user presses P or Escape while paused
- **THEN** the system resumes gameplay

### Requirement: DAS (Delayed Auto Shift)
The system SHALL implement DAS with 170ms initial delay and 30ms auto-repeat rate.

#### Scenario: Single tap response
- **WHEN** the user taps and releases a movement key within 170ms
- **THEN** the piece moves once

#### Scenario: Auto-repeat activation
- **WHEN** the user holds a movement key for more than 170ms
- **THEN** the piece moves continuously every 30ms

#### Scenario: DAS reset on key release
- **WHEN** the user releases a movement key
- **THEN** the system resets the DAS timer

### Requirement: Key event handling
The system SHALL listen for keyboard events during gameplay.

#### Scenario: Keydown registration
- **WHEN** the user presses a game control key
- **THEN** the system immediately registers the input

#### Scenario: Key repeat prevention
- **WHEN** the browser triggers key repeat events
- **THEN** the system uses DAS logic instead of browser repeat
