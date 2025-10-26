import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/events';

export const useEventsStore = create((set, get) => ({
  events: [],
  loading: false,
  error: null,
  isModalOpen: false,
  selectedEvent: null,
  
  // Fetch all events
  fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      set({ events: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  // Create new event
  createEvent: async (eventData) => {
    try {
      const response = await axios.post(API_URL, eventData);
      set((state) => ({
        events: [...state.events, response.data]
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
  
  // Update event
  updateEvent: async (id, eventData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, eventData);
      set((state) => ({
        events: state.events.map((event) =>
          event.id === id ? response.data : event
        )
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
  
  // Delete event
  deleteEvent: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        events: state.events.filter((event) => event.id !== id)
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
  
  // Modal controls
  openModal: (event = null) => set({ isModalOpen: true, selectedEvent: event }),
  closeModal: () => set({ isModalOpen: false, selectedEvent: null }),
}));