# Stage 2: Updated Calendar Store

## src/stores/useCalendarStore.js

Replace the existing file with this enhanced version that includes view management:

```javascript
import { create } from 'zustand';
import dayjs from 'dayjs';

export const useCalendarStore = create((set) => ({
  currentMonth: dayjs(),
  selectedDate: dayjs(),
  currentView: 'month', // 'month' | 'week' | 'day'
  
  setCurrentMonth: (month) => set({ currentMonth: month }),
  
  nextMonth: () => set((state) => ({
    currentMonth: state.currentMonth.add(1, 'month')
  })),
  
  prevMonth: () => set((state) => ({
    currentMonth: state.currentMonth.subtract(1, 'month')
  })),
  
  nextWeek: () => set((state) => ({
    selectedDate: state.selectedDate.add(1, 'week'),
    currentMonth: state.selectedDate.add(1, 'week')
  })),
  
  prevWeek: () => set((state) => ({
    selectedDate: state.selectedDate.subtract(1, 'week'),
    currentMonth: state.selectedDate.subtract(1, 'week')
  })),
  
  nextDay: () => set((state) => ({
    selectedDate: state.selectedDate.add(1, 'day'),
    currentMonth: state.selectedDate.add(1, 'day')
  })),
  
  prevDay: () => set((state) => ({
    selectedDate: state.selectedDate.subtract(1, 'day'),
    currentMonth: state.selectedDate.subtract(1, 'day')
  })),
  
  goToToday: () => set({ 
    currentMonth: dayjs(),
    selectedDate: dayjs()
  }),
  
  setSelectedDate: (date) => set({ 
    selectedDate: date,
    currentMonth: date
  }),
  
  setView: (view) => set({ currentView: view }),
}));
```

## What Changed

1. ✅ Added `currentView` state to track Month/Week/Day view
2. ✅ Added `selectedDate` for Week and Day views
3. ✅ Added navigation methods for week and day (`nextWeek`, `prevWeek`, `nextDay`, `prevDay`)
4. ✅ Added `setView` to switch between views
5. ✅ Updated `goToToday` and `setSelectedDate` to handle both month and selectedDate

## Key Features

- **View Management**: Switch between Month, Week, and Day views
- **Smart Navigation**: Different navigation for each view type
- **Date Tracking**: Maintains both current month and selected date for all views
