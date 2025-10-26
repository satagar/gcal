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