const db = require('../db-config/db.config');
const helper = require('../helper/helper');

const getBooks = async (searchQuery) => {
    try {
        if (!searchQuery) {
            const getQuery = 'SELECT * FROM BOOKS';
            const rows = db.queryBuilder(getQuery);
            const data = await helper.emptyOrRows(rows);
            return data
        } else {
            const getBooksQuery = `SELECT * FROM BOOKS WHERE NAME LIKE '%${searchQuery}%' OR AUTHOR LIKE '%${searchQuery}%'`;
            const rows = await db.queryBuilder(getBooksQuery)
            const data = await helper.emptyOrRows(rows);
            return data;
        }
    } catch (e) {
        throw e;
    }
}

const getBookById = async (bookId) => {
    try {
        const query = 'SELECT * FROM BOOKS WHERE BOOKID = (?)';
        const rows = db.queryBuilder(query, [bookId]);
        const data = await helper.emptyOrRows(rows);
        return data;
    } catch {
        throw e
    }
}

const create = async (name, imageUrl, author, pages, price) => {
    try {
        const query = 'INSERT INTO BOOKS (name, imageurl, author, pages, price) VALUES (?,?,?,?,?) ';
        const rows = db.queryBuilder(query, [name, imageUrl, author, pages, price]);
        const data = await helper.emptyOrRows(rows);
        return data;
    } catch (e){
        throw e
    }
}

const updateBook = async (name = '', imageUrl = '', author = '', pages = '', price = '', id) => {
    try {
        const getBookId = 'SELECT bookid from BOOKS WHERE BOOKID = ?'
        const rows = db.queryBuilder(getBookId, [id]);
        const bookExist = await helper.emptyOrRows(rows);
        if (bookExist.length === 0) {
            throw new Error(`Book with Id ${id} does not exist.`)
        }
        let updateCondition = 'UPDATE BOOKS SET BOOKID = (?),';
        const updateParams = [id];
        if (name) {
            updateCondition += ' name = (?),';
            updateParams.push(name)
        }
        if (imageUrl) {
            updateCondition += ' imageUrl = (?),';
            updateParams.push(imageUrl)
        }
        if (author) {
            updateCondition += ' author = (?),';
            updateParams.push(author)
        }
        if (pages) {
            updateCondition += ' pages = (?),';
            updateParams.push(pages)
        }
        if (price) {
            updateCondition += ' price = (?)';
            updateParams.push(price)
        }
        updateCondition += ` WHERE BOOKID = ${id}`
        const data = await db.queryBuilder(updateCondition, updateParams);
        await helper.emptyOrRows(data);
        return true;
    } catch(e) {
        throw e;
    }
}

const deleteBook = async (bookId) => {
    try {
        if (!bookId) {
            throw new Error('Please enter bookId to delete the book');
        } else {
            const findBookExist = 'SELECT * FROM BOOKS WHERE BOOKID = (?)';
            const data = db.queryBuilder(findBookExist, [bookId])
            const row = await helper.emptyOrRows(data)
            if (row.length === 0) {
                throw new Error(`Book of Id ${bookId} does not exist!`);
            } else {
                const query = 'DELETE FROM BOOKS WHERE BOOKID = (?)';
                const rows = db.queryBuilder(query, [bookId]);
                await helper.emptyOrRows(rows);
                return true;
            }
        }
    } catch (e) {
        throw e
    }
}

module.exports = {
    getBooks, getBookById, create, updateBook,  deleteBook
}