import { useState, useEffect } from 'react';
import { useEventsStore } from '../stores/useEventsStore';
import dayjs from 'dayjs';

function EventModal() {
  const { isModalOpen, selectedEvent, closeModal, createEvent, updateEvent, deleteEvent } = useEventsStore();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDateTime: '',
    endDateTime: '',
    color: '#3b82f6',
  });

  const [errors, setErrors] = useState({});

  // Pre-fill form when editing or creating with date
  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        title: selectedEvent.title || '',
        description: selectedEvent.description || '',
        startDateTime: selectedEvent.startDateTime 
          ? dayjs(selectedEvent.startDateTime).format('YYYY-MM-DDTHH:mm')
          : '',
        endDateTime: selectedEvent.endDateTime 
          ? dayjs(selectedEvent.endDateTime).format('YYYY-MM-DDTHH:mm')
          : '',
        color: selectedEvent.color || '#3b82f6',
      });
    } else {
      // Reset form
      setFormData({
        title: '',
        description: '',
        startDateTime: '',
        endDateTime: '',
        color: '#3b82f6',
      });
    }
    setErrors({});
  }, [selectedEvent, isModalOpen]);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.startDateTime) {
      newErrors.startDateTime = 'Start date/time is required';
    }
    
    if (!formData.endDateTime) {
      newErrors.endDateTime = 'End date/time is required';
    }
    
    if (formData.startDateTime && formData.endDateTime) {
      if (dayjs(formData.endDateTime).isBefore(dayjs(formData.startDateTime))) {
        newErrors.endDateTime = 'End time must be after start time';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      const eventData = {
        ...formData,
        startDateTime: new Date(formData.startDateTime).toISOString(),
        endDateTime: new Date(formData.endDateTime).toISOString(),
      };

      if (selectedEvent?.id) {
        await updateEvent(selectedEvent.id, eventData);
      } else {
        await createEvent(eventData);
      }
      
      closeModal();
    } catch (error) {
      console.error('Failed to save event:', error);
    }
  };

  const handleDelete = async () => {
    if (selectedEvent?.id && window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(selectedEvent.id);
        closeModal();
      } catch (error) {
        console.error('Failed to delete event:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedEvent?.id ? 'Edit Event' : 'Create Event'}
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Event title"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add description..."
              />
            </div>

            {/* Start Date/Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date & Time *
              </label>
              <input
                type="datetime-local"
                name="startDateTime"
                value={formData.startDateTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.startDateTime && (
                <p className="text-red-500 text-xs mt-1">{errors.startDateTime}</p>
              )}
            </div>

            {/* End Date/Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date & Time *
              </label>
              <input
                type="datetime-local"
                name="endDateTime"
                value={formData.endDateTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.endDateTime && (
                <p className="text-red-500 text-xs mt-1">{errors.endDateTime}</p>
              )}
            </div>

            {/* Color Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <div className="flex gap-2">
                {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, color }))}
                    className={`w-8 h-8 rounded-full border-2 ${
                      formData.color === color ? 'border-gray-900' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              {selectedEvent?.id && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
                >
                  Delete
                </button>
              )}
              <div className="flex-1" />
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {selectedEvent?.id ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventModal;