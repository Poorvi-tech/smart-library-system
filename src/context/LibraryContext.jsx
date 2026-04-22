import { createContext, useContext, useMemo, useState } from 'react';
import { books as seedBooks } from '../data/books.js';

const LibraryContext = createContext(null);

function getDateOffset(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function diffInDays(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dateString);
  due.setHours(0, 0, 0, 0);
  return Math.floor((due - today) / (24 * 60 * 60 * 1000));
}

export function LibraryProvider({ children }) {
  const [books, setBooks] = useState(seedBooks);
  const [currentUser, setCurrentUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [reservations, setReservations] = useState([]);

  function login(identifier, course) {
    const nextUser = {
      id: identifier,
      course: course || 'CSE',
      email: identifier.includes('@') ? identifier : `${identifier}@college.edu`
    };
    setCurrentUser(nextUser);
  }

  function logout() {
    setCurrentUser(null);
  }

  function pushNotification(message, type = 'System') {
    setNotifications((prev) => [
      {
        id: `N-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        message,
        type,
        createdAt: new Date().toISOString()
      },
      ...prev
    ]);
  }

  function issueBook(bookId) {
    const target = books.find((book) => book.id === bookId);
    if (!target || target.status === 'Issued') return false;
    const dueDate = getDateOffset(7);

    setBooks((prev) =>
      prev.map((book) =>
        book.id === bookId
          ? { ...book, status: 'Issued', dueDate, issuedTo: currentUser?.id ?? 'student' }
          : book
      )
    );

    setHistory((prev) => [
      {
        id: `H-${Date.now()}`,
        bookId: target.id,
        bookTitle: target.title,
        action: 'Issued',
        issueDate: new Date().toISOString().slice(0, 10),
        returnDate: '-'
      },
      ...prev
    ]);

    pushNotification(`${target.title} issued successfully. Return by ${dueDate}.`, 'Issue');
    return true;
  }

  function returnBook(bookId) {
    const target = books.find((book) => book.id === bookId);
    if (!target || target.status === 'Available') return false;

    setBooks((prev) =>
      prev.map((book) =>
        book.id === bookId ? { ...book, status: 'Available', dueDate: null, issuedTo: null } : book
      )
    );

    setHistory((prev) => [
      {
        id: `H-${Date.now()}`,
        bookId: target.id,
        bookTitle: target.title,
        action: 'Returned',
        issueDate: '-',
        returnDate: new Date().toISOString().slice(0, 10)
      },
      ...prev
    ]);

    pushNotification(`${target.title} returned successfully.`, 'Return');
    return true;
  }

  function reserveBook(bookId) {
    const target = books.find((book) => book.id === bookId);
    if (!target || target.status !== 'Issued') return false;

    const reservation = {
      id: `R-${Date.now()}`,
      bookId: target.id,
      bookTitle: target.title,
      userId: currentUser?.id ?? 'student',
      status: 'Queued'
    };
    setReservations((prev) => [reservation, ...prev]);
    pushNotification(`Reservation placed for ${target.title}.`, 'Reservation');
    return true;
  }

  const issuedBooks = useMemo(() => books.filter((book) => book.status === 'Issued'), [books]);
  const availableBooks = useMemo(() => books.filter((book) => book.status === 'Available'), [books]);

  const autoDueAlerts = useMemo(() => {
    return issuedBooks
      .map((book) => {
        if (!book.dueDate) return null;
        const days = diffInDays(book.dueDate);
        if (days < 0) {
          return {
            id: `DUE-${book.id}`,
            message: `${book.title} is overdue by ${Math.abs(days)} day(s). Estimated fine: Rs ${Math.abs(days) * 10}.`,
            type: 'Overdue'
          };
        }
        if (days === 1) {
          return {
            id: `DUE-${book.id}`,
            message: `${book.title} is due tomorrow.`,
            type: 'Due Tomorrow'
          };
        }
        return null;
      })
      .filter(Boolean);
  }, [issuedBooks]);

  const personalizedBooks = useMemo(() => {
    if (!currentUser) return books;
    const preferred = books.filter((book) => book.course === currentUser.course);
    const nonPreferred = books.filter((book) => book.course !== currentUser.course);
    return [...preferred, ...nonPreferred];
  }, [books, currentUser]);

  const value = {
    books,
    currentUser,
    history,
    notifications,
    autoDueAlerts,
    reservations,
    issuedBooks,
    availableBooks,
    personalizedBooks,
    login,
    logout,
    issueBook,
    returnBook,
    reserveBook
  };

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within LibraryProvider');
  }
  return context;
}
