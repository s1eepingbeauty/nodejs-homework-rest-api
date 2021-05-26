const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body)
    console.log('Validation success')
    next()
  } catch (error) {
    next({ status: 400, message: `Field ${error.message.replace(/"/g, '|')}` })
  }
}

module.exports = validate
