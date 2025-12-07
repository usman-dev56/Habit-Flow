import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Navbar from './components/Navbar';

function App() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const toggleTheme = () => setIsDark(!isDark);

  // Routes that should show the Navbar
  const showNavbarRoutes = ['/dashboard', '/analytics'];
  const shouldShowNavbar = showNavbarRoutes.includes(location.pathname) && user;

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-white',
          style: {
            background: isDark ? '#1f2937' : '#ffffff',
            color: isDark ? '#ffffff' : '#000000',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          },
        }}
      />
      
      {shouldShowNavbar && (
        <Navbar user={user} setUser={setUser} isDark={isDark} toggleTheme={toggleTheme} />
      )}
      
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={shouldShowNavbar ? "pt-20" : ""}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={
                !user ? (
                  <Login setUser={setUser} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              } 
            />
            <Route 
              path="/register" 
              element={
                !user ? (
                  <Register setUser={setUser} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                user ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route 
              path="/analytics" 
              element={
                user ? (
                  <Analytics />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

export default App;