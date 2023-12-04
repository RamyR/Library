import Joi from "joi";

export const allBooksSchema = Joi.object().keys({
    page: Joi.number().integer().required().default(1),
    count: Joi.number().integer().required().default(10),
});

export const createBooksSchema = Joi.object().keys({
    title: Joi.string().min(3).max(255).required(),
    quantity: Joi.number().integer().required(),
    isbn: Joi.string().alphanum().min(2).max(255).required(),
    shelfLocation: Joi.string().alphanum().min(3).max(255).required(),
    authorId: Joi.number().integer().required().messages({
        "number.base": "Create Author first or send ID"
    })
});
