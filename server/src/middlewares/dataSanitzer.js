// middlewre for sanitizing data
const perfectExpressSanitizer = require('perfect-express-sanitizer')

const sanitizeData = (request, response, next) => {
  const options = { xss: true, noSql: true, sql: true, level: 5 }

  const sanitizedTitle = perfectExpressSanitizer.sanitize.prepareSanitize(
    request.body.title,
    options
  )

  request.body = { ...request.body, title: sanitizedTitle }

  next()
}

module.exports = { sanitizeData }
