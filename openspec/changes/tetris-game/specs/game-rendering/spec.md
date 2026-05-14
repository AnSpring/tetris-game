## ADDED Requirements

### Requirement: Canvas rendering
The system SHALL render the game field using HTML5 Canvas 2D API.

#### Scenario: Canvas initialization
- **WHEN** the game component mounts
- **THEN** the system creates a canvas context for rendering

### Requirement: Game field rendering
The system SHALL render the 10×20 game field with a visible grid.

#### Scenario: Empty field display
- **WHEN** the game starts
- **THEN** the system renders an empty grid with subtle background lines

#### Scenario: Locked pieces display
- **WHEN** pieces have locked in the field
- **THEN** the system renders each locked block with its color and border

### Requirement: Block styling
The system SHALL render each tetromino block as 30×30 pixels with a thick border.

#### Scenario: Block appearance
- **WHEN** rendering a piece block
- **THEN** the system draws a 30×30px square with 2-3px border in a darker shade of the fill color

### Requirement: Active piece rendering
The system SHALL render the currently falling piece with its designated color.

#### Scenario: Current piece display
- **WHEN** a piece is actively falling
- **THEN** the system renders the piece at its current position with full opacity

### Requirement: Ghost piece rendering
The system SHALL render a semi-transparent outline showing where the active piece will land.

#### Scenario: Ghost piece display
- **WHEN** a piece is falling
- **THEN** the system renders an outline of the piece at the lowest valid position with 30% opacity

### Requirement: Color palette
The system SHALL use muted, desaturated colors for the Soviet aesthetic.

#### Scenario: Piece colors
- **WHEN** rendering tetromino pieces
- **THEN** the system uses the designated muted colors: I=dark cyan, O=dark yellow, T=dark purple, S=dark green, Z=dark red, J=dark blue, L=dark orange

### Requirement: Discrete animation
The system SHALL render piece movement without smooth transitions.

#### Scenario: Stepped movement
- **WHEN** a piece moves or rotates
- **THEN** the system renders the piece in its new position immediately without tweening

### Requirement: Line clear effect
The system SHALL display a brief flash effect when lines are cleared.

#### Scenario: Line clear visual feedback
- **WHEN** one or more lines are cleared
- **THEN** the system flashes the cleared lines for 2-3 frames before removing them

### Requirement: Frame rate
The system SHALL maintain 60 frames per second rendering.

#### Scenario: Consistent frame rate
- **WHEN** the game is running
- **THEN** the system renders at 60 FPS using requestAnimationFrame
