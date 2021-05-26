const Joi = require('joi')
const validate = require('./validate')

const createContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .regex(/[A-Z]\w+/)
    .required()
    .messages({
      'string.empty': `"name" cannot be an empty field`,
      'string.min': `"name" should contains at least 3 characters`,
      'string.max': `"name" limit is 30 characters`,
      'any.required': `"name" is a required field`,
    }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .required()
    .messages({
      'string.empty': `"email" cannot be an empty field`,
      'any.required': `"email" is a required field`,
    }),

  phone: Joi.string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required()
    .messages({
      'string.empty': `"phone" cannot be an empty field`,
      'any.required': `"phone" is a required field`,
      'string.pattern.base': `"phone" is not valid [example: (704) 398-7993]`,
    }),
  favorite: Joi.boolean().optional(),
})

const updateContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .regex(/[A-Z]\w+/)
    .optional()
    .messages({
      'string.empty': `"name" cannot be an empty field`,
      'string.min': `"name" should contains at least 3 characters`,
      'string.max': `"name" limit is 30 characters`,
    }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .optional()
    .messages({
      'string.empty': `"email" cannot be an empty field`,
    }),

  phone: Joi.string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/)
    .optional()
    .messages({
      'string.empty': `"phone" cannot be an empty field`,
      'string.pattern.base': `"phone" is not valid [example: (704) 398-7993]`,
    }),

  favorite: Joi.boolean().optional(),
})

const statusFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'string.empty': `"favorite" cannot be an empty field`,
    'any.required': `"favorite" is a required field`,
  }),
})

const validateCreateContact = async (req, _res, next) => {
  return validate(createContactSchema, req.body, next)
}

const validateUpdateContact = async (req, _res, next) => {
  return validate(updateContactSchema, req.body, next)
}
const validateStatusFavorite = async (req, _res, next) => {
  return validate(statusFavoriteSchema, req.body, next)
}

module.exports = {
  validateCreateContact,
  validateUpdateContact,
  validateStatusFavorite,
}
