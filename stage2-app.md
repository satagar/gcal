# Stage 2: Updated App Component with View Routing

## src/App.jsx

Replace your existing App.jsx with this version that includes view routing:

```javascript
import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import MonthView from './components/MonthView';
import WeekView from './components/WeekView';
import DayView from './components/DayView';
import EventModal from './components/EventModal';
import { useEventsStore } from './stores/useEventsStore';
import { useCalendarStore } from './stores/useCalendarStore';

function App() {
  const fetchEvents = useEventsStore((state) => state.fetchEvents);
  const currentMonth = useCalendarStore((state) => state.currentMonth);
  const currentView = useCalendarStore((state) => state.currentView);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents, currentMonth]);

  // Render the appropriate view based on currentView state
  const renderView = () => {
    switch (currentView) {
      case 'week':
        return <WeekView />;
      case 'day':
        return <DayView />;
      case 'month':
      default:
        return <MonthView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {renderView()}
      </main>
      <EventModal />
    </div>
  );
}

export default App;
```

## What Changed

1. ✅ Renamed `CalendarGrid` to `MonthView`
2. ✅ Added imports for `WeekView` and `DayView`
3. ✅ Added `currentView` from store
4. ✅ Created `renderView()` function that switches between views
5. ✅ View selection based on `currentView` state

## How It Works

- The `renderView()` function checks the `currentView` state from Zustand
- Based on the value ('month', 'week', or 'day'), it returns the appropriate component
- When user clicks a button in ViewSwitcher, the view automatically changes
- All views share the same event data and modal system

## View Flow

1. User clicks "Week" in ViewSwitcher
2. `setView('week')` updates Zustand store
3. `currentView` changes to 'week'
4. `renderView()` detects change and returns `<WeekView />`
5. React re-renders with new view
