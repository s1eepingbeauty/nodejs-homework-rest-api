const Joi = require('joi');

const addContactSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.empty': `"name" cannot be an empty field`,
            'string.min': `"name" filed should contains at least 3 characters`,
            'string.max': `"name" filed limit is 30 characters`,
            'any.required': `"name" is a required field`
        }),
    
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: false }
        })
        .required()
        .messages({
            'string.empty': `"email" cannot be an empty field`,
            'any.required': `"email" is a required field`
        }),

    phone: Joi.string()
        // (704) 398-7993
        .regex(/^\(\d{3}\) \d{3}-\d{4}$/)
        .required()
        .messages({
            'string.empty': `"phone" cannot be an empty field`,
            'any.required': `"phone" is a required field`,
            'string.pattern.base': `"phone" field is not valid [example: (704) 398-7993]`
        }),
})

const updateContactSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .messages({
            'string.empty': `"name" cannot be an empty field`,
            'string.min': `"name" filed should contains at least 3 characters`,
            'string.max': `"name" filed limit is 30 characters`,
        }),
    
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: false }
        })
        .messages({
            'string.empty': `"email" cannot be an empty field`,
        }),

    phone: Joi.string()
        .regex(/^\(\d{3}\) \d{3}-\d{4}$/)
        .messages({
            'string.empty': `"phone" cannot be an empty field`,
            'string.pattern.base': `"phone" field is not valid [example: (704) 398-7993]`
        }),
})

const validateAddContact = async (req, _res, next) => {
    try {
        await addContactSchema.validateAsync(req.body)
        console.log('validation success');
        next()
    } catch (error) {
        next({ status: 400, message: error.message })
    }
}

const validateUpdateContact = async (req, _res, next) => {
    try {
        await updateContactSchema.validateAsync(req.body)
        console.log('validation success');
        next()
    } catch (error) {
        next({ status: 400, message: error.message })
    }
}

module.exports = {
    validateAddContact,
    validateUpdateContact,
}