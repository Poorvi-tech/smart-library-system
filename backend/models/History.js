import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  bookId: { type: String, required: true },
  bookTitle: { type: String, required: true },
  studentId: { type: String, required: true },
  action: { type: String, enum: ['Issued', 'Returned'], required: true },
  issueDate: { type: String, default: null },
  returnDate: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('History', historySchema);
