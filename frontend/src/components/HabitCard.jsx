import { useState } from 'react';
import { Check, X, Flame, TrendingUp, MoreVertical } from 'lucide-react';
import api from '../utils/api';

export default function HabitCard({ habit, onUpdate }) {
  const [loading, setLoading] = useState(false);

  const toggleHabit = async () => {
    setLoading(true);
    try {
      await api.post(`/habits/${habit._id}/log`, {
        completed: !habit.todayCompleted
      });
      onUpdate();
    } catch (error) {
      console.error('Error toggling habit:', error);
    } finally {
      setLoading(false);
    }
  };

  const streakLevel = habit.streak > 7 ? '🔥' : habit.streak > 3 ? '⚡' : '✨';

  return (
    <div className="card group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: habit.color }}
            />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {habit.title}
            </h3>
          </div>
          
          {habit.description && (
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {habit.description}
            </p>
          )}
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Flame className="text-orange-500" size={18} />
              <span className="font-bold text-gray-900 dark:text-white">
                {habit.streak} {streakLevel}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                day streak
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <TrendingUp className="text-green-500" size={18} />
              <span className="font-bold text-gray-900 dark:text-white">
                {habit.bestStreak}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                best
              </span>
            </div>
          </div>
        </div>
        
        <button
          onClick={toggleHabit}
          disabled={loading}
          className={`ml-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            habit.todayCompleted
              ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500'
              : 'bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500'
          }`}
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          ) : habit.todayCompleted ? (
            <Check className="text-green-600 dark:text-green-400" size={24} />
          ) : (
            <X className="text-gray-400" size={24} />
          )}
        </button>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            {habit.frequency === 'daily' ? 'Daily' : 'Weekly'} habit
          </span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <div
                key={day}
                className={`w-2 h-2 rounded-full ${
                  day <= (habit.streak % 7 || 7)
                    ? 'bg-blue-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}