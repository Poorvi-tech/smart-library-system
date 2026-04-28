import express from 'express';
import { loginUser, signupUser, getUserProfile } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { studentId, course } = req.body;
  const result = await loginUser(studentId, course);
  if (result.success) {
    res.json({ success: true, user: result.user });
  } else {
    res.status(401).json({ success: false, error: result.error });
  }
});

router.post('/signup', async (req, res) => {
  const { studentId, name, email, course } = req.body;
  const result = await signupUser({ studentId, name, email, course });
  if (result.success) {
    res.status(201).json({ success: true, user: result.user });
  } else {
    res.status(400).json({ success: false, error: result.error });
  }
});

router.get('/profile/:studentId', async (req, res) => {
  const result = await getUserProfile(req.params.studentId);
  if (result.success) {
    res.json(result);
  } else {
    res.status(404).json(result);
  }
});

export default router;
