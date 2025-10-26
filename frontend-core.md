# Frontend Core Files

## src/main.jsx

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}
```

## src/App.jsx

```javascript
import { useEffect } from 'react';
import Header from './components/Header';
import CalendarGrid from './components/CalendarGrid';
import EventModal from './components/EventModal';
import { useEventsStore } from './stores/useEventsStore';
import { useCalendarStore } from './stores/useCalendarStore';

function App() {
  const fetchEvents = useEventsStore((state) => state.fetchEvents);
  const currentMonth = useCalendarStore((state) => state.currentMonth);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents, currentMonth]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <CalendarGrid />
      </main>
      <EventModal />
    </div>
  );
}

export default App;
```
