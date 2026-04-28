import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-library';
    
    if (mongoUri.includes('<username>') || mongoUri.includes('<password>')) {
      throw new Error('MONGODB_URI contains placeholders (<username> or <password>). Please replace them with your actual MongoDB Atlas credentials in the .env file.');
    }

    await mongoose.connect(mongoUri);
    console.log('✓ MongoDB Connected');
  } catch (error) {
    console.error('✗ MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
