## Context

Building a browser-based Tetris game from scratch as a personal project. The game needs to deliver authentic classic Tetris gameplay while incorporating a distinctive Soviet visual aesthetic and modern audio design. The implementation must balance nostalgic design choices (discrete movement, muted colors, minimal animations) with modern web development practices (React components, state management, performant rendering).

**Current State:** Empty project - no existing codebase.

**Constraints:**
- Desktop-focused (mobile optional for later phase)
- Must run in modern browsers with no backend
- Asset acquisition needed (8 SFX files + 1 music track)

**Stakeholders:** Personal project (solo developer)

## Goals / Non-Goals

**Goals:**
- Implement complete classic Tetris mechanics (10×20 field, 7 tetrominoes, line clearing, scoring)
- Achieve authentic Soviet aesthetic (muted colors, discrete animations, retro typography)
- Deliver responsive controls with DAS (Delayed Auto Shift) for precise/fast input
- Provide modern QoL features (hold piece, ghost piece, next preview, high score persistence)
- Maintain 60 FPS game loop with Canvas rendering
- Support background music and sound effects with volume controls

**Non-Goals:**
- Mobile touch controls (defer to later phase)
- Multiplayer or online features
- Alternative game modes (Marathon, Sprint, Ultra) - future consideration
- Backend server or user accounts
- Modern particle effects or smooth animations (contradicts Soviet aesthetic)

## Decisions

### **Decision 1: React + Canvas hybrid architecture**

**Choice:** Use React for UI components (menus, score displays) + Canvas 2D for game rendering

**Rationale:**
- React provides declarative UI for static elements (score, level, controls)
- Canvas gives full control over game field rendering and performance
- Separation of concerns: React manages UI state, Canvas handles game loop

**Alternatives considered:**
- Pure Canvas (entire UI) - harder to build menus and layouts
- React + DOM rendering for game field - poor performance for 60 FPS updates
- Vanilla JS - loses component benefits, more boilerplate

**Why this wins:** Best balance of developer ergonomics and runtime performance.

---

### **Decision 2: useReducer for game state management**

**Choice:** Centralize all game logic in a reducer with typed actions

**Rationale:**
- Predictable state transitions (action → new state)
- Easier testing (pure functions)
- Supports time-travel debugging (replay actions)
- Clear action types document all possible game events

**Alternatives considered:**
- useState per field - leads to scattered logic and timing issues
- External state library (Redux) - overkill for single-component state
- Class-based game object - harder to integrate with React lifecycle

**Why this wins:** Fits React patterns, enables testing, keeps logic centralized.

---

### **Decision 3: 7-bag randomizer for piece generation**

**Choice:** Generate bags of all 7 pieces, shuffle each bag, guarantee all pieces appear before repeating

**Rationale:**
- Fairer than pure random (no long droughts or floods)
- Classic modern Tetris guideline
- Prevents frustrating gameplay (e.g., 20 pieces without an I-piece)

**Alternatives considered:**
- Pure random - can create unfair droughts
- History-based random (4-piece history) - more complex, still allows droughts

**Why this wins:** Industry standard, simple to implement, best player experience.

---

### **Decision 4: Howler.js for audio management**

**Choice:** Use Howler.js library instead of raw Web Audio API

**Rationale:**
- Simpler API than Web Audio (play/pause/volume in 1-2 lines)
- Cross-browser audio format fallbacks handled automatically
- Built-in sprite support for bundling SFX
- Good documentation and maintenance

**Alternatives considered:**
- Web Audio API - lower-level, more boilerplate, harder to debug
- HTML5 `<audio>` tags - limited control, mobile restrictions

**Why this wins:** Balances simplicity with features needed for game audio.

---

### **Decision 5: Fixed timestep game loop with requestAnimationFrame**

**Choice:** Use `requestAnimationFrame` with accumulator pattern for fixed 60 FPS logic updates

```javascript
let accumulator = 0;
const TICK_RATE = 1000 / 60;

function gameLoop(currentTime) {
  const deltaTime = currentTime - lastTime;
  accumulator += deltaTime;
  
  while (accumulator >= TICK_RATE) {
    dispatch({ type: 'TICK' }); // Fixed timestep
    accumulator -= TICK_RATE;
  }
  
  render(ctx, gameState); // Render latest state
  requestAnimationFrame(gameLoop);
}
```

**Rationale:**
- Decouples physics (fixed 60 Hz) from rendering (variable FPS)
- Deterministic gameplay (gravity falls at consistent rate regardless of frame drops)
- Standard pattern for browser game loops

