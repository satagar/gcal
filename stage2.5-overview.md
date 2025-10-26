# Stage 2.5: Visual Polish - Google Calendar Styling

## Overview

This stage focuses on improving the visual appearance to match Google Calendar's clean, modern design. We'll update colors, spacing, fonts, and overall UI to look professional.

---

## Key Visual Improvements

### 1. **Color Palette** (Based on Google Calendar)
- **Primary Blue**: `#1a73e8` (Google Blue for active states)
- **Light Blue**: `#e8f0fe` (Hover states, today highlight)
- **Border Gray**: `#dadce0` (Dividers, borders)
- **Text Primary**: `#3c4043` (Main text)
- **Text Secondary**: `#5f6368` (Secondary text, time labels)
- **Background**: `#ffffff` (Cards)
- **Subtle Gray**: `#f8f9fa` (Page background)

### 2. **Typography**
- Use system fonts: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto`
- Smaller, lighter time labels
- Better font weights (500 for headers, 400 for body)

### 3. **Spacing & Layout**
- Tighter time slot heights (48px instead of 60px)
- Reduced padding for cleaner look
- Consistent border widths (1px)
- Better event card spacing

### 4. **Event Cards**
- Rounded corners (4px)
- Better shadows for depth
- Proper text truncation
- Color-coded left border accent

---

## Updated Components

Add precise styling guidance so implementers can update components consistently.

- Design tokens (CSS variables)
  - --color-primary: #1a73e8
  - --color-primary-100: #e8f0fe
  - --color-border: #dadce0
  - --text-primary: #3c4043
  - --text-secondary: #5f6368
  - --bg-card: #ffffff
  - --bg-page: #f8f9fa
  - --radius-sm: 4px
  - --shadow-subtle: 0 1px 2px rgba(60,64,67,0.08)

- Tailwind / utility classes (if using Tailwind)
  - Add to theme.extend.colors: primary: '#1a73e8', primary-100: '#e8f0fe', border-gray: '#dadce0', subtle-gray: '#f8f9fa'
  - Add to theme.extend.borderRadius: sm: '4px'
  - Use utilities:
    - Event card: `bg-white rounded-sm shadow-sm border-l-4 border-primary/90 overflow-hidden`
    - Today highlight: `bg-primary-100` on the day cell
    - Time label: `text-sm text-text-secondary` (use color token mapping)

- Typography
  - Use system stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial
  - Header weight: 500; Body: 400; Time labels: 300-400 and smaller (text-sm)

- Spacing & Layout
  - Time slot height: 48px
  - Consistent gutters: 8px / 16px depending on element
  - Border widths: 1px using --color-border

- Event Cards
  - Rounded corners: var(--radius-sm)
  - Left accent: 4px solid color-coded (use event color variable + 10% darker for border)
  - Text rules: title 1 line clamp, description/time small and truncated with ellipsis
  - Shadows: use --shadow-subtle for elevation

- Grid & Day cells
  - Today cell: subtle background `--color-primary-100` and 1px border `--color-border`
  - Hover: light background fade for cells `rgba(26,115,232,0.06)`

- Accessibility
  - Maintain 4.5:1 contrast for primary actionable text where possible
  - Ensure keyboard focus states: outline with `2px solid rgba(26,115,232,0.25)` or ring utilities
  - Use meaningful aria labels on events and controls (role="button" with aria-label)

- Responsive behavior
  - Collapse to a single column list on narrow screens (mobile-first)
  - Reduce time slot height on very small screens to 40px if needed
  - Ensure event popovers are anchored and stay within viewport

### Implementation checklist
- [ ] Add CSS variables to root and map to Tailwind theme (if used)
- [ ] Update global font stack and baseline line-heights
- [ ] Adjust time slot heights and grid gutters
- [ ] Update EventCard component styles: left accent, rounded corners, truncation
- [ ] Implement today and hover states for day cells
- [ ] Add keyboard focus styles and verify color contrast
- [ ] Test responsive behavior on mobile widths

### Example CSS tokens (to copy into `index.css` or global stylesheet)

:root {
  --color-primary: #1a73e8;
  --color-primary-100: #e8f0fe;
  --color-border: #dadce0;
  --text-primary: #3c4043;
  --text-secondary: #5f6368;
  --bg-card: #ffffff;
  --bg-page: #f8f9fa;
  --radius-sm: 4px;
  --shadow-subtle: 0 1px 2px rgba(60,64,67,0.08);
}

/* Example event card utility */
.event-card {
  background: var(--bg-card);
  border-left: 4px solid var(--color-primary);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-subtle);
  overflow: hidden;
}

### Tailwind config (suggested additions)

Add the following to `theme.extend` in `tailwind.config.js`:

```js
colors: {
  primary: '#1a73e8',
  'primary-100': '#e8f0fe',
  'border-gray': '#dadce0',
  'subtle-gray': '#f8f9fa',
  'text-primary': '#3c4043',
  'text-secondary': '#5f6368'
},
borderRadius: {
  sm: '4px'
}
```

Also consider adding a safelist for dynamic event color classes and enabling JIT if not already enabled.

### Global CSS examples (copy into `frontend/src/index.css` or `frontend/src/App.css`)

```css
:root {
  --color-primary: #1a73e8;
  --color-primary-100: #e8f0fe;
  --color-border: #dadce0;
  --text-primary: #3c4043;
  --text-secondary: #5f6368;
  --bg-card: #ffffff;
  --bg-page: #f8f9fa;
  --radius-sm: 4px;
  --shadow-subtle: 0 1px 2px rgba(60,64,67,0.08);
}

/* Time slot */
.time-slot {
  height: 48px;
  border-bottom: 1px solid var(--color-border);
  padding: 6px 8px;
}

/* Day cell */
.day-cell--today {
  background: var(--color-primary-100);
  border: 1px solid var(--color-border);
}
.day-cell:hover { background: rgba(26,115,232,0.06); }

/* Event card */
.event-card {
  background: var(--bg-card);
  border-left: 4px solid var(--color-primary);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-subtle);
  overflow: hidden;
  padding: 6px 8px;
  display: block;
}
.event-title {
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.event-meta {
  font-size: 12px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Focus state */
:focus {
  outline: 2px solid rgba(26,115,232,0.25);
  outline-offset: 2px;
}
```

### Component usage examples

- Event chip / card (React)

```jsx
// in EventChip.jsx or EventModal usage
return (
  <div className="event-card" role="button" tabIndex={0} aria-label={`Event: ${title}`}>
    <div className="event-title">{title}</div>
    <div className="event-meta">{timeLabel}</div>
  </div>
)
```

- Day cell (DayView.jsx)

```jsx
<div className={`day-cell ${isToday ? 'day-cell--today' : ''}`}>
  <div className="day-header">{dateLabel}</div>
  <div className="time-slots">
    {slots.map(s => <div key={s} className="time-slot" />)}
  </div>
</div>
```

### Small implementation notes
- Map event color to the left border by setting inline style `style={{ borderLeftColor: event.color }}` for dynamic colors.
- Use CSS `line-clamp` or utility classes to enforce single-line title truncation: `overflow-hidden; text-overflow: ellipsis; white-space: nowrap;`.
- Update `useCalendarStore` or event rendering to pass a `color` prop for each event.

