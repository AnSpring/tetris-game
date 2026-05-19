## Why

The main menu buttons have inconsistent widths and mixed color schemes (cyan for "START GAME", magenta for all other buttons), creating a visually cluttered "fence-like" appearance. Uniform button styling will improve the visual hierarchy and polish of the menu interface.

## What Changes

- Standardize button widths across all main menu buttons (START GAME, VIEW CONTROLS, STATISTICS, SETTINGS)
- Establish a consistent color scheme for button styling
- Ensure proper alignment and spacing between menu buttons
- Maintain the existing neon/cyberpunk aesthetic while improving visual consistency

## Capabilities

### New Capabilities

- `menu-button-styling`: Defines visual styling requirements for main menu buttons including dimensions, colors, alignment, and spacing

### Modified Capabilities

<!-- No existing capabilities are being modified -->

## Impact

**Affected Files:**
- `src/components/Menu.css` - button styling rules (`.menu-button`, `.menu-button.secondary`)
- `src/components/Menu.jsx` - button class assignments (may need adjustment)

**No breaking changes** - purely visual improvements with no functional changes to button behavior or click handlers.
