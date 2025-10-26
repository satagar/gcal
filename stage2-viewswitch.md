# Stage 2: View Switcher Component

## src/components/ViewSwitcher.jsx

Create this new component for switching between Month/Week/Day views:

```javascript
import { useCalendarStore } from '../stores/useCalendarStore';
import clsx from 'clsx';

function ViewSwitcher() {
  const { currentView, setView } = useCalendarStore();

  const views = [
    { id: 'month', label: 'Month' },
    { id: 'week', label: 'Week' },
    { id: 'day', label: 'Day' }
  ];

  return (
    <div className="inline-flex rounded-lg border border-gray-300 bg-white">
      {views.map((view) => (
        <button
          key={view.id}
          onClick={() => setView(view.id)}
          className={clsx(
            'px-4 py-2 text-sm font-medium transition-colors',
            'first:rounded-l-lg last:rounded-r-lg',
            currentView === view.id
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          )}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
}

export default ViewSwitcher;
```

## Features

- ✅ Three-button toggle for Month/Week/Day
- ✅ Active state highlighting (blue background)
- ✅ Smooth hover effects
- ✅ Rounded corners and borders
- ✅ Integrates with Zustand store

## Usage

This component will be added to the Header component to allow users to switch between different calendar views.
