## Sporty Group Frontend Assessment
This repository contains my submission for the Sporty Group frontend assessment.

## Design Decisions

### 1) Component Architecture
- Built the UI using standalone components along with Angular latest features.
- Followed a component-based architecture where each component has a single responsibility to keep the code modular and reusable.

---

### 2) State Management
- Managed local UI state using Angular Signals.
- Signals are used for search/filter inputs, selected league state, and other UI-driven state to keep the logic simple and reactive.

---

### 3) Performance
- Enabled ChangeDetectionStrategy.OnPush across components to reduce unnecessary change detection cycles.
- Used signals to keep UI updates efficient and predictable.


### 4) Service Layer
Created a dedicated LeagueService to:
  - Centralize all API calls
  - Handle response mapping
  - Implemented *badge request caching per league ID to prevent duplicate network calls and improve responsiveness.


## AI Tool Usage
I used Gemini for:
- UI/UX guidance: layout suggestions, spacing, card and modal styling ideas, and overall dashboard structure.
- Technical support: clarifications on Angular Signals and resolving blockers during development.
