import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, BarChart3, LogOut, Home } from 'lucide-react';

export default function Navbar({ user, setUser, isDark, toggleTheme }) {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  // Navigate first, then update state
  navigate('/');
  
  // Small delay to ensure navigation happens before state update
  setTimeout(() => {
    setUser(null);
  }, 100);
};
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">H</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">HabitFlow</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
            
            <Link to="/analytics" className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <BarChart3 size={20} />
              <span>Analytics</span>
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}