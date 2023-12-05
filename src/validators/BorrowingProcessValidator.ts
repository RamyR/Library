import Joi from "joi";

export const allBorroweringProcessSchema = Joi.object().keys({
    page: Joi.number().integer().required().default(1),
    count: Joi.number().integer().required().default(10),
});

export const createBorroweringProcessSchema = Joi.object().keys({
    bookId:  Joi.number().integer().required(),
    dueDate: Joi.date().required()
});

export const returnBorroweringProcessSchema = Joi.object().keys({
    bookId:  Joi.number().integer().required(),
});

export const borrowerByIdSchema = Joi.object().keys({
    id: Joi.number().integer().required(),
});