const e = require("express")

function error(message, error){
    let error = new Error(message);
    if (code) {
        e.statusCode = code;
    }
    return error;
}

module.exports = error;