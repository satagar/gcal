import { useCalendarStore } from '../stores/useCalendarStore';
import { useEventsStore } from '../stores/useEventsStore';
import ViewSwitcher from './ViewSwitcher';

function Header() {
  const { 
    currentMonth, 
    selectedDate,
    currentView, 
    prevMonth, 
    nextMonth,
    prevWeek,
    nextWeek,
    prevDay,
    nextDay,
    goToToday 
  } = useCalendarStore();
  
  const openModal = useEventsStore((state) => state.openModal);

  // Smart navigation based on current view
  const handlePrev = () => {
    if (currentView === 'month') prevMonth();
    else if (currentView === 'week') prevWeek();
    else prevDay();
  };

  const handleNext = () => {
    if (currentView === 'month') nextMonth();
    else if (currentView === 'week') nextWeek();
    else nextDay();
  };

  // Smart date display based on current view
  const getDateDisplay = () => {
    if (currentView === 'month') {
      return currentMonth.format('MMMM YYYY');
    } else if (currentView === 'week') {
      const weekStart = selectedDate.startOf('week');
      const weekEnd = selectedDate.endOf('week');
      
      if (weekStart.month() === weekEnd.month()) {
        return `${weekStart.format('MMM D')} - ${weekEnd.format('D, YYYY')}`;
      } else {
        return `${weekStart.format('MMM D')} - ${weekEnd.format('MMM D, YYYY')}`;
      }
    } else {
      return selectedDate.format('MMMM D, YYYY');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
          <button
            onClick={goToToday}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Today
          </button>
        </div>

        <div className="flex items-center gap-4">
          <ViewSwitcher />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <span className="text-lg font-semibold text-gray-900 min-w-[250px] text-center">
              {getDateDisplay()}
            </span>
            
            <button
              onClick={handleNext}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Next"
            >
              <svg className="w-5 h-5" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => {
              const store = useEventsStore.getState();
              store.openModal();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            + Create Event
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;