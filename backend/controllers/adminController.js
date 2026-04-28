import Book from '../models/Book.js';
import User from '../models/User.js';

export const getDashboardStats = async (studentId) => {
  try {
    const issuedBooks = await Book.find({ issuedTo: studentId });
    const availableBooks = await Book.find({ status: 'Available' });
    
    return {
      success: true,
      stats: {
        issuedCount: issuedBooks.length,
        availableCount: availableBooks.length,
        reservationCount: 1
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAllUsers = async () => {
  try {
    const users = await User.find();
    return { success: true, users };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUserStats = async () => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isAdmin: false });
    const admins = await User.countDocuments({ isAdmin: true });
    
    return {
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        admins
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getSystemAnalytics = async () => {
  try {
    const totalBooks = await Book.countDocuments();
    const issuedBooks = await Book.countDocuments({ status: 'Issued' });
    const availableBooks = await Book.countDocuments({ status: 'Available' });
    const reservedBooks = await Book.countDocuments({ status: 'Reserved' });
    
    return {
      success: true,
      analytics: {
        totalBooks,
        issuedBooks,
        availableBooks,
        reservedBooks,
        issuanceRate: totalBooks > 0 ? ((issuedBooks / totalBooks) * 100).toFixed(2) : 0
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
