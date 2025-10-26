import { useCalendarStore } from '../stores/useCalendarStore';
import { useEventsStore } from '../stores/useEventsStore';
import { formatTime } from '../utils/dateHelpers';
import clsx from 'clsx';
import dayjs from 'dayjs';

function WeekView() {
  const { selectedDate } = useCalendarStore();
  const { events, openModal } = useEventsStore();

  const weekStart = selectedDate.startOf('week');
  const weekDays = Array.from({ length: 7 }, (_, i) => weekStart.add(i, 'day'));
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForSlot = (day, hour) => {
    return events.filter((event) => {
      const eventStart = dayjs(event.startDateTime);
      return eventStart.isSame(day, 'day') && eventStart.hour() === hour;
    });
  };

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
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      {/* Week header - sticky */}
      <div className="grid grid-cols-8 border-b border-gray-200 bg-white sticky top-0 z-20">
        <div className="w-16" /> {/* Time column spacer */}
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={clsx(
              'py-3 text-center border-l border-gray-200 first:border-l-0',
              isToday(day) && 'bg-blue-50'
            )}
          >
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {day.format('ddd')}
            </div>
            <div
              className={clsx(
                'mt-1 w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-medium',
                isToday(day)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700'
              )}
            >
              {day.date()}
            </div>
          </div>
        ))}
      </div>

      {/* All-day events section */}
      {weekDays.some(day => getAllDayEvents(day).length > 0) && (
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-8">
            <div className="w-16 p-2 text-xs text-gray-500 font-medium border-r border-gray-200 flex items-center">
              All-day
            </div>
            {weekDays.map((day, index) => {
              const allDayEvents = getAllDayEvents(day);
              return (
                <div key={index} className="p-1.5 border-l border-gray-200 first:border-l-0 min-h-[48px]">
                  {allDayEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => openModal(event)}
                      className="px-2 py-1 mb-1 rounded text-xs font-medium cursor-pointer hover:shadow-md transition-shadow truncate"
                      style={{ 
                        backgroundColor: event.color, 
                        color: 'white',
                        borderLeft: `3px solid ${event.color}`
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Time grid */}
      <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
        {timeSlots.map((hour) => (
          <div 
            key={hour} 
            className="grid grid-cols-8 border-b border-gray-100 hover:bg-gray-50 transition-colors" 
            style={{ height: '48px' }}
          >
            {/* Time label */}
            <div className="w-16 pr-2 pt-1 text-right">
              <span className="text-xs text-gray-500 font-normal">
                {dayjs().hour(hour).minute(0).format('h A')}
              </span>
            </div>

            {/* Day cells */}
            {weekDays.map((day, dayIndex) => {
              const slotEvents = getEventsForSlot(day, hour);
              return (
                <div
                  key={dayIndex}
                  onClick={() => handleSlotClick(day, hour)}
                  className={clsx(
                    'border-l border-gray-200 first:border-l-0 px-1 py-0.5 cursor-pointer relative',
                    isToday(day) && 'bg-blue-50 bg-opacity-30'
                  )}
                >
                  {slotEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(event);
                      }}
                      className="rounded px-2 py-1 mb-1 cursor-pointer hover:shadow-md transition-shadow"
                      style={{ 
                        backgroundColor: event.color,
                        color: 'white',
                        borderLeft: `3px solid ${event.color}`,
                        filter: 'brightness(1.05)'
                      }}
                    >
                      <div className="text-xs font-medium truncate leading-tight">
                        {event.title}
                      </div>
                      <div className="text-[10px] opacity-90 truncate">
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
