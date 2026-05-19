## Context

The Statistics page currently has a Back button with the text "← Back" where the arrow is too small compared to the bold "Press Start 2P" font used for the text, creating a visual imbalance. The Game Over overlay uses a backdrop-filter blur of 10px which is excessive and reduces text readability.

Both are simple CSS fixes that don't require architectural changes or new dependencies.

## Goals / Non-Goals

**Goals:**
- Balance the visual weight of the Back button arrow with the text by increasing arrow size
- Reduce Game Over backdrop-filter blur from 10px to 3-5px for better readability
- Maintain the existing retro/neon aesthetic

**Non-Goals:**
- Changing the Back button functionality or behavior
- Redesigning the Statistics or Game Over layouts
- Modifying any other UI components

## Decisions

### Back Button Arrow Size

**Decision**: Wrap the arrow in a `<span>` with font-size 16px (vs the button's 10px) while keeping "Back" text at 10px.

**Rationale**: The "Press Start 2P" font renders the arrow character (←) too small at 10px. By wrapping it in a separate span with 16px font-size, the arrow achieves visual balance with the text weight. Testing confirmed 16px provides the right proportion.

**Alternative considered**: Using a CSS pseudo-element (::before) with a unicode arrow. Rejected because it complicates the JSX and the inline span approach is simpler.

### Game Over Blur Amount

**Decision**: Reduce `backdrop-filter: blur(10px)` to `blur(2px)` in `.gameover-overlay`.

**Rationale**: Initial design specified 4px, but user testing revealed that 2px provides better readability while still maintaining the overlay depth effect. The game-over-pulse animation on the heading creates additional visual effect, so a subtler blur works better.

**Alternative considered**: Removing blur entirely and increasing opacity. Rejected because the blur effect contributes to the neon aesthetic and depth perception.

## Risks / Trade-offs

[Different font rendering across browsers] → Test on Chrome, Firefox, Safari to ensure arrow size looks consistent

[Arrow span might affect button padding] → Verify button still looks balanced with the inline span element

## Implementation Notes

Files to modify:
1. `src/components/Statistics.jsx` - wrap arrow in span with inline style or className
2. `src/components/GameOver.css` - change blur value on line 8
