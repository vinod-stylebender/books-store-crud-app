const express = require('express');
const router = express.Router();

const BooksController = require('../controller/books.controller');

router.get('/', BooksController.getBooks);
router.get('/:id', BooksController.getBookById);
router.post('/create', BooksController.create);
router.put('/update/:id', BooksController.updateBook)
router.delete('/:id', BooksController.deleteBook);

module.exports = router