import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  studentId: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  course: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false }
});

export default mongoose.model('User', userSchema);
