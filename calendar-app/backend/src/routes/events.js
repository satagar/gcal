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