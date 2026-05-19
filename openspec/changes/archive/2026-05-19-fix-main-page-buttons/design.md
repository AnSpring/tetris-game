## Context

The main menu uses a mix of `.menu-button` (cyan, primary) and `.menu-button.secondary` (magenta) classes. Currently:
- START GAME button: cyan border/glow, no explicit width
- VIEW CONTROLS, STATISTICS, SETTINGS: magenta border/glow, no explicit width

Button text length varies (10-13 characters), causing inconsistent widths. The neon/cyberpunk aesthetic uses glow effects, transparency, and the Press Start 2P font.

## Goals / Non-Goals

**Goals:**
- Uniform button widths for visual consistency
- Single cohesive color scheme (or intentional primary/secondary distinction)
- Maintain existing neon aesthetic and interaction effects (hover, active states)
- Minimal code changes

**Non-Goals:**
- Changing button functionality or behavior
- Redesigning the entire menu layout
- Modifying touch controls or other UI components
- Altering font, spacing between buttons, or animation timing

## Decisions

### Decision 1: Responsive Fixed Width for All Buttons
**Choice:** Set `width: 100%; max-width: 400px;` on `.menu-button` to ensure uniform sizing with mobile support  
**Rationale:** Current auto-width creates jagged edges. Fixed max-width creates clean alignment on desktop while adapting to smaller viewports.  
**Alternative Considered:** 
- `width: 400px` (strict fixed) - rejected because it breaks on mobile screens
- `min-width` - rejected because buttons would still vary if content exceeds minimum

### Decision 2: Color Scheme Approach
**Choice:** Keep cyan as primary accent, use cyan for all buttons OR establish clear primary/secondary hierarchy  
**Rationale:** Two equally weighted colors (cyan/magenta) compete visually. Options:
- **Option A (Unified):** All buttons cyan - simplest, cleanest
- **Option B (Hierarchical):** START GAME cyan (primary action), others magenta (secondary)

Recommend **Option A** for visual simplicity, but defer to user preference.

**Alternative Considered:** Introduce gradient or third color - rejected as overcomplicating the aesthetic

### Decision 3: Implementation Approach
**Choice:** CSS-only changes to `.menu-button` and `.menu-button.secondary` rules  
**Rationale:** No JSX changes needed, purely presentational fix  
**Alternative Considered:** Refactor button component - rejected as unnecessary for styling fix

## Risks / Trade-offs

**[Fixed width may not work on very small screens]** → Current design uses `padding: 20px`, already assumes reasonable viewport. Mobile responsiveness can be addressed separately if needed.

**[All-cyan scheme reduces visual hierarchy]** → If secondary actions need distinction, can use opacity/border style instead of color. User testing recommended.

**[Hover effects may need adjustment with width change]** → Ripple effect (`::before` pseudo-element) sized at 300px should still work, but verify visually.
