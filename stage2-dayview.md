# Stage 2: Day View Component

## src/components/DayView.jsx

Create this new component for the daily calendar view:

```javascript
import { useCalendarStore } from '../stores/useCalendarStore';
import { useEventsStore } from '../stores/useEventsStore';
import { formatTime } from '../utils/dateHelpers';
import dayjs from 'dayjs';

function DayView() {
  const { selectedDate } = useCalendarStore();
  const { events, openModal } = useEventsStore();

  // Generate time slots (24 hours with 30-minute intervals)
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = (i % 2) * 30;
    return { hour, minute };
  });

  // Get events for a specific time slot
  const getEventsForSlot = (hour, minute) => {
    return events.filter((event) => {
      const eventStart = dayjs(event.startDateTime);
      return (
        eventStart.isSame(selectedDate, 'day') &&
        eventStart.hour() === hour &&
        eventStart.minute() >= minute &&
        eventStart.minute() < minute + 30
      );
    });
  };

  // Get all-day events
  const getAllDayEvents = () => {
    return events.filter((event) => {
      const eventStart = dayjs(event.startDateTime);
      const eventEnd = dayjs(event.endDateTime);
      const duration = eventEnd.diff(eventStart, 'hour');
      return eventStart.isSame(selectedDate, 'day') && duration >= 24;
    });
  };

  const handleSlotClick = (hour, minute) => {
    const startTime = selectedDate.hour(hour).minute(minute);
    openModal({
      startDateTime: startTime.toISOString(),
      endDateTime: startTime.add(30, 'minute').toISOString(),
    });
  };

  const allDayEvents = getAllDayEvents();

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-blue-50">
        <div className="text-sm text-gray-500">
          {selectedDate.format('dddd')}
        </div>
        <div className="text-2xl font-bold text-gray-900">
          {selectedDate.format('MMMM D, YYYY')}
        </div>
      </div>

      {/* All-day events */}
      {allDayEvents.length > 0 && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="text-xs text-gray-500 mb-2">All-day</div>
          <div className="space-y-2">
            {allDayEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => openModal(event)}
                className="px-3 py-2 rounded cursor-pointer hover:opacity-80"
                style={{ backgroundColor: event.color + '20', color: event.color }}
              >
                <div className="font-medium">{event.title}</div>
                {event.description && (
                  <div className="text-xs mt-1 opacity-80">{event.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Time grid */}
      <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
        {timeSlots.map(({ hour, minute }, index) => {
          const slotEvents = getEventsForSlot(hour, minute);
          const timeLabel = dayjs().hour(hour).minute(minute).format('h:mm A');
          const isHourStart = minute === 0;

          return (
            <div
              key={index}
              className={`flex border-b ${isHourStart ? 'border-gray-300' : 'border-gray-100'}`}
              style={{ minHeight: '60px' }}
            >
              {/* Time label */}
              <div className={`w-20 p-2 text-xs text-gray-500 flex-shrink-0 ${!isHourStart && 'opacity-50'}`}>
                {isHourStart && timeLabel}
              </div>

              {/* Event area */}
              <div
                onClick={() => handleSlotClick(hour, minute)}
                className="flex-1 p-2 cursor-pointer hover:bg-gray-50 transition-colors border-l border-gray-200"
              >
                {slotEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(event);
                    }}
                    className="px-3 py-2 mb-2 rounded cursor-pointer hover:opacity-80 shadow-sm"
                    style={{ backgroundColor: event.color, color: 'white' }}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs opacity-90 mt-1">
                      {formatTime(event.startDateTime)} - {formatTime(event.endDateTime)}
                    </div>
                    {event.description && (
                      <div className="text-xs mt-1 opacity-80">{event.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DayView;
```

## Features

1. ✅ **Single day focus** - Shows detailed view of selected date
2. ✅ **30-minute intervals** - More granular time slots
3. ✅ **Large header** - Prominent display of current day
4. ✅ **All-day events section** - Separate area for full-day events
5. ✅ **Time labels** - Every 30 minutes with emphasis on hour starts
6. ✅ **Event details** - Shows title, time range, and description
7. ✅ **Click to create** - Click any time slot to create event
8. ✅ **Click to edit** - Click event to open edit modal
9. ✅ **Scrollable** - Time grid scrolls for full day view
10. ✅ **Color-coded events** - Visual event categorization

## Layout

- **Two-column layout**: Time labels on left, events on right
- **48 time slots**: 30-minute intervals for precise scheduling
- **Prominent header**: Shows full date information
- **All-day section**: Fixed at top when present
- **Wide event cards**: More space for event details

## Key Differences from Week View

- More vertical space per time slot
- Shows event descriptions
- 30-minute granularity instead of hourly
- Single column for better readability
- Larger, more detailed event cards
