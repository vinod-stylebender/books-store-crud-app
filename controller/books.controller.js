const { booksCreateSchema, booksUpdateSchema } = require('../validations/validation');
const BooksService = require('../services/books.service');

const getBooks = async (req, res) => {
    try {
        const data = await BooksService.getBooks(req.query.name ?? req.query.author);
        return res.status(200).send(data);
    } catch (e){
        return res.status(400).send({ message: e.message})
    }
}

const getBookById = async (req, res) => {
    try {
        const data = await BooksService.getBookById(req.params.id);
        return res.status(200).send(data);
    } catch (e){
        return res.status(400).send({ message: e.message})
    }
}

const create = async (req, res) => {
    try {
        const { name, imageurl, author, pages, price } = req.body;
        const validation = booksCreateSchema.validate(req.body);
        if (validation.error) {
            throw new Error(validation.error);
        }

        await BooksService.create(name, imageurl, author, pages, price);
        return res.status(200).send({message: 'Book has been created successfully!'})
    } catch (e) {
        return res.status(400).send({ message: e.message})
    }
}

const deleteBook = async (req, res) => {
    try {
        await BooksService.deleteBook(req.params.id);
        return res.status(200).send({ message: `Book of Id ${req.params.id} is deleted successfully!`})
    } catch (e) {
        return res.status(400).send({ message: e.message})
    }
}

const updateBook = async (req, res) => {
    try {
        const { name, imageUrl, author, pages, price } = req.body;
        const validation = booksUpdateSchema.validate(req.body);
        if (validation.error) {
            throw new Error(validation.error);
        }
        
        const bookId = req.params.id;
        await BooksService.updateBook(name, imageUrl, author, pages, price , bookId);
        return res.status(200).send({ message: `Book of id ${ bookId} updated successfully!`})
    } catch(e) {
        return res.status(400).send({ message: e.message })
    }
}

module.exports = {
    getBooks, getBookById, create, updateBook, deleteBook
}