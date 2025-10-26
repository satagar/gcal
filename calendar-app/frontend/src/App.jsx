import './App.css';
import Header from './components/Header';
import CalendarGrid from './components/CalendarGrid';
import EventModal from './components/EventModal';

function App() {
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
