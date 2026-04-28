import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import connectDB from './config/database.js';

// Load environment variables
dotenv.config();
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import Book from './models/Book.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Initialize database with seed data if empty
const initializeData = async () => {
  try {
    const bookCount = await Book.countDocuments();
    if (bookCount === 0) {
      const seedBooks = [
        {
          id: 'B101',
          title: 'Digital Library Design',
          author: 'Aisha Kumar',
          status: 'Available',
          shelf: 'A3',
          floor: '1',
          section: 'Design Wing',
          category: 'Design',
          course: 'CSE',
          description: 'A comprehensive guide to building smart library ecosystems with user-centric design principles and modern interface patterns.'
        },
        {
          id: 'B102',
          title: 'React for Campus Systems',
          author: 'Marcus Lee',
          status: 'Issued',
          shelf: 'B1',
          floor: '1',
          section: 'Programming Bay',
          category: 'Programming',
          course: 'CSE',
          description: 'Modern front-end patterns for campus and library applications using React, Hooks, and optimized state management.'
        },
        {
          id: 'B103',
          title: 'Data-Driven Library Analytics',
          author: 'Nina Patel',
          status: 'Available',
          shelf: 'C4',
          floor: '2',
          section: 'Data Science Cluster',
          category: 'Analytics',
          course: 'CSE',
          description: 'Advanced insights into library analytics, user bookings, and data-driven strategies for student engagement.'
        },
        {
          id: 'B104',
          title: 'QR Systems in Education',
          author: 'Liam Chen',
          status: 'Issued',
          shelf: 'A2',
          floor: '2',
          section: 'Automation Zone',
          category: 'Technology',
          course: 'ECE',
          description: 'Practical strategies for implementing QR-based workflows in educational environments and modern libraries.'
        },
        {
          id: 'B105',
          title: 'Smart Shelf Management',
          author: 'Sara Gomez',
          status: 'Available',
          shelf: 'D3',
          floor: '3',
          section: 'Operations Corner',
          category: 'Management',
          course: 'MBA',
          description: 'A holistic view of shelf location tracking, availability management, and inventory control for large-scale libraries.'
        },
        {
          id: 'B106',
          title: 'Campus Life and Literacy',
          author: 'Jonas Hill',
          status: 'Issued',
          shelf: 'B5',
          floor: '3',
          section: 'Humanities Shelf',
          category: 'Student Life',
          course: 'BA',
          description: 'In-depth research on student reading habits, campus resource planning, and the future of digital literacy.'
        },
        {
          id: 'B107',
          title: 'Advanced Neural Networks',
          author: 'Dr. Robert Smith',
          status: 'Available',
          shelf: 'C2',
          floor: '2',
          section: 'AI Laboratory',
          category: 'Artificial Intelligence',
          course: 'CSE',
          description: 'Deep dive into neural network architectures, backpropagation, and real-world AI implementations.'
        },
        {
          id: 'B108',
          title: 'Embedded Systems & IoT',
          author: 'Elena Rossi',
          status: 'Available',
          shelf: 'E1',
          floor: '1',
          section: 'Hardware Hub',
          category: 'Electronics',
          course: 'ECE',
          description: 'Comprehensive guide to embedded systems, IoT applications, and real-time operating systems.'
        },
        {
          id: 'B109',
          title: 'Business Strategy & Innovation',
          author: 'James Wilson',
          status: 'Available',
          shelf: 'F2',
          floor: '2',
          section: 'Management Library',
          category: 'Business',
          course: 'MBA',
          description: 'Strategic frameworks for modern businesses and innovation management in digital age.'
        },
        {
          id: 'B110',
          title: 'Classic Literature: Timeless Tales',
          author: 'Jane Austen',
          status: 'Available',
          shelf: 'G1',
          floor: '3',
          section: 'Classics Collection',
          category: 'Literature',
          course: 'BA',
          description: 'A collection of timeless literary works and their cultural impact through centuries.'
        },
        {
          id: 'B111',
          title: 'Python for Data Science',
          author: 'Guido van Rossum',
          status: 'Available',
          shelf: 'C3',
          floor: '2',
          section: 'Data Science Cluster',
          category: 'Programming',
          course: 'CSE',
          description: 'Master Python programming for data analysis, visualization, and machine learning.'
        },
        {
          id: 'B112',
          title: 'Web Development Masterclass',
          author: 'Brad Traversy',
          status: 'Available',
          shelf: 'B2',
          floor: '1',
          section: 'Programming Bay',
          category: 'Web Development',
          course: 'CSE',
          description: 'Complete guide to modern web development with HTML, CSS, JavaScript, and frameworks.'
        }
      ];
      
      await Book.insertMany(seedBooks);
      console.log('✓ Seed data initialized');
    }
  } catch (error) {
    console.error('Error initializing seed data:', error);
  }
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Initialize data on startup
initializeData();

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});
