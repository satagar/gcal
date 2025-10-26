import './App.css';
import Header from './components/Header';
import CalendarGrid from './components/CalendarGrid';
import EventModal from './components/EventModal';
import { useEffect } from 'react';
import { useEventsStore } from './stores/useEventsStore';
import { useCalendarStore } from './stores/useCalendarStore';

function App() {
  const fetchEvents = useEventsStore((state) => state.fetchEvents);
  const currentMonth = useCalendarStore((state) => state.currentMonth);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents, currentMonth]);
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <CalendarGrid />
      </main>
      <EventModal />
    </div>
  );
}

export default App
