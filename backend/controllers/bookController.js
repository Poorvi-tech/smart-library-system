import Book from '../models/Book.js';
import History from '../models/History.js';
import Notification from '../models/Notification.js';

function getDateOffset(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

export const getAllBooks = async () => {
  try {
    const books = await Book.find();
    return { success: true, books };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getBookById = async (bookId) => {
  try {
    const book = await Book.findOne({ id: bookId });
    if (!book) {
      return { success: false, error: 'Book not found' };
    }
    return { success: true, book };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const searchBooks = async (query, course) => {
  try {
    const searchRegex = new RegExp(query, 'i');
    const books = await Book.find({
      $or: [
        { title: searchRegex },
        { author: searchRegex },
        { category: searchRegex }
      ]
    });
    
    // Sort by course match
    let sorted = books;
    if (course) {
      sorted = [
        ...books.filter(b => b.course === course),
        ...books.filter(b => b.course !== course)
      ];
    }
    
    return { success: true, books: sorted };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const issueBook = async (bookId, studentId) => {
  try {
    const book = await Book.findOne({ id: bookId });
    if (!book) {
      return { success: false, error: 'Book not found' };
    }
    if (book.status === 'Issued') {
      return { success: false, error: 'Book is already issued' };
    }
    
    const dueDate = getDateOffset(7);
    book.status = 'Issued';
    book.issuedTo = studentId;
    book.dueDate = new Date(dueDate);
    book.issuedDate = new Date();
    await book.save();
    
    // Add to history
    const history = new History({
      id: `H-${Date.now()}`,
      bookId: book.id,
      bookTitle: book.title,
      studentId,
      action: 'Issued',
      issueDate: new Date().toISOString().split('T')[0]
    });
    await history.save();
    
    // Add notification
    const notification = new Notification({
      id: `N-${Date.now()}`,
      studentId,
      message: `${book.title} issued successfully. Return by ${dueDate}.`,
      type: 'Issue'
    });
    await notification.save();
    
    return { success: true, book, message: 'Book issued successfully' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const returnBook = async (bookId, studentId) => {
  try {
    const book = await Book.findOne({ id: bookId });
    if (!book) {
      return { success: false, error: 'Book not found' };
    }
    if (book.status === 'Available') {
      return { success: false, error: 'Book is already available' };
    }
    if (book.issuedTo !== studentId) {
      return { success: false, error: 'This book is not issued to you' };
    }
    
    book.status = 'Available';
    book.issuedTo = null;
    book.dueDate = null;
    book.issuedDate = null;
    await book.save();
    
    // Add to history
    const history = new History({
      id: `H-${Date.now()}`,
      bookId: book.id,
      bookTitle: book.title,
      studentId,
      action: 'Returned',
      returnDate: new Date().toISOString().split('T')[0]
    });
    await history.save();
    
    // Add notification
    const notification = new Notification({
      id: `N-${Date.now()}`,
      studentId,
      message: `${book.title} returned successfully.`,
      type: 'Return'
    });
    await notification.save();
    
    return { success: true, book, message: 'Book returned successfully' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAvailableBooks = async () => {
  try {
    const books = await Book.find({ status: 'Available' });
    return { success: true, books };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getIssuedBooks = async (studentId) => {
  try {
    const books = await Book.find({ issuedTo: studentId });
    return { success: true, books };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
