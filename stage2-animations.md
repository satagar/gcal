# Stage 2: Animations with Framer Motion (Optional Enhancement)

## Installation

First, install Framer Motion:

```bash
cd calendar-app/frontend
npm install framer-motion
```

## Enhanced App.jsx with Animations

Replace App.jsx with this animated version:

```javascript
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  // Animation variants for view transitions
  const viewVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

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
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            variants={viewVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
      <EventModal />
    </div>
  );
}

export default App;
```

## Enhanced EventModal.jsx with Animations

Update the modal to have smooth open/close animations:

```javascript
// Add this import at the top
import { motion, AnimatePresence } from 'framer-motion';

// Replace the return statement with this animated version:
return (
  <AnimatePresence>
    {isModalOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Rest of modal content stays the same */}
          </motion.div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);
```

## Animation Features

1. ✅ **View Transitions**: Smooth fade and slide when switching views
2. ✅ **Modal Animations**: Scale and fade in/out effects
3. ✅ **Backdrop Fade**: Background overlay fades smoothly
4. ✅ **Exit Animations**: Components animate out before unmounting

## Animation Configuration

- **Duration**: 0.3s for views, 0.2s for modal
- **Easing**: easeInOut for views, easeOut for modal
- **Direction**: Horizontal slide for views (left/right)
- **Scale**: Modal scales from 95% to 100%

## Why Framer Motion?

- Declarative animation API
- Smooth, performant animations
- Automatic cleanup
- Works great with React
- Small bundle size (~30KB)

## Optional: Skip Animations

If you want to keep Stage 2 simple and skip animations, just use the non-animated App.jsx version from stage2-app.md. The calendar will work perfectly without animations.