**Alternatives considered:**
- `setInterval` - not synced to display refresh, can drift
- Variable timestep - harder to make deterministic, speed varies with FPS

**Why this wins:** Industry standard for browser games, deterministic behavior.

---

### **Decision 6: DAS (Delayed Auto Shift) implementation**

**Choice:** Implement DAS with 170ms initial delay + 30ms auto-repeat rate

**Rationale:**
- 170ms delay allows single taps without triggering repeat
- 30ms repeat enables fast horizontal scanning
- Matches classic Tetris feel (not too slow, not too fast)

**Implementation approach:**
- Track key-down timestamp
- First action fires immediately
- If key held > 170ms, fire repeat every 30ms
- Reset on key-up

**Alternatives considered:**
- No DAS (instant repeat) - too fast, no precision
- Browser default key repeat - inconsistent across platforms, too slow

**Why this wins:** Authentic feel, precise control for both tap and hold.

---

### **Decision 7: Vite as build tool**

**Choice:** Use Vite instead of Create React App (CRA)

**Rationale:**
- Faster dev server (instant HMR)
- Smaller production bundles
- Better ESM support
- CRA is no longer actively maintained

**Alternatives considered:**
- Create React App - slower, larger bundles, maintenance concerns
- Manual Webpack config - too much boilerplate for solo project

**Why this wins:** Modern, fast, maintained, good developer experience.

---

### **Decision 8: Framework-agnostic game logic in `src/game/`**

**Choice:** Separate pure JS game logic from React components

**Structure:**
```
src/game/
  ├── reducer.js    # Pure state transitions
  ├── physics.js    # Collision, rotation
  ├── scoring.js    # Score calculations
  └── renderer.js   # Canvas drawing
```

**Rationale:**
- Easier testing (no React dependency)
- Potential for future non-React ports
- Clearer separation of concerns
- Game logic can be tested in isolation

**Alternatives considered:**
- Mix game logic into React components - harder to test and reuse
- Monolithic game class - less functional, harder to reason about

**Why this wins:** Testability, portability, maintainability.

## Risks / Trade-offs

### **[Risk] Asset acquisition delays implementation**
**Mitigation:** Use placeholder sounds initially, implement audio system with simple beeps/tones. Replace with quality assets later.

---

### **[Risk] Canvas rendering performance on older browsers**
**Mitigation:** Target modern browsers (Chrome/Firefox/Safari last 2 versions). If performance issues arise, optimize by reducing redraw areas or lowering animation complexity.

---

### **[Trade-off] Soviet aesthetic limits visual feedback**
**Implication:** Discrete movement (no tweening) and minimal effects may feel less polished than modern games. Acceptable for authentic retro feel, but some users may expect smoother animations.

---

### **[Trade-off] No backend means limited high score features**
**Implication:** High scores stored in localStorage, per-device only. No global leaderboards or cross-device sync. Future enhancement would require backend infrastructure.

---

### **[Risk] Browser audio restrictions (autoplay policies)**
**Mitigation:** Require user interaction before playing audio (start game button). Provide clear "Unmute" option if audio fails. Document browser-specific audio limitations.

---

### **[Trade-off] Desktop-first design may limit mobile appeal**
**Implication:** Touch controls deferred to later phase. Initial release keyboard-only. Mobile users can play but with suboptimal UX.

## Migration Plan

**N/A** - New project, no existing system to migrate from.

**Deployment strategy:**
1. Build static assets with Vite (`npm run build`)
2. Deploy `dist/` folder to static hosting (GitHub Pages, Netlify, Vercel)
3. No server-side logic, no database, no rollback needed

## Open Questions

1. **Music sourcing:** Find CC-licensed minimal techno track or commission/generate custom music?
   - *Decision needed before Phase 6 (Audio)*

2. **Sound effects:** Use free SFX pack (e.g., freesound.org) or generate synthetic sounds with Web Audio?
   - *Decision needed before Phase 6 (Audio)*

3. **Typography:** Press Start 2P (more pixelated) vs VT323 (cleaner monospace)?
   - *Decision needed before Phase 5 (UI Polish)*

4. **Color palette finalization:** Use specific hex values from design doc or iterate during implementation?
   - *Can iterate during Phase 5 (UI)*

5. **Mobile touch controls:** If implemented, should they use virtual buttons or gesture-based (swipe to move/rotate)?
   - *Defer to Phase 8 (QoL) or beyond*
