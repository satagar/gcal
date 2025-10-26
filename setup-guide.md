# Google Calendar Clone - Stage 1 Setup Guide

## Project Structure

```
calendar-app/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── routes/
│   │   │   └── events.js
│   │   └── server.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CalendarGrid.jsx
│   │   │   ├── EventModal.jsx
│   │   │   ├── EventChip.jsx
│   │   │   └── Header.jsx
│   │   ├── stores/
│   │   │   ├── useCalendarStore.js
│   │   │   └── useEventsStore.js
│   │   ├── utils/
│   │   │   └── dateHelpers.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   └── .gitignore
└── README.md
```

## Setup Instructions

### Backend Setup

1. **Create backend directory and initialize:**
   ```bash
   mkdir -p calendar-app/backend
   cd calendar-app/backend
   npm init -y
   ```

2. **Install dependencies:**
   ```bash
   npm install express cors @prisma/client
   npm install -D prisma
   ```

3. **Initialize Prisma:**
   ```bash
   npx prisma init
   ```

4. **Create the database schema** (copy from backend-code.md)

5. **Run migrations:**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

6. **Create server files** (copy from backend-code.md)

7. **Start the server:**
   ```bash
   npm run dev
   ```
   Server will run on http://localhost:3001

### Frontend Setup

1. **Create frontend with Vite:**
   ```bash
   cd calendar-app
   npm create vite@latest frontend -- --template react
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install zustand axios dayjs clsx
   npm install -D tailwindcss postcss autoprefixer
   ```

3. **Initialize Tailwind:**
   ```bash
   npx tailwindcss init -p
   ```

4. **Configure Tailwind** (copy from frontend-config.md)

5. **Create all source files** (copy from frontend files)

6. **Start the dev server:**
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:5173

## Usage

1. Start the backend server first (port 3001)
2. Start the frontend dev server (port 5173)
3. Open http://localhost:5173 in your browser

### Features:
- **Month View**: Calendar grid showing all days of the month
- **Create Event**: Click "+ Create Event" button or click on any date
- **Edit Event**: Click on any event chip to edit
- **Delete Event**: Open event modal and click "Delete"
- **Navigation**: Use arrow buttons to move between months
- **Today Button**: Jump back to current month

## Key Technologies

- **Frontend**: React, Vite, Zustand, Tailwind CSS, DayJS
- **Backend**: Node.js, Express, Prisma, SQLite
- **State Management**: Zustand (simple and effective)
- **Date Handling**: DayJS (lightweight alternative to Moment.js)
- **Styling**: Tailwind CSS (utility-first CSS framework)

## API Endpoints

- `GET /api/events` - Fetch all events
- `GET /api/events/:id` - Fetch single event
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

## Architecture Highlights

### State Management (Zustand)
- **useCalendarStore**: Manages current month, navigation, date selection
- **useEventsStore**: Manages events data, CRUD operations, modal state

### Component Structure
- **Header**: Navigation controls and create button
- **CalendarGrid**: Main month view with date cells
- **EventChip**: Individual event display
- **EventModal**: Create/edit form

### Date Utilities
- **generateMonthDays**: Creates calendar grid (5-6 weeks)
- **getEventsForDate**: Filters events for specific date
- **formatTime/formatDate**: Display formatting
- **isToday/isCurrentMonth**: Date comparisons

## Next Steps (Stage 2)

After completing Stage 1, you can enhance with:
- Week and Day views
- Animations and transitions
- Mini calendar sidebar
- Drag-and-drop rescheduling
- Recurring events
- Event search/filter

## Interview Discussion Points

### Architecture Decisions:
1. **Zustand over Redux** - Simpler API, less boilerplate, easier to explain
2. **SQLite over PostgreSQL** - Faster setup, no external dependencies
3. **Tailwind CSS** - Rapid development, consistent styling
4. **DayJS over Moment** - Smaller bundle size, modern API

### Key Features Implemented:
1. **Calendar Grid Generation** - Handles month boundaries correctly
2. **Event CRUD** - Full create, read, update, delete functionality
3. **Date Validation** - Ensures end time is after start time
4. **Responsive Design** - Works on mobile and desktop
5. **Today Highlighting** - Visual indicator for current date

### Edge Cases Handled:
1. Events crossing month boundaries
2. Multiple events on same day (shows "+X more")
3. Previous/next month dates in grid
4. Form validation and error handling
5. Modal state management

## Troubleshooting

### Backend Issues:
- If Prisma errors occur, try: `npx prisma generate`
- If port 3001 is in use, change PORT in .env

### Frontend Issues:
- If API calls fail, check backend is running on port 3001
- If styles don't load, ensure Tailwind is configured correctly
- Clear browser cache if hot reload isn't working

### CORS Issues:
- Backend already configured with `cors()` middleware
- If issues persist, specify origin: `cors({ origin: 'http://localhost:5173' })`
