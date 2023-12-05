import Joi from "joi";

export const allBorrowersSchema = Joi.object().keys({
    page: Joi.number().integer().required().default(1),
    count: Joi.number().integer().required().default(10),
});

export const updateBorrowerSchema = Joi.object().keys({
    id: Joi.number().integer(),
    username: Joi.string().alphanum().min(3).max(30),
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(8)
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .messages({
            "string.min": "Must have at least 8 characters",
            'string.empty': `"a" cannot be an empty field`,
            'object.regex': `Must have at least 8 characters`,
            "string.pattern.base": "Must have at least 8 characters and alphanumeric only..."
        }),
}).or('username', 'name', 'email', 'password');

export const borrowerByIdSchema = Joi.object().keys({
    id: Joi.number().integer().required(),
});