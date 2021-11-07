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
        title: Joi.string().required().escapeHTML(),
        text: Joi.string().required(),
        image: Joi.object({
            url: Joi.string().escapeHTML(),
            filename: Joi.string().escapeHTML()
        })
});

module.exports.registerUserSchema = Joi.object({
        username: Joi.string().required().escapeHTML(),
        email: Joi.string().required().escapeHTML(),
        password: Joi.string().required().escapeHTML()
});

module.exports.updateUserSchema = Joi.object({
        username: Joi.string().required().escapeHTML()
});
