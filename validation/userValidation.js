const Joi = require('joi')
const validate = require('./validate')

const userSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .regex(/[A-Z]\w+/)
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
    .regex(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    )
    .required()
    .messages({
      'string.empty': `"email" cannot be an empty field`,
      'any.required': `"email" is a required field`,
      'string.pattern.base': `"email" is not valid [example: yourmail@gmail.com]`,
    }),

  password: Joi.string().min(6).max(30).required().messages({
    'string.empty': `"password" cannot be an empty field`,
    'string.min': `"password" should contains at least 6 characters`,
    'string.max': `"password" limit is 30 characters`,
    'any.required': `"password" is a required field`,
  }),
  subscription: Joi.string().valid('starter', 'pro', 'business').optional(),
  avatarURL: Joi.string(),
  isVerified: Joi.boolean(),
  verificationToken: Joi.string(),
})

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid('starter', 'pro', 'business')
    .required()
    .messages({
      'string.empty': `"subscription" cannot be an empty field`,
      'any.required': `"subscription" is a required field`,
    }),
})

const emailSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .regex(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    )
    .required()
    .messages({
      'string.empty': `"email" cannot be an empty field`,
      'any.required': `"email" is a required field`,
      'string.pattern.base': `"email" is not valid [example: yourmail@gmail.com]`,
    }),
})

const validateUser = async (req, _res, next) => {
  return validate(userSchema, req.body, next)
}

const validateSubscription = async (req, _res, next) => {
  return validate(subscriptionSchema, req.body, next)
}

const validateEmail = async (req, _res, next) => {
  return validate(emailSchema, req.body, next)
}

module.exports = { validateUser, validateSubscription, validateEmail }
