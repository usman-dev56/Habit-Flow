import { motion } from 'framer-motion';
import { Flame, TrendingUp } from 'lucide-react';

export default function StreakCounter({ streak }) {
  const getStreakLevel = (streak) => {
    if (streak >= 21) return { level: 'Legendary 🔥', color: 'from-red-500 to-orange-500' };
    if (streak >= 14) return { level: 'Amazing ⚡', color: 'from-purple-500 to-pink-500' };
    if (streak >= 7) return { level: 'Great ✨', color: 'from-blue-500 to-cyan-500' };
    if (streak >= 1) return { level: 'Good 🌟', color: 'from-green-500 to-emerald-500' };
    return { level: 'Start 🎯', color: 'from-gray-500 to-gray-600' };
  };

  const { level, color } = getStreakLevel(streak);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden bg-gradient-to-br from-orange-500/10 to-red-600/5 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-6 group hover:border-orange-500/40 transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
          <Flame className="w-6 h-6 text-white" />
        </div>
        <TrendingUp className="w-5 h-5 text-orange-400/50" />
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{streak}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Current Streak</p>
      </div>
      
      {/* Streak Level Badge */}
      <div className="mt-4 inline-block">
        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${color} text-white`}>
          {level}
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
          <span>Progress</span>
          <span>{Math.min(streak, 21)}/21 days</span>
        </div>
        <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(Math.min(streak, 21) / 21) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-orange-500 to-red-500"
          />
        </div>
      </div>
      
      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-orange-500/10 rounded-full" />
    </motion.div>
  );
}