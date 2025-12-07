import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Target, 
  TrendingUp, 
  BarChart3, 
  Shield,
  Moon,
  Sun,
  Zap,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  Calendar
} from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [isDark, setIsDark] = useState(true);

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Smart Habit Tracking",
      description: "Create daily or weekly habits with intelligent reminders",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Visual Progress",
      description: "Beautiful charts and graphs to visualize your journey",
      color: "from-purple-500 to-pink-400"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Deep insights into your habit patterns and streaks",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Your data is encrypted and stays with you",
      color: "from-orange-500 to-red-400"
    },
    {
      icon: <Moon className="w-6 h-6" />,
      title: "Dark/Light Mode",
      description: "Seamless theme switching for any preference",
      color: "from-indigo-500 to-violet-400"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Sync",
      description: "Access your habits anywhere, anytime",
      color: "from-yellow-500 to-amber-400"
    }
  ];

  const stats = [
    { value: "98%", label: "User Satisfaction", icon: <Star /> },
    { value: "45+", label: "Daily Active Streaks", icon: <Award /> },
    { value: "10K+", label: "Habits Tracked", icon: <CheckCircle /> },
    { value: "99.9%", label: "Uptime", icon: <Calendar /> }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [100, 0, 100],
            y: [50, 0, 50],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl"
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-1 border-2 border-blue-500/30 rounded-xl"
                />
              </div>
              <span className="text-2xl font-bold gradient-text">HabitFlow</span>
            </motion.div>

            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-secondary"
                >
                  Sign In
                </motion.button>
              </Link>
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">
                Transform Your Life, One Habit at a Time
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Build Better</span>
              <br />
              <span className="text-white">Habits, Effortlessly</span>
            </h1>

            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Track your progress, maintain streaks, and achieve your goals with our 
              intelligent habit tracker. Beautifully designed for modern lifestyles.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary text-lg px-8 py-4"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-secondary text-lg px-8 py-4"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Join Community
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="card p-6 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-white/10 to-white/5 mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-gray-400 text-lg">
                Packed with features designed to help you build lasting habits
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="card p-6 group cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center text-sm text-gray-400">
                      <ArrowRight className="w-4 h-4 mr-2 transform group-hover:translate-x-2 transition-transform" />
                      Learn more
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <Sparkles className="w-12 h-12 mx-auto mb-6 text-blue-400" />
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Transform Your Habits?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of users who have built better habits with HabitFlow
              </p>
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary text-lg px-10 py-4 inline-flex items-center"
                >
                  Get Started For Free
                  <ArrowRight className="w-5 h-5 ml-3" />
                </motion.button>
              </Link>
              <p className="text-gray-400 mt-6 text-sm">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-10 left-10 w-4 h-4 rounded-full bg-blue-400"
            />
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-10 right-10 w-6 h-6 rounded-full bg-purple-400"
            />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">HabitFlow</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <div className="flex items-center space-x-4">
                <span>© {new Date().getFullYear()} HabitFlow</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}