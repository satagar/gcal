import { useCalendarStore } from '../stores/useCalendarStore';
import { useEventsStore } from '../stores/useEventsStore';
import { formatTime } from '../utils/dateHelpers';
import clsx from 'clsx';
import dayjs from 'dayjs';

function WeekView() {
  const { selectedDate } = useCalendarStore();
  const { events, openModal } = useEventsStore();

  // Generate 7 days starting from Sunday of the selected week
  const weekStart = selectedDate.startOf('week');
  const weekDays = Array.from({ length: 7 }, (_, i) => weekStart.add(i, 'day'));

  // Generate time slots (24 hours)
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  // Get events for a specific day and hour
  const getEventsForSlot = (day, hour) => {
    return events.filter((event) => {
      const eventStart = dayjs(event.startDateTime);
      return eventStart.isSame(day, 'day') && eventStart.hour() === hour;
    });
  };

  // Get all-day events for a specific day
  const getAllDayEvents = (day) => {
    return events.filter((event) => {
      const eventStart = dayjs(event.startDateTime);
      const eventEnd = dayjs(event.endDateTime);
      const duration = eventEnd.diff(eventStart, 'hour');
      return eventStart.isSame(day, 'day') && duration >= 24;
    });
  };

  const handleSlotClick = (day, hour) => {
    openModal({
      startDateTime: day.hour(hour).minute(0).toISOString(),
      endDateTime: day.hour(hour + 1).minute(0).toISOString(),
    });
  };

  const isToday = (day) => day.isSame(dayjs(), 'day');

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* All-day events section */}
      <div className="border-b border-gray-200">
        <div className="grid grid-cols-8">
          <div className="p-2 text-xs text-gray-500 border-r border-gray-200">All-day</div>
          {weekDays.map((day, index) => {
            const allDayEvents = getAllDayEvents(day);
            return (
              <div key={index} className="p-2 border-r border-gray-200 last:border-r-0 min-h-[60px]">
                {allDayEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => openModal(event)}
                    className="text-xs px-2 py-1 mb-1 rounded cursor-pointer hover:opacity-80 truncate"
                    style={{ backgroundColor: event.color + '20', color: event.color }}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Week header */}
      <div className="grid grid-cols-8 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="p-2" /> {/* Empty cell for time column */}
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={clsx(
              'p-2 text-center border-r border-gray-200 last:border-r-0',
              isToday(day) && 'bg-blue-50'
            )}
          >
            <div className="text-xs text-gray-500">{day.format('ddd')}</div>
            <div
              className={clsx(
                'text-lg font-semibold mt-1',
                isToday(day) ? 'text-blue-600' : 'text-gray-900'
              )}
            >
              {day.date()}
            </div>
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
        {timeSlots.map((hour) => (
          <div key={hour} className="grid grid-cols-8 border-b border-gray-200" style={{ minHeight: '60px' }}>
            {/* Time label */}
            <div className="p-2 text-xs text-gray-500 border-r border-gray-200">
              {dayjs().hour(hour).minute(0).format('h A')}
            </div>

            {/* Day cells */}
            {weekDays.map((day, dayIndex) => {
              const slotEvents = getEventsForSlot(day, hour);
              return (
                <div
                  key={dayIndex}
                  onClick={() => handleSlotClick(day, hour)}
                  className="border-r border-gray-200 last:border-r-0 p-1 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  {slotEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(event);
                      }}
                      className="text-xs px-2 py-1 mb-1 rounded cursor-pointer hover:opacity-80"
                      style={{ backgroundColor: event.color, color: 'white' }}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="text-[10px] opacity-90">
                        {formatTime(event.startDateTime)}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeekView;
