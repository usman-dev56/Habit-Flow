import express from 'express';
import jwt from 'jsonwebtoken';
import Habit from '../models/Habit.js';
import HabitLog from '../models/HabitLog.js';

const router = express.Router();

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        error: 'Authentication required' 
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ 
      success: false,
      error: 'Authentication failed' 
    });
  }
};

// Get all habits for user
router.get('/', auth, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId });
    
    // Add today's completion status
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const habitsWithStatus = await Promise.all(
      habits.map(async (habit) => {
        const todayLog = await HabitLog.findOne({
          habitId: habit._id,
          date: {
            $gte: today,
            $lt: tomorrow
          }
        });
        
        return {
          ...habit.toObject(),
          todayCompleted: todayLog ? todayLog.completed : false
        };
      })
    );

    res.json({
      success: true,
      data: habitsWithStatus
    });
  } catch (error) {
    console.error('Get habits error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch habits' 
    });
  }
});

// Create new habit
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, frequency, category, color } = req.body;
    
    if (!title) {
      return res.status(400).json({ 
        success: false,
        error: 'Habit title is required' 
      });
    }

    const habit = new Habit({
      userId: req.userId,
      title,
      description: description || '',
      frequency: frequency || 'daily',
      category: category || 'general',
      color: color || '#3b82f6'
    });

    await habit.save();
    
    res.status(201).json({
      success: true,
      data: habit
    });
  } catch (error) {
    console.error('Create habit error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to create habit' 
    });
  }
});

// Log habit completion
router.post('/:id/log', auth, async (req, res) => {
  try {
    const habitId = req.params.id;
    const { completed = true, notes } = req.body;
    
    // Find habit
    const habit = await Habit.findOne({ _id: habitId, userId: req.userId });
    if (!habit) {
      return res.status(404).json({ 
        success: false,
        error: 'Habit not found' 
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Find or create log
    const log = await HabitLog.findOneAndUpdate(
      {
        habitId,
        date: {
          $gte: today,
          $lt: tomorrow
        }
      },
      {
        completed,
        notes: notes || ''
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      }
    );

    // Calculate streak
    if (completed) {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const yesterdayLog = await HabitLog.findOne({
        habitId,
        date: {
          $gte: yesterday,
          $lt: today
        },
        completed: true
      });

      if (yesterdayLog) {
        habit.streak += 1;
      } else {
        habit.streak = 1;
      }
      
      if (habit.streak > habit.bestStreak) {
        habit.bestStreak = habit.streak;
      }
    } else {
      // Reset streak if not completed today
      habit.streak = 0;
    }

    await habit.save();

    res.json({
      success: true,
      data: log
    });
  } catch (error) {
    console.error('Log habit error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to log habit' 
    });
  }
});


// Get daily completion counts for last 7 days
router.get('/daily-progress', auth, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId });
    const dailyData = [];
    const today = new Date();
    
    // Get last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);
      
      // Count completed habits for this day
      let completedCount = 0;
      for (const habit of habits) {
        const log = await HabitLog.findOne({
          habitId: habit._id,
          date: { $gte: dayStart, $lt: dayEnd },
          completed: true
        });
        if (log) completedCount++;
      }
      
      dailyData.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        completed: completedCount,
        goal: habits.length
      });
    }
    
    res.json({
      success: true,
      data: dailyData
    });
    
  } catch (error) {
    console.error('Daily progress error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch daily progress' 
    });
  }
});


// Get habit analytics
router.get('/analytics', auth, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId });
    
    const analytics = await Promise.all(
      habits.map(async (habit) => {
        const logs = await HabitLog.find({ habitId: habit._id });
        const completed = logs.filter(log => log.completed).length;
        const completionRate = logs.length > 0 ? Math.round((completed / logs.length) * 100) : 0;
        
        return {
          habitId: habit._id,
          title: habit.title,
          streak: habit.streak,
          bestStreak: habit.bestStreak,
          completionRate,
          totalLogs: logs.length,
          completed
        };
      })
    );

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch analytics' 
    });
  }
});

// Delete habit
router.delete('/:id', auth, async (req, res) => {
  try {
    const habitId = req.params.id;
    
    const habit = await Habit.findOneAndDelete({ 
      _id: habitId, 
      userId: req.userId 
    });

    if (!habit) {
      return res.status(404).json({ 
        success: false,
        error: 'Habit not found' 
      });
    }

    // Delete associated logs
    await HabitLog.deleteMany({ habitId: habitId });

    res.json({
      success: true,
      message: 'Habit deleted successfully'
    });
  } catch (error) {
    console.error('Delete habit error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete habit' 
    });
  }
});

export default router;