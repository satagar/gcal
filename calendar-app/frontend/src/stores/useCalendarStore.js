import { create } from 'zustand';
import dayjs from 'dayjs';

export const useCalendarStore = create((set) => ({
  currentMonth: dayjs(),
  selectedDate: dayjs(),
  currentView: 'month', // 'month' | 'week' | 'day'
  
  setCurrentMonth: (month) => set({ currentMonth: month }),
  
  nextMonth: () => set((state) => ({
    currentMonth: state.currentMonth.add(1, 'month')
  })),
  
  prevMonth: () => set((state) => ({
    currentMonth: state.currentMonth.subtract(1, 'month')
  })),
  
  nextWeek: () => set((state) => {
    const newDate = state.selectedDate.add(1, 'week');
    return {
      selectedDate: newDate,
      currentMonth: newDate.startOf('month'),
    };
  }),
  
  prevWeek: () => set((state) => {
    const newDate = state.selectedDate.subtract(1, 'week');
    return {
      selectedDate: newDate,
      currentMonth: newDate.startOf('month'),
    };
  }),
  
  nextDay: () => set((state) => {
    const newDate = state.selectedDate.add(1, 'day');
    return {
      selectedDate: newDate,
      currentMonth: newDate.startOf('month'),
    };
  }),

  prevDay: () => set((state) => {
    const newDate = state.selectedDate.subtract(1, 'day');
    return {
      selectedDate: newDate,
      currentMonth: newDate.startOf('month'),
    };
  }),
  
  goToToday: () => set({ 
    currentMonth: dayjs(),
    selectedDate: dayjs()
  }),
  
  setSelectedDate: (date) => set({ 
    selectedDate: date,
    currentMonth: date
  }),
  
  setView: (view) => set({ currentView: view }),
}));