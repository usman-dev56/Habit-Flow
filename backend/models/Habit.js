import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  frequency: { 
    type: String, 
    enum: ['daily', 'weekly'], 
    default: 'daily' 
  },
  category: { type: String, default: 'general' },
  color: { type: String, default: '#3b82f6' },
  streak: { type: Number, default: 0 },
  bestStreak: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Habit', habitSchema);