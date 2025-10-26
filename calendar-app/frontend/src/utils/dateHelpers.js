import dayjs from 'dayjs';

/**
 * Generate calendar grid for a given month
 * Returns array of 35-42 days (5-6 weeks) including previous/next month dates
 */
export function generateMonthDays(month) {
  const startOfMonth = month.startOf('month');
  const endOfMonth = month.endOf('month');
  
  // Start from Sunday of the week containing the 1st
  const startDate = startOfMonth.startOf('week');
  
  // End on Saturday of the week containing the last day
  const endDate = endOfMonth.endOf('week');
  
  const days = [];
  let currentDay = startDate;
  
  while (currentDay.isBefore(endDate) || currentDay.isSame(endDate, 'day')) {
    days.push(currentDay);
    currentDay = currentDay.add(1, 'day');
  }
  
  return days;
}

/**
 * Get events for a specific date
 */
export function getEventsForDate(events, date) {
  return events.filter((event) => {
    const eventStart = dayjs(event.startDateTime);
    return eventStart.isSame(date, 'day');
  });
}

/**
 * Format time for display
 */
export function formatTime(dateTime) {
  return dayjs(dateTime).format('h:mm A');
}

/**
 * Format date for display
 */
export function formatDate(date) {
  return dayjs(date).format('MMM D, YYYY');
}

/**
 * Check if date is today
 */
export function isToday(date) {
  return dayjs(date).isSame(dayjs(), 'day');
}

/**
 * Check if date is in current month
 */
export function isCurrentMonth(date, month) {
  return dayjs(date).isSame(month, 'month');
}