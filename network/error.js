const response = require('./response');

const error = (err, req, res, next) => {
    console.error(`[error] ${err}`);
    const message = err.message || 'error de sistema';
    const status = err.statusCode || 500;
    response.error(req, res, message, status);
}

module.exports = error;