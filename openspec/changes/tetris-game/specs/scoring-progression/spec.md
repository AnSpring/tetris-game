## ADDED Requirements

### Requirement: Classic scoring formula
The system SHALL award points based on lines cleared and level using the classic formula.

#### Scenario: Single line clear
- **WHEN** the player clears exactly 1 line
- **THEN** the system awards 40 × current level points

#### Scenario: Double line clear
- **WHEN** the player clears exactly 2 lines
- **THEN** the system awards 100 × current level points

#### Scenario: Triple line clear
- **WHEN** the player clears exactly 3 lines
- **THEN** the system awards 300 × current level points

#### Scenario: Tetris (4 lines)
- **WHEN** the player clears exactly 4 lines
- **THEN** the system awards 1200 × current level points

### Requirement: Soft drop bonus
The system SHALL award 1 point per cell for soft drop movement.

#### Scenario: Soft drop scoring
- **WHEN** the player uses soft drop to move the piece down N cells
- **THEN** the system awards N points

### Requirement: Hard drop bonus
The system SHALL award 2 points per cell for hard drop distance.

#### Scenario: Hard drop scoring
- **WHEN** the player uses hard drop and the piece falls N cells
- **THEN** the system awards 2N points

### Requirement: Level progression
The system SHALL increase the level every 10 lines cleared.

#### Scenario: Level up at 10 lines
- **WHEN** the total lines cleared reaches a multiple of 10
- **THEN** the system increments the level by 1

#### Scenario: Starting level selection
- **WHEN** the player starts a new game
- **THEN** the system allows selecting a starting level from 1 to 10

### Requirement: Gravity speed increase
The system SHALL decrease gravity delay as level increases.

#### Scenario: Level 1 gravity
- **WHEN** the game is at level 1
- **THEN** pieces fall with the slowest gravity speed

#### Scenario: Higher level gravity
- **WHEN** the level increases
- **THEN** the gravity timer interval decreases, making pieces fall faster

### Requirement: Score display update
The system SHALL update the score display immediately when points are awarded.

#### Scenario: Real-time score update
- **WHEN** the player earns points
- **THEN** the displayed score updates within one frame

### Requirement: Lines display update
The system SHALL update the lines cleared display immediately.

#### Scenario: Real-time lines update
- **WHEN** lines are cleared
- **THEN** the displayed lines count updates within one frame

### Requirement: Level display update
The system SHALL update the level display immediately when leveling up.

#### Scenario: Real-time level update
- **WHEN** the player levels up
- **THEN** the displayed level updates within one frame

### Requirement: Level up notification
The system SHALL provide visual and audio feedback when leveling up.

#### Scenario: Level up feedback
- **WHEN** the player levels up
- **THEN** the system plays a level-up sound effect and displays a brief screen flash
