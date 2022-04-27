const customError = (status, code, message, details) => {
    const error = new Error(message);
    error.code = code;
    error.details = details;
    error.status = status;
    return error;
}

module.exports = customError;