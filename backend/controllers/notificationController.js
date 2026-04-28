import Notification from '../models/Notification.js';
import History from '../models/History.js';
import Book from '../models/Book.js';

export const getNotifications = async (studentId) => {
  try {
    const notifications = await Notification.find({ studentId })
      .sort({ createdAt: -1 })
      .limit(20);
    return { success: true, notifications };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const markAsRead = async (notificationId) => {
  try {
    await Notification.updateOne({ id: notificationId }, { isRead: true });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getHistory = async (studentId) => {
  try {
    const history = await History.find({ studentId })
      .sort({ createdAt: -1 });
    return { success: true, history };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getOverdueAlerts = async (studentId) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const books = await Book.find({ 
      issuedTo: studentId,
      dueDate: { $lt: today }
    });
    
    const alerts = books.map(book => {
      const dueDate = new Date(book.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      const overdueDays = Math.floor((today - dueDate) / (24 * 60 * 60 * 1000));
      return {
        id: `DUE-${book.id}`,
        bookTitle: book.title,
        bookId: book.id,
        message: `${book.title} is overdue by ${overdueDays} day(s). Estimated fine: Rs ${overdueDays * 10}.`,
        type: 'Overdue'
      };
    });
    
    return { success: true, alerts };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getDueSoonAlerts = async (studentId) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const dueTomorrow = await Book.find({
      issuedTo: studentId,
      dueDate: { $gte: tomorrow, $lt: new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000) }
    });
    
    const dueThisWeek = await Book.find({
      issuedTo: studentId,
      dueDate: { $gte: today, $lt: nextWeek }
    });
    
    const alerts = [];
    dueTomorrow.forEach(book => {
      alerts.push({
        id: `DUE-${book.id}-tomorrow`,
        bookTitle: book.title,
        bookId: book.id,
        message: `${book.title} is due tomorrow.`,
        type: 'Due Tomorrow'
      });
    });
    
    dueThisWeek.forEach(book => {
      if (!dueTomorrow.some(b => b.id === book.id)) {
        const daysLeft = Math.ceil((new Date(book.dueDate) - today) / (24 * 60 * 60 * 1000));
        alerts.push({
          id: `DUE-${book.id}-week`,
          bookTitle: book.title,
          bookId: book.id,
          message: `${book.title} is due in ${daysLeft} day(s).`,
          type: 'Due Soon'
        });
      }
    });
    
    return { success: true, alerts };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
