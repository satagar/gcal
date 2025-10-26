import { create } from 'zustand';
import dayjs from 'dayjs';

export const useCalendarStore = create((set) => ({
  currentMonth: dayjs(),
  selectedDate: null,
  
  setCurrentMonth: (month) => set({ currentMonth: month }),
  
  nextMonth: () => set((state) => ({
    currentMonth: state.currentMonth.add(1, 'month')
  })),
  
  prevMonth: () => set((state) => ({
    currentMonth: state.currentMonth.subtract(1, 'month')
  })),
  
  goToToday: () => set({ currentMonth: dayjs() }),
  
  setSelectedDate: (date) => set({ selectedDate: date }),
}));