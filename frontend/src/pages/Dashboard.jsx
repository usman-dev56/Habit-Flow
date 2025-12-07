import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HabitCard from '../components/HabitCard';
import HabitForm from '../components/HabitForm';
import StreakCounter from '../components/StreakCounter';
import { 
  Plus, 
  Target, 
  Trophy, 
  TrendingUp, 
  Calendar,
  Filter,
  Sparkles,
  Bell,
  ChevronRight
} from 'lucide-react';
import api from '../utils/api';

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

//   --------------------------


const fetchHabits = async () => {
  try {
    const response = await api.get('/habits');
    setHabits(response.data); // Backend already includes todayCompleted
  } catch (error) {
    console.error('Error fetching habits:', error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchHabits();
  }, []);

  const filteredHabits = habits.filter(habit => {
    if (filter === 'completed') return habit.todayCompleted;
    if (filter === 'pending') return !habit.todayCompleted;
    return true;
  });

  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);
  const completedToday = habits.filter(h => h.todayCompleted).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
        />
        <p className="text-gray-600 dark:text-gray-400">Loading your habits...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* Header with Date */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Your Dashboard
            </h1>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{today}</span>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="group flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            <span>New Habit</span>
          </motion.button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 group hover:border-blue-500/40 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <Sparkles className="w-5 h-5 text-blue-400/50" />
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalHabits}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Habits</p>
            </div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-blue-500/10 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 group hover:border-green-500/40 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <Trophy className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-sm font-medium px-2 py-1 bg-green-500/20 text-green-400 rounded-lg">
                {completionRate}%
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {completedToday}<span className="text-lg text-gray-600 dark:text-gray-400">/{totalHabits}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Completed Today</p>
            </div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-green-500/10 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden bg-gradient-to-br from-orange-500/10 to-orange-600/5 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-6 group hover:border-orange-500/40 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-orange-400" />
              </div>
              <Bell className="w-5 h-5 text-orange-400/50" />
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalStreak}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Streak Days</p>
            </div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-orange-500/10 rounded-full" />
          </motion.div>

          <StreakCounter streak={totalStreak} />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Filters and Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              Your Habits
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {habits.length} {habits.length === 1 ? 'habit' : 'habits'} tracked
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-gray-700 rounded-xl px-4 py-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-gray-700 dark:text-gray-300 text-sm"
              >
                <option value="all">All Habits</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchHabits}
              className="p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Habits Grid */}
        {habits.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-12 text-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center">
                <Target className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                No habits yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Start building your first habit today and track your progress towards a better you.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(true)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold"
              >
                <Plus className="w-5 h-5" />
                <span>Create Your First Habit</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredHabits.map((habit, index) => (
              <motion.div
                key={habit._id}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                whileHover={{ y: -4 }}
              >
                <HabitCard habit={habit} onUpdate={fetchHabits} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Daily Tip */}
        {habits.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative overflow-hidden bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Daily Tip
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Consistency is key! Try to complete your habits at the same time every day to build a strong routine.
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-full -translate-y-16 translate-x-16" />
          </motion.div>
        )}
      </div>

      {/* Habit Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl max-w-md w-full p-0 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              <div className="p-6">
                <HabitForm onClose={() => setShowForm(false)} onSuccess={fetchHabits} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}