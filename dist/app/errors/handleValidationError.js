"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const handleValidationError = (err) => {
    const error = Object.values(err.errors).reduce((acc, val) => {
        if (val === null || val === void 0 ? void 0 : val.path) {
            acc[val.path] = {
                path: val.path,
                message: val.message,
            };
        }
        return acc;
    }, {});
    const statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    return {
        statusCode,
        message: 'Validation Error',
        error,
    };
};
exports.default = handleValidationError;
