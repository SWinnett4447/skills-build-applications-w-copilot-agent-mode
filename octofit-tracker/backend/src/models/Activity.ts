import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    required: true,
    enum: ['running', 'walking', 'strength', 'cycling', 'yoga'],
  },
  durationMinutes: { type: Number, required: true, min: 1 },
  distanceKm: { type: Number, min: 0 },
  intensity: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  points: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const Activity = mongoose.model('Activity', activitySchema);
