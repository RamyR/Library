import Joi from "joi";

const registerUserSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    name: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().min(8)
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required().messages({
            "string.min": "Must have at least 8 characters",
            'string.empty': `"a" cannot be an empty field`,
            'object.regex': `Must have at least 8 characters`,
            "string.pattern.base": "Must have at least 8 characters and alphanumeric only..."
        }),
    role: Joi.string().required()
});

const loginUserSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required().messages({
            "string.min": "Must have at least 8 characters",
            'string.empty': `"a" cannot be an empty field`,
            'object.regex': `Must have at least 8 characters`,
            "string.pattern.base": "Must have at least 8 characters and alphanumeric only..."
        })
});

export { registerUserSchema, loginUserSchema}
