import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  studentId: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['System', 'Reminder', 'Issue', 'Return', 'Overdue', 'Due Tomorrow'], required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Notification', notificationSchema);
