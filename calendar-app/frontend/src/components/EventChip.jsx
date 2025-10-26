import { formatTime } from '../utils/dateHelpers';
import { useEventsStore } from '../stores/useEventsStore';

function EventChip({ event }) {
  const openModal = useEventsStore((state) => state.openModal);

  return (
    <div
      onClick={(e) =>{
        e.stopPropagation();
        openModal(event);
      } }
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openModal(event); }}
      role="button"
      tabIndex={0}
      className="event-card mb-2 cursor-pointer hover:opacity-90 transition-opacity"
      style={{ borderLeftColor: event.color, backgroundColor: event.color + '20', color: event.color }}
    >
      <div className="event-title text-xs">{formatTime(event.startDateTime)} — {event.title}</div>
    </div>
  );
}

export default EventChip;