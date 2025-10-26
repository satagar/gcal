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
    <div className="inline-flex rounded-lg border border-gray-300 bg-white overflow-hidden">
      {views.map((view) => (
        <button
          key={view.id}
          onClick={() => setView(view.id)}
          className={clsx(
            'px-4 py-2 text-sm font-medium transition-colors',
            'border-r border-gray-300 last:border-r-0',
            currentView === view.id
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          )}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
}

export default ViewSwitcher;
