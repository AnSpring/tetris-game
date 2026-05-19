## Why

The Statistics page has a Back button that needs visual/functional improvements, and the Game Over screen has an excessive blur effect (10px) that reduces text readability and visual clarity.

## What Changes

- Fix the Back button styling/behavior on the Statistics page
- Reduce the backdrop-filter blur value from 10px to a more subtle 3-5px on the Game Over overlay

## Capabilities

### New Capabilities
<!-- None - these are styling/visual improvements -->

### Modified Capabilities
- `game-over-ui`: Reduce blur effect on overlay backdrop from 10px to improve readability
- `statistics-ui`: Fix Back button visual styling and interaction

## Impact

Affected files:
- `src/components/GameOver.css` - reduce backdrop-filter blur value
- `src/components/Statistics.jsx` or `src/components/Statistics.css` - back button fixes
