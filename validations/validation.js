const Joi = require('joi');

const userSchema = Joi.object()
    .keys({
        username: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().required().min(3).max(15)
})

const booksCreateSchema = Joi.object()
    .keys({
        name: Joi.string().required().min(2).max(100),
        author: Joi.string().required().min(2).max(50),
        pages: Joi.number().required().min(1).max(9999),
        price: Joi.number().required().min(1),
        imageurl: Joi.string().required()
    })

const booksUpdateSchema = Joi.object()
    .keys({
        name: Joi.string().min(2).max(100),
        author: Joi.string().min(2).max(50),
        pages: Joi.number().min(1).max(9999),
        price: Joi.number().min(1),
        imageurl: Joi.string()
    })

module.exports = {
    userSchema, booksCreateSchema, booksUpdateSchema
}