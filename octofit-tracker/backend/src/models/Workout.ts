import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, enum: ['cardio', 'strength', 'mobility', 'recovery'], default: 'cardio' },
  durationMinutes: { type: Number, required: true, min: 1 },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  equipment: [{ type: String, trim: true }],
  description: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
});

export const Workout = mongoose.model('Workout', workoutSchema);
