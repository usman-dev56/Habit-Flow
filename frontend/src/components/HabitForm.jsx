import { useState } from 'react';
import { X, Target, Calendar, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../utils/api';

export default function HabitForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    frequency: 'daily',
    category: 'health',
    color: '#3b82f6'
  });

  const [loading, setLoading] = useState(false);

  const colors = [
    { value: '#3b82f6', name: 'Blue' },
    { value: '#10b981', name: 'Green' },
    { value: '#f59e0b', name: 'Amber' },
    { value: '#ef4444', name: 'Red' },
    { value: '#8b5cf6', name: 'Purple' },
    { value: '#ec4899', name: 'Pink' },
  ];

  const categories = [
    { value: 'health', label: 'Health & Fitness' },
    { value: 'work', label: 'Work & Productivity' },
    { value: 'learning', label: 'Learning' },
    { value: 'mindfulness', label: 'Mindfulness' },
    { value: 'social', label: 'Social' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await api.post('/habits', formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error creating habit:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <Target className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            New Habit
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Habit Name *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full input"
            placeholder="e.g., Morning Meditation, Daily Exercise"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description (Optional)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full input min-h-[100px] resize-none"
            placeholder="What do you want to achieve with this habit?"
            rows="3"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              Frequency
            </label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              className="w-full input "
            >
              <option className=" text-gray-800 " value="daily">Daily</option>
              <option className=" text-gray-800 "  value="weekly">Weekly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full input "
            >
              {categories.map((cat) => (
                <option className=" text-gray-800 " key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            <Palette className="w-4 h-4 mr-2" />
            Choose Color
          </label>
          <div className="flex space-x-3">
            {colors.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setFormData({ ...formData, color: color.value })}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  formData.color === color.value
                    ? 'border-gray-900 dark:border-white scale-110'
                    : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !formData.title}
            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Creating...
              </div>
            ) : (
              'Create Habit'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}