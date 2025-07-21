# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website (v2) built as a static site with Tailwind CSS. The site features both a traditional HTML layout and an interactive terminal interface. The project showcases Mackenzie Sampson's work experience, projects, and skills.

## Development Commands

### Build & Development
- `npm run build` - Compiles Tailwind CSS from `assets/css/main.css` to `output.css`
- No development server required - open `index.html` directly in browser for local development
- Watch mode: Use `npx tailwindcss -i ./assets/css/main.css -o output.css --watch` for auto-compilation during development

### Dependencies
- **Tailwind CSS v3.4.1** - Only dependency, used for styling
- No build tools, bundlers, or frameworks beyond Tailwind

## Architecture & Code Structure

### Main Components
1. **HTML Layout** (`index.html`) - Single-page portfolio with traditional sections:
   - Hero section with profile and links
   - Experience section (professional and personal projects)
   - Hobbies section
   - Uses Tailwind classes with inline styles for specific customizations

2. **Styling System**:
   - `assets/css/main.css` - Tailwind directives with custom CSS for terminal effects
   - `output.css` - Generated Tailwind output (never edit directly)
   - `tailwind.config.js` - Tailwind configuration with custom font families
   - Custom color scheme: `#463a2e` (brown) primary, with specific hover colors

3. **JavaScript Components**:
   - `assets/js/main.js` - Simple portfolio interactions (smooth scrolling, fade animations)
   - `assets/js/terminal.js` - Complex terminal emulator with command system

### Terminal System Architecture
The terminal (`terminal.js`) is the most complex component with these key systems:

- **Command System**: Object-based command registry with functions for `help`, `projects`, `contact`, `about`, `skills`, `resume`, `music`, `volume`, etc.
- **Audio Control**: Background music playback with volume controls
- **Mobile Support**: Touch gestures, keyboard handling, responsive layout adjustments
- **Command Panel**: Interactive bottom bar for mobile/touch users
- **State Management**: Command history, loading states, audio states
- **Auto-completion**: Tab completion for commands
- **Enhanced UX**: Typing animations, loading states, haptic feedback

### File Organization
```
/
├── index.html (main portfolio page)
├── output.css (generated Tailwind CSS)
├── package.json (dependencies)
├── tailwind.config.js (Tailwind config)
├── assets/
│   ├── css/main.css (source CSS with Tailwind directives)
│   ├── js/main.js (basic portfolio interactions)
│   ├── js/terminal.js (terminal emulator)
│   ├── audio/ (background music files)
│   ├── images/ (profile photos, project images)
│   └── resume/ (downloadable PDF resume)
```

## Key Implementation Notes

### Styling Approach
- Mix of Tailwind utility classes and inline styles
- Custom CSS variables for specific color overrides
- Uses Spectral and Merriweather fonts from Google Fonts
- Color scheme centered around `#463a2e` with consistent hover states

### Terminal Implementation
- Fully self-contained JavaScript application within the main site
- No external dependencies beyond DOM manipulation
- Extensive mobile optimization with touch support
- Command execution with async loading states
- Audio integration with HTML5 audio controls

### Content Management
- Static content embedded in JavaScript objects
- Project data, skills, and experience hard-coded in `terminal.js`
- Resume content duplicated between HTML and terminal systems
- Links and contact information maintained in multiple places

## Development Workflow

1. **Making Style Changes**: Edit `assets/css/main.css` → Run `npm run build` → Refresh browser
2. **Content Updates**: Edit `index.html` for main site OR `terminal.js` for terminal content
3. **Testing**: Open `index.html` directly in browser (no server required)
4. **Terminal Development**: Focus on `terminal.js` - includes comprehensive logging for debugging

## Browser Compatibility

- Uses modern JavaScript (ES6+, async/await)
- Requires HTML5 audio support for music features
- Intersection Observer API for animations
- Touch event handling for mobile
- Material Icons dependency from Google Fonts