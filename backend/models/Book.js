import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  status: { type: String, enum: ['Available', 'Issued', 'Reserved'], default: 'Available' },
  shelf: { type: String, required: true },
  floor: { type: String, required: true },
  section: { type: String, required: true },
  category: { type: String, required: true },
  course: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, default: null },
  issuedTo: { type: String, default: null },
  issuedDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Book', bookSchema);
