import express from 'express';
import {
  getNotifications,
  markAsRead,
  getHistory,
  getOverdueAlerts,
  getDueSoonAlerts
} from '../controllers/notificationController.js';

const router = express.Router();

router.get('/:studentId', async (req, res) => {
  const result = await getNotifications(req.params.studentId);
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

router.put('/:notificationId/read', async (req, res) => {
  const result = await markAsRead(req.params.notificationId);
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

router.get('/history/:studentId', async (req, res) => {
  const result = await getHistory(req.params.studentId);
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

router.get('/alerts/overdue/:studentId', async (req, res) => {
  const result = await getOverdueAlerts(req.params.studentId);
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

router.get('/alerts/due-soon/:studentId', async (req, res) => {
  const result = await getDueSoonAlerts(req.params.studentId);
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

export default router;
