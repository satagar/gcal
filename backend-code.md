# Backend Setup Files

## prisma/schema.prisma

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model Event {
  id             String   @id @default(uuid())
  title          String
  description    String?
  startDateTime  DateTime
  endDateTime    DateTime
  color          String   @default("#3b82f6")
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```

## .env

```
DATABASE_URL="file:./dev.db"
PORT=3001
```

## .gitignore

```
node_modules/
.env
prisma/dev.db
prisma/dev.db-journal
```

## src/server.js

```javascript
import express from 'express';
import cors from 'cors';
import eventsRouter from './routes/events.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/events', eventsRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## src/routes/events.js

```javascript
import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { startDateTime: 'asc' }
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// GET single event
router.get('/:id', async (req, res) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id }
    });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// POST create event
router.post('/', async (req, res) => {
  try {
    const { title, description, startDateTime, endDateTime, color } = req.body;
    
    if (!title || !startDateTime || !endDateTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        startDateTime: new Date(startDateTime),
        endDateTime: new Date(endDateTime),
        color: color || '#3b82f6'
      }
    });
    
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// PUT update event
router.put('/:id', async (req, res) => {
  try {
    const { title, description, startDateTime, endDateTime, color } = req.body;
    
    const event = await prisma.event.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        startDateTime: startDateTime ? new Date(startDateTime) : undefined,
        endDateTime: endDateTime ? new Date(endDateTime) : undefined,
        color
      }
    });
    
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// DELETE event
router.delete('/:id', async (req, res) => {
  try {
    await prisma.event.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

export default router;
```
