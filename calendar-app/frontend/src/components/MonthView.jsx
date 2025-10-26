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
    openModal({
      startDateTime: date.hour(9).minute(0).toISOString(),
      endDateTime: date.hour(10).minute(0).toISOString(),
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      {/* Week day headers */}
      <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
        {weekDays.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs font-medium uppercase tracking-wide border-r border-gray-200 last:border-r-0"
            style={{ color: 'var(--text-secondary)' }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7" style={{ minHeight: '600px' }}>
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(events, day);
          const isTodayDate = isToday(day);
          const isInCurrentMonth = isCurrentMonth(day, currentMonth);

          return (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              className={clsx(
                'border-r border-b p-2 cursor-pointer transition-colors min-h-[120px] last:border-r-0',
                !isInCurrentMonth && 'bg-gray-50',
                isInCurrentMonth && 'hover:bg-gray-50'
              )}
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="flex justify-center mb-2">
                <div
                  className={clsx(
                    'w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all',
                    isTodayDate 
                      ? 'font-medium text-white' 
                      : isInCurrentMonth
                        ? 'font-normal hover:bg-gray-200'
                        : 'font-normal text-gray-400'
                  )}
                  style={isTodayDate ? {
                    backgroundColor: 'var(--color-primary)',
                    color: 'white'
                  } : {}}
                >
                  {day.date()}
                </div>
              </div>

              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <EventChip key={event.id} event={event} />
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs px-1 py-0.5 hover:bg-gray-100 rounded cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
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
