import express from 'express';
import {
  getDashboardStats,
  getAllUsers,
  getUserStats,
  getSystemAnalytics
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/dashboard/:studentId', async (req, res) => {
  const result = await getDashboardStats(req.params.studentId);
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

router.get('/users/all', async (req, res) => {
  const result = await getAllUsers();
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

router.get('/users/stats', async (req, res) => {
  const result = await getUserStats();
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

router.get('/analytics/system', async (req, res) => {
  const result = await getSystemAnalytics();
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

export default router;
