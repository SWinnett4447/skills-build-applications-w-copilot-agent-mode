import process from 'node:process';
import mongoose from 'mongoose';
import { Activity } from './models/Activity';
import { Team } from './models/Team';
import { User } from './models/User';
import { Workout } from './models/Workout';

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding');

    await Promise.all([
      User.deleteMany({}),
      Activity.deleteMany({}),
      Team.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'maria', email: 'maria@example.com', age: 16, favoriteSport: 'running' },
      { username: 'liam', email: 'liam@example.com', age: 15, favoriteSport: 'strength' },
      { username: 'sofia', email: 'sofia@example.com', age: 17, favoriteSport: 'yoga' },
    ]);

    await Activity.create([
      { userId: users[0]._id, type: 'running', durationMinutes: 30, distanceKm: 4.2, intensity: 'high', points: 25 },
      { userId: users[1]._id, type: 'strength', durationMinutes: 45, intensity: 'medium', points: 18 },
      { userId: users[2]._id, type: 'yoga', durationMinutes: 20, intensity: 'low', points: 12 },
    ]);

    await Team.create([
      { name: 'Rocket Runners', members: [users[0]._id], points: 25 },
      { name: 'Power Pacers', members: [users[1]._id], points: 18 },
    ]);

    await Workout.create([
      {
        title: 'Morning Jog',
        category: 'cardio',
        durationMinutes: 20,
        difficulty: 'beginner',
        equipment: ['shoes'],
        description: 'Easy run to start the day',
      },
      {
        title: 'Core Blast',
        category: 'strength',
        durationMinutes: 25,
        difficulty: 'intermediate',
        equipment: ['mat'],
        description: 'Short strength circuit',
      },
    ]);

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
