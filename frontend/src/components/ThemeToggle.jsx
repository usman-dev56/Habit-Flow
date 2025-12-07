import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Update document class and localStorage
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative w-14 h-8 flex items-center bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full p-1 transition-all duration-300 shadow-lg hover:shadow-xl"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Toggle track */}
      <motion.div
        className="relative w-6 h-6 rounded-full bg-white dark:bg-gray-900 shadow-lg flex items-center justify-center overflow-hidden"
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {/* Sun icon */}
        <motion.div
          className="absolute"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ 
            scale: isDark ? 0 : 1,
            rotate: isDark ? 90 : 0,
            opacity: isDark ? 0 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          <Sun className="w-4 h-4 text-yellow-500" />
        </motion.div>
        
        {/* Moon icon */}
        <motion.div
          className="absolute"
          initial={{ scale: 0, rotate: 90 }}
          animate={{ 
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : -90,
            opacity: isDark ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <Moon className="w-4 h-4 text-blue-400" />
        </motion.div>
        
        {/* Inner glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-200/30 to-blue-200/30 dark:from-blue-400/20 dark:to-purple-400/20"
          animate={{ opacity: isDark ? 0.5 : 0.3 }}
        />
      </motion.div>
      
      {/* Stars for dark mode */}
      {isDark && (
        <>
          <motion.div
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            style={{ left: '20%', top: '25%' }}
          />
          <motion.div
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{ left: '60%', top: '60%' }}
          />
          <motion.div
            className="absolute w-0.75 h-0.75 bg-blue-200 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{ left: '40%', top: '40%' }}
          />
        </>
      )}
      
      {/* Sun rays for light mode */}
      {!isDark && (
        <>
          <motion.div
            className="absolute w-0.5 h-1 bg-yellow-400/50 rounded-full"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.1 }}
            style={{ left: '20%', top: '-10%' }}
          />
          <motion.div
            className="absolute w-1 h-0.5 bg-yellow-400/50 rounded-full"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.15 }}
            style={{ left: '-10%', top: '40%' }}
          />
          <motion.div
            className="absolute w-0.5 h-1 bg-yellow-400/50 rounded-full"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.2 }}
            style={{ left: '70%', top: '-10%' }}
          />
          <motion.div
            className="absolute w-1 h-0.5 bg-yellow-400/50 rounded-full"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.25 }}
            style={{ left: '90%', top: '40%' }}
          />
        </>
      )}
    </motion.button>
  );
}