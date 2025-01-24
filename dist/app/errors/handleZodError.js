"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (err) => {
    //   const issues = err.issues.map((issue: any) => {
    //     return {
    //       path: issue.path[issue.path.length - 1],
    //       message: issue.message,
    //     };
    //   });
    //   -->
    const issuesObject = err.issues.reduce((acc, issue) => {
        const path = issue.path[issue.path.length - 1]; // Get the last element of the path
        acc[path] = {
            path,
            message: issue.message,
        };
        return acc;
    }, {});
    return {
        message: 'Validation error',
        statusCode: 400,
        error: issuesObject,
    };
};
exports.handleZodError = handleZodError;
