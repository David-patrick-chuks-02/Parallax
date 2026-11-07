# Parallax Pitch Deck

## Interactive Web Presentation

Open `index.html` in a web browser for the full interactive pitch experience.

### Features
- 7 slides covering the problem, solution, market opportunity, and demo
- Click/tap to navigate between slides or use arrow keys
- Progress bar and slide counter
- Professional dark theme with gradient accents
- Responsive design for all screen sizes

### Slides

1. **Hero** — Parallax: Move money, anywhere
2. **Problem** — Why crypto payouts are broken for freelancers
3. **Solution** — Parallax powered by Blaaiz
4. **Use Cases** — Instant payouts, international transfers, escrow protection
5. **Tech Stack** — Built on real Blaaiz infrastructure
6. **Market** — Why now? Global creator economy, cross-border hiring
7. **Demo** — Live walkthrough and close

### Export to PDF

#### Option 1: Browser Print (Recommended)
1. Open `index.html` in your browser
2. Press **Cmd+P** (Mac) or **Ctrl+P** (Windows/Linux)
3. Select "Save as PDF"
4. Configure:
   - Format: A4 (or Tabloid for landscape)
   - Margins: None (0mm)
   - Print backgrounds: ON
5. Save as `Parallax-Pitch.pdf`

#### Option 2: Command Line (macOS)
```bash
# Using macOS print to PDF with Chrome
open pitch/index.html -a "Google Chrome" --args --headless --disable-gpu --print-to-pdf="Parallax-Pitch.pdf"
```

### Keyboard Navigation
- **Right arrow** or **Click right zone** → Next slide
- **Left arrow** or **Click left zone** → Previous slide
- **Dots** at bottom → Jump to slide

### Customization

Edit `index.html` directly to:
- Change colors: Update CSS variables in `:root`
- Modify content: Edit slide text
- Adjust timing: Change transition duration in `.slide` CSS
- Add/remove slides: Duplicate a `<section class="slide">` block

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Works on mobile (touch navigation)
