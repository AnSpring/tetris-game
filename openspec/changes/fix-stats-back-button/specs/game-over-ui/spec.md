## ADDED Requirements

### Requirement: Game Over overlay blur effect
The Game Over overlay backdrop-filter blur SHALL be set to 4px to maintain visual depth while ensuring text readability.

#### Scenario: Game Over screen displays with appropriate blur
- **WHEN** the game ends and the Game Over overlay appears
- **THEN** the backdrop-filter blur value SHALL be 4px
- **THEN** the overlay background text remains readable

#### Scenario: Blur maintains neon aesthetic
- **WHEN** the Game Over overlay is visible
- **THEN** the blur effect SHALL provide visual separation from background
- **THEN** the neon glow effects on text and borders remain clear and readable
