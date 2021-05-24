const Joi = require('joi')
const validate = require('./validate')

const userSchema = Joi.object({
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
})

const validateUser = async (req, _res, next) => {
  return validate(userSchema, req.body, next)
}

module.exports = validateUser
