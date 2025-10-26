# Stage 2: Rename CalendarGrid to MonthView

## src/components/MonthView.jsx

Rename your existing `CalendarGrid.jsx` to `MonthView.jsx`. The content stays exactly the same:

```javascript
import { useCalendarStore } from '../stores/useCalendarStore';
import { useEventsStore } from '../stores/useEventsStore';
import { generateMonthDays, getEventsForDate, isToday, isCurrentMonth } from '../utils/dateHelpers';
import EventChip from './EventChip';
import clsx from 'clsx';

function MonthView() {
  const currentMonth = useCalendarStore((state) => state.currentMonth);
  const events = useEventsStore((state) => state.events);
  const openModal = useEventsStore((state) => state.openModal);
  
  const days = generateMonthDays(currentMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDateClick = (date) => {
    // Open modal with pre-filled date
    openModal({
      startDateTime: date.hour(9).minute(0).toISOString(),
      endDateTime: date.hour(10).minute(0).toISOString(),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Week day headers */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDays.map((day) => (
          <div
            key={day}
            className="py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-200 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 auto-rows-fr" style={{ minHeight: '600px' }}>
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(events, day);
          const isTodayDate = isToday(day);
          const isInCurrentMonth = isCurrentMonth(day, currentMonth);

          return (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              className={clsx(
                'border-r border-b border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors',
                'min-h-[100px]',
                !isInCurrentMonth && 'bg-gray-50 text-gray-400',
                'last:border-r-0'
              )}
            >
              <div
                className={clsx(
                  'text-sm font-medium mb-2 w-7 h-7 flex items-center justify-center rounded-full',
                  isTodayDate && 'bg-blue-600 text-white',
                  !isTodayDate && isInCurrentMonth && 'text-gray-900',
                  !isTodayDate && !isInCurrentMonth && 'text-gray-400'
                )}
              >
                {day.date()}
              </div>

              <div className="space-y-1 overflow-hidden">
                {dayEvents.slice(0, 3).map((event) => (
                  <EventChip key={event.id} event={event} />
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 px-2">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MonthView;
```

## Action Required

1. Rename `src/components/CalendarGrid.jsx` to `src/components/MonthView.jsx`
2. Change the function name from `CalendarGrid` to `MonthView`
3. Update export from `export default CalendarGrid` to `export default MonthView`

## Why This Change?

- Better naming convention for multiple views
- Consistent with WeekView and DayView naming
- Makes the codebase more organized and readable
