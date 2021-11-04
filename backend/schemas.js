const BaseJoi = require('joi');
const sanitizeHTML = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHTML(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if(clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

module.exports.blogSchema = Joi.object({
        title: Joi.string().required().escapeHTML().messages({
            'string.empty': `"title" cannot be an empty field`,
            'any.required': `"title" is required`,
        }),
        text: Joi.string().required().messages({
            'string.empty': `"text" cannot be an empty field`,
            'any.required': `"text" is required`,
        }),
});

module.exports.registerUserSchema = Joi.object({
        username: Joi.string().notEmpty().required().escapeHTML().messages({
            'string.empty': `"username" cannot be an empty field`,
            'any.required': `"username" is required`,
        }),
        email: Joi.string().required().escapeHTML().messages({
            'string.empty': `"email" cannot be an empty field`,
            'any.required': `"email" is required`,
        }),
        password: Joi.string().required().escapeHTML().messages({
            'string.empty': `"password" cannot be an empty field`,
            'any.required': `"password" is required`,
        }),
});

module.exports.updateUserSchema = Joi.object({
        username: Joi.string().required().escapeHTML().messages({
            'string.empty': `"username" cannot be an empty field`,
            'any.required': `"username" is required`,
        })
});
