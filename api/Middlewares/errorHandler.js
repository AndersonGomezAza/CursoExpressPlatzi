function logErrors(error, req, res, next) {
  next(error);
}

function boomErrorHandler(error, req, res, next) {
  if (error.isBoom) {
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(error);
  }
}

function errorHandler(error, req, res, next) {
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
}

module.exports = {
  logErrors,
  boomErrorHandler,
  errorHandler,
};
