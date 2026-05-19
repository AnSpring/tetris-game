## ADDED Requirements

### Requirement: Back button arrow visual balance
The Back button arrow SHALL be visually balanced with the "Back" text by increasing the arrow font-size relative to the text.

#### Scenario: Arrow displays with appropriate size
- **WHEN** the Statistics page renders with the Back button
- **THEN** the arrow character (←) SHALL be rendered at 14-16px font-size
- **THEN** the "Back" text SHALL remain at 10px font-size
- **THEN** the arrow and text SHALL appear visually balanced

#### Scenario: Arrow maintains retro aesthetic
- **WHEN** viewing the Back button on the Statistics page
- **THEN** the arrow SHALL use the same "Press Start 2P" font family
- **THEN** the arrow SHALL have the same neon glow effects as the button text
- **THEN** the visual style SHALL remain consistent with the retro/neon theme
