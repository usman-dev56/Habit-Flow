import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Sparkles, ArrowRight, Eye, EyeOff, Check, Home, Shield } from 'lucide-react';
import { authService } from '../services/auth.service';
import { toast } from 'react-hot-toast';

export default function Register({ setUser }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score === 0) return { text: 'Very Weak', color: 'bg-red-500', score: 0 };
    if (score === 1) return { text: 'Weak', color: 'bg-orange-500', score: 25 };
    if (score === 2) return { text: 'Fair', color: 'bg-yellow-500', score: 50 };
    if (score === 3) return { text: 'Good', color: 'bg-blue-500', score: 75 };
    return { text: 'Strong', color: 'bg-green-500', score: 100 };
  };

  const passwordStrength = checkPasswordStrength(formData.password);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const response = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        
        toast.success('Account created successfully! Welcome to HabitFlow!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    'Track unlimited habits',
    'Beautiful charts & analytics',
    'Dark/Light mode',
    'Streak tracking',
    'Progress insights',
    'Free forever'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [100, 0, 100],
            y: [50, 0, 50],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Back to home */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors z-10"
      >
        <Home className="w-5 h-5" />
        <span>Back to Home</span>
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl w-full">
        {/* Left side - Features */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/2"
        >
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Join HabitFlow</h1>
                <p className="text-gray-400">Start building better habits today</p>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 group"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Check className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-2xl font-bold text-white mb-1">10K+</div>
                <div className="text-sm text-gray-400">Active Users</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-2xl font-bold text-white mb-1">98%</div>
                <div className="text-sm text-gray-400">Satisfaction</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-2xl font-bold text-white mb-1">45+</div>
                <div className="text-sm text-gray-400">Avg. Streak</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-2xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-green-400 mt-1" />
                <div>
                  <p className="text-gray-300 italic">
                    "Your data is encrypted and never shared with third parties."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:w-1/2"
        >
          <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-gray-400">Start your habit tracking journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                      errors.name ? 'border-red-500/50' : 'border-white/10'
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 flex items-center"
                  >
                    ⚠️ {errors.name}
                  </motion.p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                      errors.email ? 'border-red-500/50' : 'border-white/10'
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 flex items-center"
                  >
                    ⚠️ {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    className={`w-full pl-12 pr-12 py-3 bg-white/5 border ${
                      errors.password ? 'border-red-500/50' : 'border-white/10'
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Strength */}
                {formData.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3"
                  >
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Password strength</span>
                      <span className={`font-medium ${
                        passwordStrength.text === 'Strong' ? 'text-green-500' :
                        passwordStrength.text === 'Good' ? 'text-blue-500' :
                        passwordStrength.text === 'Fair' ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                        {passwordStrength.text}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${passwordStrength.score}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-2 rounded-full ${passwordStrength.color}`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className={`flex items-center space-x-2 text-xs ${
                        formData.password.length >= 8 ? 'text-green-400' : 'text-gray-500'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-700'}`} />
                        <span>8+ characters</span>
                      </div>
                      <div className={`flex items-center space-x-2 text-xs ${
                        /[A-Z]/.test(formData.password) ? 'text-green-400' : 'text-gray-500'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${/[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-700'}`} />
                        <span>Uppercase letter</span>
                      </div>
                      <div className={`flex items-center space-x-2 text-xs ${
                        /[0-9]/.test(formData.password) ? 'text-green-400' : 'text-gray-500'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${/[0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-700'}`} />
                        <span>Number</span>
                      </div>
                      <div className={`flex items-center space-x-2 text-xs ${
                        /[^A-Za-z0-9]/.test(formData.password) ? 'text-green-400' : 'text-gray-500'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${/[^A-Za-z0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-700'}`} />
                        <span>Special character</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 flex items-center"
                  >
                    ⚠️ {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, confirmPassword: e.target.value });
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                    }}
                    className={`w-full pl-12 pr-12 py-3 bg-white/5 border ${
                      errors.confirmPassword ? 'border-red-500/50' : 'border-white/10'
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-400"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center mt-2"
                  >
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm text-green-500">Passwords match</span>
                      </>
                    ) : (
                      <>
                        <div className="w-4 h-4 rounded-full border border-red-500 mr-2" />
                        <span className="text-sm text-red-500">Passwords don't match</span>
                      </>
                    )}
                  </motion.div>
                )}
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 flex items-center"
                  >
                    ⚠️ {errors.confirmPassword}
                  </motion.p>
                )}
              </div>

              {/* Terms */}
              <label className="flex items-start space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="mt-1 w-4 h-4 rounded bg-white/10 border-white/20 text-purple-500 focus:ring-purple-500" 
                  required
                />
                <span className="text-sm text-gray-400">
                  I agree to the <a href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</a> and <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
                </span>
              </label>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Sign in link */}
            <div className="text-center pt-6 border-t border-white/10">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors group"
                >
                  Sign in instead
                  <span className="inline-block ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-10 left-10 w-3 h-3 rounded-full bg-purple-400"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        className="absolute bottom-10 right-10 w-4 h-4 rounded-full bg-pink-400"
      />
    </div>
  );
}