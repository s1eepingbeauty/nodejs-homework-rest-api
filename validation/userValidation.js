const Joi = require('joi')
const validate = require('./validate')

const createUserSchema = Joi.object({
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

  password: Joi.string().min(6).max(30).required().messages({
    'string.empty': `"password" cannot be an empty field`,
    'string.min': `"password" should contains at least 6 characters`,
    'string.max': `"password" limit is 30 characters`,
    'any.required': `"password" is a required field`,
  }),
})

const validateCreateUser = async (req, _res, next) => {
  return validate(createUserSchema, req.body, next)
}

module.exports = validateCreateUser
