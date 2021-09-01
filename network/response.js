exports.success = (req, res, message, status) => {
    req.status(status).send({
        error: false,
        status: status,
        body: message
    });
}

exports.error = (req, res, message, status) => {
    let statusCode = status || 500
    req.status(statusCode).send({
        error: false,
        status: status,
        body: message
    });
}