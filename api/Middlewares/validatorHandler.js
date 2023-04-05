const boom = require('@hapi/boom');

function validacionHandler(esquema, propiedad) {
  return (req, res, next) => {
    const data = req[propiedad];
    const { error } = esquema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error))
    }
    next();
  }
}

module.exports = {
  validacionHandler,
}
