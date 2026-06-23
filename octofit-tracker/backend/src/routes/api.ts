import { Router } from 'express';
import { Activity } from '../models/Activity';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const router = Router();

router.get('/health', (_req, res) => {
  const codespaceName = process.env.CODESPACE_NAME;
  const port = process.env.PORT || '8000';
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;

  res.json({
    status: 'ok',
    message: 'OctoFit Tracker backend is running',
    baseUrl,
  });
});

router.get('/users', async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load users', error });
  }
});

router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create user', error });
  }
});

router.get('/activities', async (_req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 }).populate('userId');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load activities', error });
  }
});

router.post('/activities', async (req, res) => {
  try {
    const data = req.body;
    const points = Math.max(5, Math.round((data.durationMinutes || 0) / 10));
    const activity = await Activity.create({ ...data, points });
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create activity', error });
  }
});

router.get('/teams', async (_req, res) => {
  try {
    const teams = await Team.find().sort({ points: -1 }).populate('members');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load teams', error });
  }
});

router.post('/teams', async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create team', error });
  }
});

router.get('/leaderboard', async (_req, res) => {
  try {
    const leaderboard = await Team.find().sort({ points: -1 }).populate('members');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load leaderboard', error });
  }
});

router.get('/workouts', async (_req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load workouts', error });
  }
});

router.post('/workouts', async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create workout', error });
  }
});

export default router;
