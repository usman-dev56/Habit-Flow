import api from '../utils/api';

export const habitService = {
  // Get all habits
  getHabits: async () => {
    try {
      const response = await api.get('/habits');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create habit
  createHabit: async (habitData) => {
    try {
      const response = await api.post('/habits', habitData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Log habit completion
  logHabit: async (habitId, logData) => {
    try {
      const response = await api.post(`/habits/${habitId}/log`, logData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get analytics
  getAnalytics: async () => {
    try {
      const response = await api.get('/habits/analytics');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};