function resolveApiBaseUrl() {
  const envBaseUrl = import.meta.env.VITE_API_BASE_URL;
  if (envBaseUrl && envBaseUrl.trim()) {
    return envBaseUrl.replace(/\/+$/, '');
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    const isLocalHost = host === 'localhost' || host === '127.0.0.1';
    if (isLocalHost) {
      return 'http://localhost:5000/api';
    }

    // Live fallback: assumes backend is available behind same origin at /api.
    return `${window.location.origin}/api`;
  }

  return 'http://localhost:5000/api';
}

const API_BASE_URL = resolveApiBaseUrl();

// Auth APIs
export const authAPI = {
  login: async (studentId, course) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, course })
    });
    return response.json();
  },

  signup: async ({ studentId, name, email, course }) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, name, email, course })
    });
    return response.json();
  },

  getProfile: async (studentId) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile/${studentId}`);
    return response.json();
  }
};

// Book APIs
export const bookAPI = {
  getAllBooks: async () => {
    const response = await fetch(`${API_BASE_URL}/books/all`);
    return response.json();
  },

  getAvailableBooks: async () => {
    const response = await fetch(`${API_BASE_URL}/books/available`);
    return response.json();
  },

  getBookById: async (bookId) => {
    const response = await fetch(`${API_BASE_URL}/books/${bookId}`);
    return response.json();
  },

  searchBooks: async (query, course = '') => {
    const url = new URL(`${API_BASE_URL}/books/search/${query}`);
    if (course) url.searchParams.append('course', course);
    const response = await fetch(url);
    return response.json();
  },

  issueBook: async (bookId, studentId) => {
    const response = await fetch(`${API_BASE_URL}/books/issue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId, studentId })
    });
    return response.json();
  },

  returnBook: async (bookId, studentId) => {
    const response = await fetch(`${API_BASE_URL}/books/return`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId, studentId })
    });
    return response.json();
  },

  getIssuedBooks: async (studentId) => {
    const response = await fetch(`${API_BASE_URL}/books/issued/${studentId}`);
    return response.json();
  }
};

// Notification APIs
export const notificationAPI = {
  getNotifications: async (studentId) => {
    const response = await fetch(`${API_BASE_URL}/notifications/${studentId}`);
    return response.json();
  },

  markAsRead: async (notificationId) => {
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
  },

  getHistory: async (studentId) => {
    const response = await fetch(`${API_BASE_URL}/notifications/history/${studentId}`);
    return response.json();
  },

  getOverdueAlerts: async (studentId) => {
    const response = await fetch(`${API_BASE_URL}/notifications/alerts/overdue/${studentId}`);
    return response.json();
  },

  getDueSoonAlerts: async (studentId) => {
    const response = await fetch(`${API_BASE_URL}/notifications/alerts/due-soon/${studentId}`);
    return response.json();
  }
};

// Admin APIs
export const adminAPI = {
  getDashboardStats: async (studentId) => {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard/${studentId}`);
    return response.json();
  },

  getAllUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/users/all`);
    return response.json();
  },

  getUserStats: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/users/stats`);
    return response.json();
  },

  getSystemAnalytics: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/analytics/system`);
    return response.json();
  }
};
