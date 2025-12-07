import mongoose from 'mongoose';

const habitLogSchema = new mongoose.Schema({
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true },
  date: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  notes: { type: String }
});

// Index for faster queries
habitLogSchema.index({ habitId: 1, date: 1 }, { unique: true });

export default mongoose.model('HabitLog', habitLogSchema);