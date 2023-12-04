import Joi from "joi";

export const allBooksSchema = Joi.object().keys({
    page: Joi.number().integer().required().default(1),
    count: Joi.number().integer().required().default(10),
});

export const createBooksSchema = Joi.object().keys({
    title: Joi.string().min(3).max(255).required(),
    quantity: Joi.number().integer().required(),
    isbn: Joi.string().alphanum().min(3).max(255).required(),
    shelfLocation: Joi.string().alphanum().min(2).max(255).required(),
    authorId: Joi.number().integer().messages({
        "number.base": "Create Author first or send a valid ID"
    }),
    authorName: Joi.string().min(3).max(255)
}).or('authorId', 'authorName');

export const updateBookSchema = Joi.object().keys({
    id: Joi.number().integer().required(),
    title: Joi.string().min(3).max(255),
    quantity: Joi.number().integer(),
    isbn: Joi.string().alphanum().min(3).max(255),
    shelfLocation: Joi.string().alphanum().min(2).max(255),
    authorId: Joi.number().integer().messages({
        "number.base": "Create Author first or send a valid ID"
    }),
    authorName: Joi.string().min(3).max(255)
}).or('authorId', 'authorName', 'title', 'quantity', 'isbn', 'shelfLocation');

export const bookByIdSchema = Joi.object().keys({
    id: Joi.number().integer().required(),
});

export const searchQuerySchema = Joi.object().keys({
    query: Joi.string().min(3).max(255).required(),
});