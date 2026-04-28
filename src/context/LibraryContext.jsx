import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { adminAPI, bookAPI, notificationAPI } from '../services/api.js';

const LibraryContext = createContext(null);

export function LibraryProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [history, setHistory] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [autoDueAlerts, setAutoDueAlerts] = useState([]);
  const [reservations, setReservations] = useState([
    {
      id: 'R-1',
      bookId: 'B111',
      bookTitle: 'Python for Data Science',
      status: 'Pending'
    }
  ]);
  const [adminStats, setAdminStats] = useState({
    dashboard: null,
    users: [],
    userStats: null,
    systemAnalytics: null
  });

  async function fetchAllBooks() {
    const result = await bookAPI.getAllBooks();
    if (result.success) {
      setBooks(result.books || []);
    }
  }

  async function fetchIssuedBooks(studentId) {
    if (!studentId) return;
    const result = await bookAPI.getIssuedBooks(studentId);
    if (result.success) {
      setIssuedBooks(result.books || []);
    }
  }

  async function fetchNotifications(studentId) {
    if (!studentId) return;
    const result = await notificationAPI.getNotifications(studentId);
    if (result.success) {
      setNotifications(result.notifications || []);
    }
  }

  async function fetchHistory(studentId) {
    if (!studentId) return;
    const result = await notificationAPI.getHistory(studentId);
    if (result.success) {
      setHistory(result.history || []);
    }
  }

  async function fetchAlerts(studentId) {
    if (!studentId) return;
    const [overdueResult, dueSoonResult] = await Promise.all([
      notificationAPI.getOverdueAlerts(studentId),
      notificationAPI.getDueSoonAlerts(studentId)
    ]);

    const overdue = overdueResult.success ? overdueResult.alerts || [] : [];
    const dueSoon = dueSoonResult.success ? dueSoonResult.alerts || [] : [];
    setAutoDueAlerts([...overdue, ...dueSoon]);
  }

  async function fetchAdminData(studentId) {
    if (!studentId) return;

    const [dashboardResult, usersResult, userStatsResult, systemResult] = await Promise.all([
      adminAPI.getDashboardStats(studentId),
      adminAPI.getAllUsers(),
      adminAPI.getUserStats(),
      adminAPI.getSystemAnalytics()
    ]);

    setAdminStats({
      dashboard: dashboardResult.success ? dashboardResult.stats : null,
      users: usersResult.success ? usersResult.users || [] : [],
      userStats: userStatsResult.success ? userStatsResult.stats : null,
      systemAnalytics: systemResult.success ? systemResult.analytics : null
    });
  }

  async function refreshUserData(user) {
    await Promise.all([
      fetchAllBooks(),
      fetchIssuedBooks(user.id),
      fetchNotifications(user.id),
      fetchHistory(user.id),
      fetchAlerts(user.id)
    ]);

    if (user.isAdmin) {
      await fetchAdminData(user.id);
    } else {
      setAdminStats({
        dashboard: null,
        users: [],
        userStats: null,
        systemAnalytics: null
      });
    }
  }

  useEffect(() => {
    fetchAllBooks();
  }, []);

  function login(userData) {
    const nextUser = {
      id: userData.id,
      course: userData.course || 'CSE',
      email: userData.email || `${userData.id}@college.edu`,
      name: userData.name || userData.id,
      isAdmin: Boolean(userData.isAdmin)
    };
    setCurrentUser(nextUser);
    refreshUserData(nextUser);
  }

  function logout() {
    setCurrentUser(null);
    setIssuedBooks([]);
    setHistory([]);
    setNotifications([]);
    setAutoDueAlerts([]);
    setAdminStats({
      dashboard: null,
      users: [],
      userStats: null,
      systemAnalytics: null
    });
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

  async function issueBook(bookId) {
    if (!currentUser?.id) return false;

    const result = await bookAPI.issueBook(bookId, currentUser.id);
    if (!result.success) {
      return false;
    }

    await Promise.all([
      fetchAllBooks(),
      fetchIssuedBooks(currentUser.id),
      fetchNotifications(currentUser.id),
      fetchHistory(currentUser.id),
      fetchAlerts(currentUser.id)
    ]);

    return true;
  }

  async function returnBook(bookId) {
    if (!currentUser?.id) return false;

    const result = await bookAPI.returnBook(bookId, currentUser.id);
    if (!result.success) {
      return false;
    }

    await Promise.all([
      fetchAllBooks(),
      fetchIssuedBooks(currentUser.id),
      fetchNotifications(currentUser.id),
      fetchHistory(currentUser.id),
      fetchAlerts(currentUser.id)
    ]);

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

  const availableBooks = useMemo(() => books.filter((book) => book.status === 'Available'), [books]);

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
    adminStats,
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
