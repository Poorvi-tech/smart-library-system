# Smart Library System

Smart Library System is a full-stack library management application with:
- Student signup/login
- Role-based admin access
- Book search and details
- QR-based issue/return flow
- Notifications and due alerts
- Admin analytics/dashboard APIs

Frontend is built with React + Vite, and backend is built with Node.js + Express + MongoDB.

## Live Frontend

- [https://smart-library-system-kappa.vercel.app/](https://smart-library-system-kappa.vercel.app/)

## Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Framer Motion
- Lucide Icons

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- CORS

## Project Structure

```text
smart-library-system/
├── src/                    # Frontend app
│   ├── components/
│   ├── context/
│   ├── pages/
│   └── services/           # API integration layer
├── backend/                # Express + MongoDB backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── public/
└── README.md
```

## Features

- Authentication
  - Student signup
  - Registered-user-only login
  - Role-aware login (`isAdmin`)
- Books
  - Fetch all books / available books
  - Search books
  - Book details by ID
  - Issue/return operations
  - Issued books per user
- Notifications
  - User notifications
  - Mark as read
  - History
  - Overdue and due-soon alerts
- Admin
  - Admin panel visible only for admin users
  - Admin route protection on frontend
  - Dashboard/user/system analytics APIs

## Environment Variables

### Frontend (`.env` in project root)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

For production (Vercel), set:

```env
VITE_API_BASE_URL=https://your-live-backend-domain/api
```

Frontend API fallback behavior:
- On `localhost`: uses `http://localhost:5000/api` if env is missing
- On live domain: uses `<current-origin>/api` if env is missing

### Backend (`backend/.env`)

```env
MONGODB_URI=mongodb://localhost:27017/smart-library
PORT=5000
```

## Local Development Setup

### 1) Install dependencies

From project root:

```bash
npm install
```

Backend dependencies:

```bash
cd backend
npm install
cd ..
```

### 2) Start backend

```bash
cd backend
npm start
```

Or with nodemon:

```bash
npm run dev
```

Backend runs on `http://localhost:5000`.

### 3) Start frontend

In project root:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Build Commands

From project root:

```bash
npm run build
npm run preview
```

## API Endpoints

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/profile/:studentId`

### Books
- `GET /api/books/all`
- `GET /api/books/available`
- `GET /api/books/:bookId`
- `GET /api/books/search/:query`
- `POST /api/books/issue`
- `POST /api/books/return`
- `GET /api/books/issued/:studentId`

### Notifications
- `GET /api/notifications/:studentId`
- `PUT /api/notifications/:notificationId/read`
- `GET /api/notifications/history/:studentId`
- `GET /api/notifications/alerts/overdue/:studentId`
- `GET /api/notifications/alerts/due-soon/:studentId`

### Admin
- `GET /api/admin/dashboard/:studentId`
- `GET /api/admin/users/all`
- `GET /api/admin/users/stats`
- `GET /api/admin/analytics/system`

## Auth and Admin Notes

- Only registered users can log in.
- Admin panel navigation appears only for users with `isAdmin: true`.
- Non-admin users are redirected away from `/admin`.
- Admin users are redirected to admin dashboard after login.

## Deployment Notes

- Deploy frontend to Vercel.
- Deploy backend to Render/Railway/other Node host.
- Set `VITE_API_BASE_URL` in Vercel to your backend `/api` URL.
- Ensure backend CORS allows your frontend domain.

## License

This project is for educational/demo usage. Add your preferred license if needed.
