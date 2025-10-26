# Frontend Components - Part 1

## src/components/Header.jsx

```javascript
import { useCalendarStore } from '../stores/useCalendarStore';
import { useEventsStore } from '../stores/useEventsStore';

function Header() {
  const { currentMonth, prevMonth, nextMonth, goToToday } = useCalendarStore();
  const openModal = useEventsStore((state) => state.openModal);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
          <button
            onClick={goToToday}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Today
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              aria-label="Previous month"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <span className="text-lg font-semibold text-gray-900 min-w-[200px] text-center">
              {currentMonth.format('MMMM YYYY')}
            </span>
            
            <button
              onClick={nextMonth}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              aria-label="Next month"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => openModal()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            + Create Event
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
```

## src/components/EventChip.jsx

```javascript
import { formatTime } from '../utils/dateHelpers';
import { useEventsStore } from '../stores/useEventsStore';

function EventChip({ event }) {
  const openModal = useEventsStore((state) => state.openModal);

  return (
    <div
      onClick={() => openModal(event)}
      className="text-xs px-2 py-1 mb-1 rounded cursor-pointer hover:opacity-80 transition-opacity truncate"
      style={{ backgroundColor: event.color + '20', color: event.color }}
    >
      <span className="font-medium">{formatTime(event.startDateTime)}</span>
      {' '}
      <span>{event.title}</span>
    </div>
  );
}

export default EventChip;
```
