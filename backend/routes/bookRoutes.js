import express from 'express';
import {
  getAllBooks,
  getBookById,
  searchBooks,
  issueBook,
  returnBook,
  getAvailableBooks,
  getIssuedBooks
} from '../controllers/bookController.js';

const router = express.Router();

router.get('/all', async (req, res) => {
  const result = await getAllBooks();
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

router.get('/available', async (req, res) => {
  const result = await getAvailableBooks();
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

router.get('/:bookId', async (req, res) => {
  const result = await getBookById(req.params.bookId);
  if (result.success) {
    res.json(result);
  } else {
    res.status(404).json(result);
  }
});

router.get('/search/:query', async (req, res) => {
  const { course } = req.query;
  const result = await searchBooks(req.params.query, course);
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

router.post('/issue', async (req, res) => {
  const { bookId, studentId } = req.body;
  const result = await issueBook(bookId, studentId);
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

router.post('/return', async (req, res) => {
  const { bookId, studentId } = req.body;
  const result = await returnBook(bookId, studentId);
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

router.get('/issued/:studentId', async (req, res) => {
  const result = await getIssuedBooks(req.params.studentId);
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

export default router;
