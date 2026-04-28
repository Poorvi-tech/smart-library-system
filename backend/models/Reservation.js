import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  bookId: { type: String, required: true },
  bookTitle: { type: String, required: true },
  studentId: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Queued', 'Available', 'Cancelled'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Reservation', reservationSchema);
