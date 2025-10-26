# Stage 2 Implementation Guide

## Overview

Stage 2 adds Week View, Day View, and a View Switcher to your Google Calendar clone, making it much closer to the real Google Calendar experience.

---

## File Changes Summary

### New Files to Create:
1. `src/components/ViewSwitcher.jsx` - Toggle between Month/Week/Day
2. `src/components/WeekView.jsx` - Weekly calendar with hourly slots
3. `src/components/DayView.jsx` - Daily calendar with 30-min intervals

### Files to Update:
1. `src/stores/useCalendarStore.js` - Add view state and navigation
2. `src/components/Header.jsx` - Add ViewSwitcher and smart navigation
3. `src/App.jsx` - Add view routing logic

### Files to Rename:
1. `src/components/CalendarGrid.jsx` → `src/components/MonthView.jsx`

---

## Step-by-Step Implementation

### Step 1: Update Calendar Store (5 minutes)

Copy the code from **stage2-store.md** and replace your existing `useCalendarStore.js`.

**Key additions:**
- `currentView` state
- `selectedDate` for week/day views
- Navigation methods: `nextWeek`, `prevWeek`, `nextDay`, `prevDay`
- `setView` to switch views

### Step 2: Rename CalendarGrid to MonthView (2 minutes)

```bash
cd calendar-app/frontend/src/components
mv CalendarGrid.jsx MonthView.jsx
```

Then open `MonthView.jsx` and change:
- Function name: `CalendarGrid` → `MonthView`
- Export: `export default MonthView`

### Step 3: Create ViewSwitcher Component (5 minutes)

Create `src/components/ViewSwitcher.jsx` and copy code from **stage2-viewswitch.md**.

This component provides the Month/Week/Day toggle buttons.

### Step 4: Update Header Component (10 minutes)

Replace `src/components/Header.jsx` with code from **stage2-header.md**.

**New features:**
- Imports ViewSwitcher
- Smart navigation (changes based on view)
- Dynamic date display (shows appropriate format)
- Responsive layout

### Step 5: Create WeekView Component (15 minutes)

Create `src/components/WeekView.jsx` and copy code from **stage2-weekview.md**.

**Features:**
- 7-day weekly grid
- 24-hour time slots
- All-day events section
- Click to create/edit events

### Step 6: Create DayView Component (15 minutes)

Create `src/components/DayView.jsx` and copy code from **stage2-dayview.md**.

**Features:**
- Single-day focus
- 30-minute intervals
- Large header with date
- Detailed event cards

### Step 7: Update App Component (5 minutes)

Replace `src/App.jsx` with code from **stage2-app.md**.

**Changes:**
- Imports all three views
- View routing logic
- Renders appropriate view based on `currentView`

### Step 8 (Optional): Add Animations (10 minutes)

If you want smooth transitions, follow **stage2-animations.md**:

1. Install Framer Motion: `npm install framer-motion`
2. Update App.jsx with animated version
3. Update EventModal.jsx with animated version

**You can skip this step** if you want to keep it simple for now.

---

## Testing Your Implementation

### Test Month View:
- ✅ Click on any date - modal should open
- ✅ Create an event - should appear in month grid
- ✅ Click event chip - should open edit modal
- ✅ Navigate between months with arrows

### Test Week View:
- ✅ Click "Week" button in header
- ✅ Should show 7-day grid with hourly slots
- ✅ Click any time slot - modal with time pre-filled
- ✅ Navigate between weeks with arrows
- ✅ Today's column highlighted in blue

### Test Day View:
- ✅ Click "Day" button in header
- ✅ Should show single day with 30-min intervals
- ✅ Large header shows full date
- ✅ Click any time slot - modal with time pre-filled
- ✅ Navigate between days with arrows

### Test View Switching:
- ✅ Switch between Month/Week/Day seamlessly
- ✅ Date display updates correctly
- ✅ Events appear in all views
- ✅ Navigation arrows work for each view

---

## Commit Strategy

Commit incrementally as you complete each step:

```bash
# After Step 1
git add src/stores/useCalendarStore.js
git commit -m "feat: add view state and navigation to calendar store"

# After Step 2
git add src/components/MonthView.jsx
git rm src/components/CalendarGrid.jsx
git commit -m "refactor: rename CalendarGrid to MonthView"

# After Steps 3-4
git add src/components/ViewSwitcher.jsx src/components/Header.jsx
git commit -m "feat: add view switcher and update header with smart navigation"

# After Steps 5-6
git add src/components/WeekView.jsx src/components/DayView.jsx
git commit -m "feat: add week and day calendar views"

# After Step 7
git add src/App.jsx
git commit -m "feat: add view routing in App component"

# Optional Step 8
git add package.json package-lock.json src/App.jsx src/components/EventModal.jsx
git commit -m "feat: add smooth animations with Framer Motion"
```

---

## Troubleshooting

### Issue: "Cannot find module 'MonthView'"
**Solution:** Make sure you renamed CalendarGrid.jsx to MonthView.jsx and updated the import in App.jsx

### Issue: "ViewSwitcher is not defined"
**Solution:** Make sure you created ViewSwitcher.jsx and imported it in Header.jsx

### Issue: Week/Day views don't show events
**Solution:** Check that backend is running and events are being fetched. Look for console errors.

### Issue: Navigation buttons don't work
**Solution:** Verify useCalendarStore has all new navigation methods (nextWeek, prevWeek, etc.)

### Issue: Date display is wrong
**Solution:** Check the `getDateDisplay()` function in Header.jsx matches the code exactly

---

## What You'll Have After Stage 2

✅ **Three functional views**: Month, Week, and Day  
✅ **View switcher**: Easy toggle between views  
✅ **Smart navigation**: Context-aware prev/next buttons  
✅ **Enhanced UX**: Better time selection and event display  
✅ **Responsive design**: Works on all screen sizes  
✅ **Professional look**: Closer to Google Calendar  

---

## Next Steps After Stage 2

Once Stage 2 is complete and tested, you can optionally add:

- **Stage 3**: Mini calendar sidebar, drag-and-drop events
- **Stage 4**: Recurring events, search/filter
- **Stage 5**: Multiple calendars, event sharing

But Stage 2 gives you a fully functional, impressive Google Calendar clone that's ready to demo in interviews!

---

## Estimated Time

- **Without animations**: ~1 hour
- **With animations**: ~1.5 hours

Take your time, test each step, and commit frequently. Good luck! 🚀
